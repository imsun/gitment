import { github as githubIcon, heart as heartIcon, spinner as spinnerIcon } from '../icons'
import { NOT_INITIALIZED_ERROR } from '../constants'

function renderHeader({ meta, user, reactions }, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-header-container'

  const likeButton = document.createElement('span')
  const likedReaction = reactions.find(reaction => reaction.user.login === user.login)
  likeButton.className = 'gc-header-like-btn'
  likeButton.innerHTML = `
    ${heartIcon}
    ${ likedReaction
      ? 'Unlike'
      : 'Like'
    }
    ${ meta.reactions && meta.reactions.heart
      ? ` • <strong>${meta.reactions.heart}</strong> Liked`
      : ''
    }
  `
  if (likedReaction) {
    likeButton.classList.add('liked')
    likeButton.onclick = () => instance.unlike()
  } else {
    likeButton.classList.remove('liked')
    likeButton.onclick = () => instance.like()
  }
  container.appendChild(likeButton)

  const issueLink = document.createElement('a')
  issueLink.className = 'gc-header-issue-link'
  issueLink.href = meta.html_url
  issueLink.target = '_blank'
  issueLink.innerText = 'Issue Page'
  container.appendChild(issueLink)

  return container
}

function renderComments({ comments, user, error }, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-comments-container'

  if (error) {
    const errorBlock = document.createElement('div')
    errorBlock.className = 'gc-comments-error'

    if (error === NOT_INITIALIZED_ERROR && user.login === instance.owner) {
      const initHint = document.createElement('div')
      const initButton = document.createElement('button')
      initButton.className = 'gc-comments-init-btn'
      initButton.onclick = () => {
        initButton.setAttribute('disabled', true)
        instance.init()
          .catch(e => {
            initButton.removeAttribute('disabled')
            alert(e)
          })
      }
      initButton.innerText = 'Initialize Comments'
      initHint.appendChild(initButton)
      errorBlock.appendChild(initHint)
    } else {
      errorBlock.innerText = error
    }
    container.appendChild(errorBlock)
    return container
  } else if (comments === undefined) {
    const loading = document.createElement('div')
    loading.innerText = 'Loading comments...'
    loading.className = 'gc-comments-loading'
    container.appendChild(loading)
    return container
  } else if (!comments.length) {
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'gc-comments-empty'
    emptyBlock.innerText = 'No Comment Yet'
    container.appendChild(emptyBlock)
    return container
  }

  const commentsList = document.createElement('ul')
  commentsList.className = 'gc-comments-list'

  comments.forEach(comment => {
    const createDate = new Date(comment.created_at)
    const updateDate = new Date(comment.updated_at)
    const commentItem = document.createElement('li')
    commentItem.className = 'gc-comment'
    commentItem.innerHTML = `
      <a class="gc-comment-avatar" href="${comment.user.html_url}" target="_blank">
        <img class="gc-comment-avatar-img" src="${comment.user.avatar_url}"/>
      </a>
      <div class="gc-comment-main">
        <div class="gc-comment-header">
          <a class="gc-comment-name" href="${comment.user.html_url}" target="_blank">
            ${comment.user.login}
          </a>
          commented on
          <span title="${createDate}">${createDate.toDateString()}</span>
          ${ createDate.toString() !== updateDate.toString()
            ? ` • <span title="comment was edited at ${updateDate}">edited</span>`
            : ''
          }
        </div>
        <div class="gc-comment-body">${instance.marked(comment.body)}</div>
      </div>
    `
    commentsList.appendChild(commentItem)
  })

  container.appendChild(commentsList)

  return container
}

