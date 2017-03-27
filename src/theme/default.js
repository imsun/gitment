import marked from 'marked'

marked.setOptions({ gfm: true })

function renderComments({ comments }) {
  const container = document.createElement('div')
  container.className = 'gc-comments-container'

  if (comments === undefined) {
    const loading = document.createElement('div')
    loading.innerText = 'Loading comments...'
    loading.className = 'gc-comments-loading'
    container.appendChild(loading)
    return container
  }

  const commentsList = document.createElement('ul')
  commentsList.className = 'gc-comments-list'

  comments.forEach(comment => {
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
          commented at ${(new Date(comment.created_at)).toLocaleString()}
        </div>
        <div class="gc-comment-body">${marked(comment.body)}</div>
      </div>
    `
    commentsList.appendChild(commentItem)
  })

  container.appendChild(commentsList)

  return container
}

function renderEditor({ user }, instance) {
  const container = document.createElement('div')
  container.className = 'gc-editor-container'
  if (user) {
    container.innerHTML = `
      <a class="gc-editor-avatar" href="${user.html_url}" target="_blank">
        <img class="gc-editor-avatar-img" src="${user.avatar_url}"/>
      </a>
      <div class="gc-editor-main">
        <div class="gc-editor-header">
          <nav class="gc-editor-tabs">
            <button class="gc-editor-tab selected">Write</button>
            <button class="gc-editor-tab">Preview</button>
          </nav>
        </div>
        <div class="gc-editor-body">
          <div class="gc-editor-write-field">
            <textarea placeholder="Leave a comment"></textarea>
          </div>
          <div class="gc-editor-preview-field hidden">
            <div class="gc-editor-preview"></div>
          </div>
        </div>
        <div class="gc-editor-footer">
          <a class="gc-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
            Styling with Markdown is supported
          </a>
          <button class="gc-editor-submit">Comment</button>
        </div>
      </div>
    `

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
      previewField.querySelector('.gc-editor-preview').innerHTML = marked(content)
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
  }
  return container
}

function render(state, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container'
  container.appendChild(instance.renderComments(state, instance))
  container.appendChild(instance.renderEditor(state, instance))
  return container
}

export default { render, renderComments, renderEditor }
