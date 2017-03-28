import { isString } from '../utils'
import { github as githubIcon } from '../icons'

function renderComments({ comments }, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-comments-container'

  if (comments === undefined) {
    const loading = document.createElement('div')
    loading.innerText = 'Loading comments...'
    loading.className = 'gc-comments-loading'
    container.appendChild(loading)
    return container
  } else if (isString(comments)) {
    const errorMessage = document.createElement('div')
    errorMessage.className = 'gc-comments-error'
    errorMessage.innerText = comments
    container.appendChild(errorMessage)
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
  container.innerHTML = `
    <a class="gc-editor-avatar"
      href="${user.html_url || instance.loginLink}"
      ${user.login ? 'target="_blank"' : ''}
      >
      ${ user.login
        ? `<img class="gc-editor-avatar-img" src="${user.avatar_url}"/>`
        : githubIcon
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
            ? '<a class="gc-editor-login-link" href="#">Logout</a>'
            : `<a class="gc-editor-login-link" href="${instance.loginLink}">Login</a> with GitHub`
          }
        </div>
      </div>
      <div class="gc-editor-body">
        <div class="gc-editor-write-field">
          <textarea placeholder="Leave a comment" ${shouldDisable}></textarea>
        </div>
        <div class="gc-editor-preview-field hidden">
          <div class="gc-editor-preview"></div>
        </div>
      </div>
      <div class="gc-editor-footer">
        <a class="gc-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          Styling with Markdown is supported
        </a>
        <button class="gc-editor-submit" ${shouldDisable}>Comment</button>
      </div>
    </div>
  `
  if (user.login) {
    container.querySelector('.gc-editor-login-link').onclick = () => instance.logout()
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
    submitButton.setAttribute('disabled', true)
    instance.post(textarea.value.trim())
      .then(data => {
        textarea.value = ''
        instance.state.comments.push(data)
        submitButton.removeAttribute('disabled')
      })
      .catch(e => {
        alert(e)
        submitButton.removeAttribute('disabled')
      })
  }

  return container
}

function render(state, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container gc-root-container'
  container.appendChild(instance.renderComments(state, instance))
  container.appendChild(instance.renderEditor(state, instance))
  return container
}

export default { render, renderComments, renderEditor }
