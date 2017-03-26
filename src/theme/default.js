import marked from 'marked'

marked.setOptions({ gfm: true })

export default {
  render(instance) {
  },

  renderComments(instance) {
    const container = document.createElement('div')
    container.className = 'gc-comments-list-container'

    const loading = document.createElement('div')
    loading.innerText = 'Loading comments...'
    loading.className = 'gc-comments-loading'
    container.appendChild(loading)

    instance.load()
      .then(comments => {
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

        container.replaceChild(commentsList, loading)
      })

    return container
  }
}
