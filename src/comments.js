import marked from 'marked'
import { autorun, extendObservable, observable } from 'mobx'

import { LS_ACCESS_TOKEN_KEY, LS_USER_KEY, getTargetContainer, http, Query } from './utils'
import defaultTheme from './theme/default'

const scope = 'repo'

function extendRenderer(instance, renderer) {
  instance[renderer] = (container) => {
    const targetContainer = getTargetContainer(container)
    const render = instance.theme[renderer] || instance.defaultTheme[renderer]

    autorun(() => {
      const e = render(instance.state, instance)
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
    return localStorage.getItem(LS_ACCESS_TOKEN_KEY)
  }
  set accessToken(token) {
    localStorage.setItem(LS_ACCESS_TOKEN_KEY, token)
  }

  get loginLink() {
    const oauthUri = 'https://github.com/login/oauth/authorize'
    const redirect_uri = this.oauth.redirect_uri || window.location.href

    const oauthParams = Object.assign({
      scope,
      redirect_uri,
    }, this.oauth)

    return `${oauthUri}${Query.stringify(oauthParams)}`
  }

  constructor(options = {}) {
    Object.assign(this, {
      marked,
      defaultTheme,
      id: window.location.href,
      theme: defaultTheme,
      defaultAvatar: 'https://',
      oauth: {},
    }, options)

    const user = {}
    try {
      const userInfo = localStorage.getItem(LS_USER_KEY)
      if (this.accessToken && userInfo) {
        Object.assign(user, JSON.parse(userInfo), {
          fromCache: true,
        })
      }
    } catch (e) {
      localStorage.removeItem(LS_USER_KEY)
    }

    this.state = observable({
      user,
      comments: undefined,
    })

    const renderers = Object.keys(this.theme)
    renderers.forEach(renderer => extendRenderer(this, renderer))

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
          this.accessToken = data.access_token
          this.update()
        })
        .catch(e => alert(e))
    } else {
      this.update()
    }
  }

  update() {
    return Promise.all([this.loadUserInfo(), this.load()])
  }

  loadUserInfo() {
    if (this.accessToken) {
      return http.get('/user')
        .then((user) => {
          this.state.user = user
          localStorage.setItem(LS_USER_KEY, JSON.stringify(user))

          return user
        })
    }

    this.logout()
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
        this.state.comments = comments
        return comments
      })
      .catch(e => this.state.comments = e)
  }

  login() {
    window.location.href = this.loginLink
  }

  logout() {
    localStorage.removeItem(LS_ACCESS_TOKEN_KEY)
    localStorage.removeItem(LS_USER_KEY)
    this.state.user = {}
  }
}

module.exports = Comments
