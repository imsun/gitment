import { autorun, extendObservable, observable } from 'mobx'

import { ACCESS_TOKEN_KEY, getTargetContainer, http, Query } from './utils'
import defaultTheme from './theme/default'

const scope = 'public_repo'

function extendRenderer(instance, componentName) {
  const method = `render${componentName}`
  instance[method] = (container) => {
    const targetContainer = getTargetContainer(container)
    const render = instance.theme[method] || instance.defaultTheme[method]

    autorun(() => {
      const e = render(instance.data, instance)
      if (targetContainer.firstChild) {
        targetContainer.replaceChild(e, targetContainer.firstChild)
      } else {
        targetContainer.appendChild(e)
      }
    })

    return targetContainer
  }
}

class Comments {
  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  set accessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }
  constructor(options = {}) {
    Object.assign(this, {
      id: window.location.href,
      theme: defaultTheme,
      defaultTheme: defaultTheme,
      oauth: {},
    }, options)

    this.data = observable({
      comments: undefined,
      user: undefined,
    })

    const components = ['', 'Comments']
    components.forEach(component => extendRenderer(this, component))

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
          this.accessToken = data.accessToken
          this.loadUserInfo()
        })
    }
    this.update()
  }

  update() {
    return Promise.all([this.loadUserInfo(), this.load()])
  }

  loadUserInfo() {
    if (this.accessToken) {
      return http.get('/user')
        .then((user) => {
          this.data.user = user
          return user
        })
    }
    this.data.user = undefined
    return Promise.resolve()
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

    return http.post(`/repos/${owner}/${repo}/issues`, {
      title,
      labels,
      body: `${link}\n${desc}`,
    })
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
      .then((comments) => {
        this.data.comments = comments
        return comments
      })
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
}

module.exports = Comments
