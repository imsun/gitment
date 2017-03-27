import { http, Query } from './utils'
import defaultTheme from './theme/default'

const scope = 'public_repo'

class Comments {
  constructor(options = {}) {
    Object.assign(this, {
      id: window.location.href,
      theme: defaultTheme,
      defaultTheme: defaultTheme,
      oauth: {},
    }, options)

    const query = Query.parse()
    if (query.code) {
      const { client_id, client_secret } = this.oauth
      const code = query.code
      delete query.code
      const search = Query.stringify(query)
      history.replaceState({}, '', `${window.location.origin}${window.location.pathname}${search}${window.location.hash}`)

      http.post('https://gh-oauth.imsun.net', {
          code,
          client_id,
          client_secret,
        }, '')
        .then(data => {
          localStorage.setItem('gh-comments-token', data.access_token)
        })
    }
  }

  createIssue(options = {}) {
    const { owner, repo } = this
    const { title, link, desc, labels } = Object.assign({
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
    }, options)

    labels.push(this.id)

    http.post(`/repos/${owner}/${repo}/issues`, {
      title,
      labels,
      body: `${link}\n${desc}`,
    })
      .then(data => console.log(data))
  }

  getIssue() {
    const { owner, repo } = this
    return http.get(`/repos/${owner}/${repo}/issues`, {
        labels: this.id,
      })
      .then(issues => {
        if (!issues.length) return Promise.reject('Comments not initialized.')
        return issues[0]
      })
  }

  post(body) {
    return this.getIssue()
      .then(issue => http.post(issue.comments_url, { body }, ''))
  }

  load() {
    return this.getIssue()
      .then(issue => http.get(issue.comments_url, {}, ''))
  }

  login(oauthOptions = {}) {
    const oauthUri = 'https://github.com/login/oauth/authorize'
    const redirect_uri = oauthOptions.redirect_uri || window.location.href
    const oauthParams = Object.assign({
      scope,
      redirect_uri,
    }, this.oauth, oauthOptions)

    window.location.href = `${oauthUri}${Query.stringify(oauthParams)}`
  }

  renderComments() {
    if (this.theme.renderComments) return this.theme.renderComments(this)
    return this.defaultTheme.renderComments(this)
  }
  renderCommentsTo(container) {
    const e = container instanceof Element ? container : document.getElementById(container)
    e.innerHTML = ''
    return e.appendChild(this.renderComments())
  }
}

module.exports = Comments