function renderEditor({ user }, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-editor-container'

  const shouldDisable = user.login ? '' : 'disabled'
  const disabledTip = user.login ? '' : 'Login to Comment'
  container.innerHTML = `
      ${ user.login
        ? `<a class="gc-editor-avatar" href="${user.html_url} target="_blank">
            <img class="gc-editor-avatar-img" src="${user.avatar_url}"/>
          </a>`
        : user.loginning
          ? `<div class="gc-editor-avatar">${spinnerIcon}</div>`
          : `<a class="gc-editor-avatar" href="${instance.loginLink}" title="login with GitHub">
              ${githubIcon}
            </a>`
      }
    </a>
    <div class="gc-editor-main">
      <div class="gc-editor-header">
        <nav class="gc-editor-tabs">
          <button class="gc-editor-tab selected">Write</button>
          <button class="gc-editor-tab">Preview</button>
        </nav>
        <div class="gc-editor-login">
          ${ user.login
            ? '<a class="gc-editor-logout-link">Logout</a>'
            : user.loginning
              ? 'Loginning...'
              : `<a class="gc-editor-login-link" href="${instance.loginLink}">Login</a> with GitHub`
          }
        </div>
      </div>
      <div class="gc-editor-body">
        <div class="gc-editor-write-field">
          <textarea placeholder="Leave a comment" title="${disabledTip}" ${shouldDisable}></textarea>
        </div>
        <div class="gc-editor-preview-field hidden">
          <div class="gc-editor-preview"></div>
        </div>
      </div>
      <div class="gc-editor-footer">
        <a class="gc-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          Styling with Markdown is supported
        </a>
        <button class="gc-editor-submit" title="${disabledTip}" ${shouldDisable}>Comment</button>
      </div>
    </div>
  `
  if (user.login) {
    container.querySelector('.gc-editor-logout-link').onclick = () => instance.logout()
  }

  const writeField = container.querySelector('.gc-editor-write-field')
  const previewField = container.querySelector('.gc-editor-preview-field')

  const textarea = writeField.querySelector('textarea')
  textarea.oninput = () => {
    textarea.style.height = 'auto'
    const style = window.getComputedStyle(textarea, null)
    const height = parseInt(style.height, 10)
    const clientHeight = textarea.clientHeight
    const scrollHeight = textarea.scrollHeight
    if (clientHeight < scrollHeight) {
      textarea.style.height = height + scrollHeight - clientHeight
    }
  }

  const [writeTab, previewTab] = container.querySelectorAll('.gc-editor-tab')
  writeTab.onclick = () => {
    writeTab.classList.add('selected')
    previewTab.classList.remove('selected')
    writeField.classList.remove('hidden')
    previewField.classList.add('hidden')

    textarea.focus()
  }
  previewTab.onclick = () => {
    previewTab.classList.add('selected')
    writeTab.classList.remove('selected')
    previewField.classList.remove('hidden')
    writeField.classList.add('hidden')

    const content = textarea.value.trim() || 'Nothing to preview'
    previewField.querySelector('.gc-editor-preview').innerHTML = instance.marked(content)
  }

  const submitButton = container.querySelector('.gc-editor-submit')
  submitButton.onclick = () => {
    submitButton.innerText = 'Submitting...'
    submitButton.setAttribute('disabled', true)
    instance.post(textarea.value.trim())
      .then(data => {
        textarea.value = ''
        instance.state.comments.push(data)
        submitButton.removeAttribute('disabled')
        submitButton.innerText = 'Comment'
      })
      .catch(e => {
        alert(e)
        submitButton.removeAttribute('disabled')
        submitButton.innerText = 'Comment'
      })
  }

  return container
}

function renderFooter() {
  const container = document.createElement('div')
  container.className = 'gc-container gc-footer-container'
  container.innerHTML = `
    Powered by
    <a class="gc-footer-project-link" href="https://github.com/imsun/gh-comments" target="_blank">
      gh-comments
    </a>
  `
  return container
}

function render(state, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-root-container'
  container.appendChild(instance.renderHeader(state, instance))
  container.appendChild(instance.renderComments(state, instance))
  container.appendChild(instance.renderEditor(state, instance))
  container.appendChild(instance.renderFooter(state, instance))
  return container
}

export default { render, renderHeader, renderComments, renderEditor, renderFooter }
