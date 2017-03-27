import marked from 'marked'

marked.setOptions({ gfm: true })

function renderComments({ comments }) {
  const container = document.createElement('div')
  container.className = 'gc-comments-list-container'

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
      <div class="gc-comment-body">
        <div class="gc-comment-header">
          <a class="gc-comment-name" href="${comment.user.html_url}" target="_blank">
            ${comment.user.login}
          </a>
          commented at ${(new Date(comment.created_at)).toLocaleString()}
        </div>
        <div class="gc-comment-content">${marked(comment.body)}</div>
      </div>
    `
    commentsList.appendChild(commentItem)
  })

  container.appendChild(commentsList)

  return container
}

function render(state, instance) {
  const container = document.createElement('div')
  container.className = 'gc-container'
  container.appendChild(renderComments(state, instance))
  return container
}

export default { render, renderComments }
