var Gitment = Gitment || require('./gitment')

const { client_id, client_secret } = window

if (!client_id || !client_secret) {
  throw new Error('You need to write your own client ID and client secret to `window` to run this test.')
}

const gitment = new Gitment({
  id: 'test',
  owner: 'imsun',
  repo: 'test',
  oauth: {
    client_id,
    client_secret,
  },
})

gitment.render('container')

try {
  window.http = require('./utils').http
  module.exports = gitment
} catch (e) {}
