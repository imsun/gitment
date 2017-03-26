var Comments = Comments || require('./comments')

const { client_id, client_secret } = window

if (!client_id || !client_secret) {
  throw new Error('You need to write your own client ID and client secret to `window` to run this test.')
}

const comments = new Comments({
  id: 'test',
  owner: 'imsun',
  repo: 'test',
  oauth: {
    client_id,
    client_secret,
  },
})

comments.renderCommentsTo('container')