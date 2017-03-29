import { github as githubIcon, heart as heartIcon, spinner as spinnerIcon } from '../icons'
import { NOT_INITIALIZED_ERROR } from '../constants'

function renderHeader({ meta, user, reactions }, instance) {
  const container = document.createElement('div')
  container.className = 'gitment-container gitment-header-container'

  const likeButton = document.createElement('span')
  const likedReaction = reactions.find(reaction => reaction.user.login === user.login)
  likeButton.className = 'gitment-header-like-btn'
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
  issueLink.className = 'gitment-header-issue-link'
  issueLink.href = meta.html_url
  issueLink.target = '_blank'
  issueLink.innerText = 'Issue Page'
  container.appendChild(issueLink)

  return container
}

function renderComments({ comments, user, error }, instance) {
  const container = document.createElement('div')
  container.className = 'gitment-container gitment-comments-container'

  if (error) {
    const errorBlock = document.createElement('div')
    errorBlock.className = 'gitment-comments-error'

    if (error === NOT_INITIALIZED_ERROR && user.login === instance.owner) {
      const initHint = document.createElement('div')
      const initButton = document.createElement('button')
      initButton.className = 'gitment-comments-init-btn'
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
    loading.className = 'gitment-comments-loading'
    container.appendChild(loading)
    return container
  } else if (!comments.length) {
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'gitment-comments-empty'
    emptyBlock.innerText = 'No Comment Yet'
    container.appendChild(emptyBlock)
    return container
  }

  const commentsList = document.createElement('ul')
  commentsList.className = 'gitment-comments-list'

  comments.forEach(comment => {
    const createDate = new Date(comment.created_at)
    const updateDate = new Date(comment.updated_at)
    const commentItem = document.createElement('li')
    commentItem.className = 'gitment-comment'
    commentItem.innerHTML = `
      <a class="gitment-comment-avatar" href="${comment.user.html_url}" target="_blank">
        <img class="gitment-comment-avatar-img" src="${comment.user.avatar_url}"/>
      </a>
      <div class="gitment-comment-main">
        <div class="gitment-comment-header">
          <a class="gitment-comment-name" href="${comment.user.html_url}" target="_blank">
            ${comment.user.login}
          </a>
          commented on
          <span title="${createDate}">${createDate.toDateString()}</span>
          ${ createDate.toString() !== updateDate.toString()
            ? ` • <span title="comment was edited at ${updateDate}">edited</span>`
            : ''
          }
        </div>
        <div class="gitment-comment-body">${instance.marked(comment.body)}</div>
      </div>
    `
    commentsList.appendChild(commentItem)
  })

  container.appendChild(commentsList)

  return container
}

function renderEditor({ user }, instance) {
  const container = document.createElement('div')
  container.className = 'gitment-container gitment-editor-container'

  const shouldDisable = user.login ? '' : 'disabled'
  const disabledTip = user.login ? '' : 'Login to Comment'
  container.innerHTML = `
      ${ user.login
        ? `<a class="gitment-editor-avatar" href="${user.html_url}" target="_blank">
            <img class="gitment-editor-avatar-img" src="${user.avatar_url}"/>
          </a>`
        : user.loginning
          ? `<div class="gitment-editor-avatar">${spinnerIcon}</div>`
          : `<a class="gitment-editor-avatar" href="${instance.loginLink}" title="login with GitHub">
              ${githubIcon}
            </a>`
      }
    </a>
    <div class="gitment-editor-main">
      <div class="gitment-editor-header">
        <nav class="gitment-editor-tabs">
          <button class="gitment-editor-tab selected">Write</button>
          <button class="gitment-editor-tab">Preview</button>
        </nav>
        <div class="gitment-editor-login">
          ${ user.login
            ? '<a class="gitment-editor-logout-link">Logout</a>'
            : user.loginning
              ? 'Loginning...'
              : `<a class="gitment-editor-login-link" href="${instance.loginLink}">Login</a> with GitHub`
          }
        </div>
      </div>
      <div class="gitment-editor-body">
        <div class="gitment-editor-write-field">
          <textarea placeholder="Leave a comment" title="${disabledTip}" ${shouldDisable}></textarea>
        </div>
        <div class="gitment-editor-preview-field hidden">
          <div class="gitment-editor-preview"></div>
        </div>
      </div>
      <div class="gitment-editor-footer">
        <a class="gitment-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          Styling with Markdown is supported
        </a>
        <button class="gitment-editor-submit" title="${disabledTip}" ${shouldDisable}>Comment</button>
      </div>
    </div>
  `
  if (user.login) {
    container.querySelector('.gitment-editor-logout-link').onclick = () => instance.logout()
  }

  const writeField = container.querySelector('.gitment-editor-write-field')
  const previewField = container.querySelector('.gitment-editor-preview-field')

  const textarea = writeField.querySelector('textarea')
  textarea.oninput = () => {
    textarea.style.height = 'auto'
    const style = window.getComputedStyle(textarea, null)
    const height = parseInt(style.height, 10)
    const clientHeight = textarea.clientHeight
    const scrollHeight = textarea.scrollHeight
    if (clientHeight < scrollHeight) {
      textarea.style.height = (height + scrollHeight - clientHeight) + 'px'
    }
  }

  const [writeTab, previewTab] = container.querySelectorAll('.gitment-editor-tab')
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
    previewField.querySelector('.gitment-editor-preview').innerHTML = instance.marked(content)
  }

  const submitButton = container.querySelector('.gitment-editor-submit')
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
  container.className = 'gitment-container gitment-footer-container'
  container.innerHTML = `
    Powered by
    <a class="gitment-footer-project-link" href="https://github.com/imsun/gitment" target="_blank">
      Gitment
    </a>
  `
  return container
}

function render(state, instance) {
  const container = document.createElement('div')
  container.className = 'gitment-container gitment-root-container'
  container.appendChild(instance.renderHeader(state, instance))
  container.appendChild(instance.renderComments(state, instance))
  container.appendChild(instance.renderEditor(state, instance))
  container.appendChild(instance.renderFooter(state, instance))
  return container
}

export default { render, renderHeader, renderComments, renderEditor, renderFooter }
