export const Query = {
  parse(search = window.location.search) {
    if (!search) return {}
    const queryString = search[0] === '?' ? search.substring(1) : search
    const query = {}
    queryString.split('&')
      .forEach(queryStr => {
        const [key, value] = queryStr.split('=')
        if (key) query[key] = value
      })

    return query
  },
  stringify(query, prefix = '?') {
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
      .join('&')
    return queryString ? prefix + queryString : ''
  },
}

function ajaxFactory(method) {
  return function(apiPath, data = {}, base = 'https://api.github.com') {
    const req = new XMLHttpRequest()
    const token = localStorage.getItem('gh-comments-token')

    let url = `${base}${apiPath}`
    let body = null
    if (method === 'GET' || method === 'DELETE') {
      url += Query.stringify(data)
    }

    const p = new Promise((resolve, reject) => {
      req.addEventListener('load', () => resolve(JSON.parse(req.responseText)))
      req.addEventListener('error', error => reject(error))
    })
    req.open(method, url, true)

    req.setRequestHeader('Accept', 'application/vnd.github.squirrel-girl-preview')
    if (token) {
      req.setRequestHeader('Authorization', `token ${token}`)
    }
    if (method !== 'GET' && method !== 'DELETE') {
      body = JSON.stringify(data)
      req.setRequestHeader('Content-Type', 'application/json')
    }

    req.send(body)
    return p
  }
}

export const http = {
  get: ajaxFactory('GET'),
  post: ajaxFactory('POST'),
}
