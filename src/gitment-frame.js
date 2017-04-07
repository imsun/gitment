const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

class GitmentFrame {
  constructor(_options = {}) {
    const id = uuid()
    const options = Object.assign({
      id: window.location.href,
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
      perPage: 20,
      maxCommentHeight: 250,

      iframe: 'https://imsun.github.io/gitment/gitment-frame.html',
      css: 'https://imsun.github.io/gitment/style/default.css',
    }, _options)

    const iframe = document.createElement('iframe')
    iframe.src = options.iframe
    iframe.frameborder = 0
    iframe.onload = () => {
      iframe.postMessage({ id, options }, options.iframe)
    }
    this.element = iframe
    this.state = {}

    window.addEventListener('message', ({ data }) => {
      if (!data || !data.id) return
      if (data.state) this.state = data.state
      if (data.height) iframe.height = height
    })
  }
}

(function () {
  if (typeof module !== 'undefined') {
    module.exports = GitmentFrame
  } else if (this) {
    this.GitmentFrame = GitmentFrame
  }
})()
