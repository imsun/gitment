# Gitment


[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/gitment.svg
[npm-url]: https://www.npmjs.com/package/gitment

Gitment is a comment system based on GitHub Issues, which can be used in the frontend without any server-side implementation.

[Demo Page](https://imsun.github.io/gitment/)

## Features

- GitHub Login
- Markdown / GFM support
- Syntax highlighting
- Easy to customize
- No server-side implementation

## Get Started

### 1. Install

```html
<link rel="stylesheet" href="https://imsun.github.io/gitment/style/default.css">
```

```html
<script src="https://imsun.github.io/gitment/dist/gitment.browser.js"></script>
```

or via npm:

```sh
$ npm i --save gitment
```

```javascript
import 'gitment/style/default.css'
import Gitment from 'gitment'
```

### 2. Register An OAuth Application

[Click here](https://github.com/settings/applications/new) to register an OAuth application, and you will get a client ID and a client secret.
    
### 3. Render Gitment

```javascript
const gitment = new Gitment({
  id: 'Your post ID', // optional
  owner: 'Your GitHub ID',
  repo: 'The repo to store comments',
  oauth: {
    client_id: 'Your client ID',
    client_secret: 'Your client secret',
  },
  // ...
  // For more available options, check out the documentation below
})

gitment.render('comments')
// or
// gitment.render(document.getElementById('comments'))
// or
// document.body.appendChild(gitment.render())
```

### 4. Initialize Your Comments

After the page published, you should visit your page, login with your GitHub account(make sure you're repo's owner), and click the initialize button, to create a related issue in your repo.
After that, others can leave their comments.
   
## Methods

### constructor(options)

#### options:

Type: `object` 

- owner: Your GitHub ID. Required.
- repo: The repository to store your comments. Make sure you're repo's owner. Required.
- oauth: An object contains your client ID and client secret. Required.
    - client_id: GitHub client ID. Required.
    - client_secret: GitHub client secret. Required.
- id: An optional string to identify your post. Default `location.href`.
- title: An optional title for your post, used as issue's title. Default `document.title`.
- link: An optional link for your post, used in issue's body. Default `location.href`.
- desc: An optional description for your post, used in issue's body. Default `''`.
- labels: An optional array of labels your want to add when creating the issue. Default `[]`.
- theme: An optional Gitment theme object. Default `gitment.defaultTheme`.
- perPage: An optional number to which comments will be paginated. Default `30`.
- maxCommentHeight: An optional number to limit comments' max height, over which comments will be folded. Default `250`.

### gitment.render([element])

#### element

Type: `HTMLElement` or `string`

The DOM element to which comments will be rendered. Can be an HTML element or element's id. When omitted, this function will create a new `div` element.

This function returns the element to which comments be rendered.

### gitment.renderHeader([element])

Same like `gitment.render([element])`. But only renders the header.

### gitment.renderComments([element])

Same like `gitment.render([element])`. But only renders comments list.


### gitment.renderEditor([element])

Same like `gitment.render([element])`. But only renders the editor.


### gitment.renderFooter([element])

Same like `gitment.render([element])`. But only renders the footer.

### gitment.init()

Initialize a new post. Returns a `Promise` and resolves when initialized.

### gitment.update()

Update data and views. Returns a `Promise` and resolves when data updated. 

### gitment.post()

Post comment in the editor. Returns a `Promise` and resolves when posted.

### gitment.login()

Jump to GitHub OAuth page to login.

### gitment.logout()

Log out current user.

### goto(page)

#### page

Type: `number`

Jump to the target page. Notice that `page` starts from `1`. Returns a `Promise` and resolves when page loaded.

### gitment.like()

Like current post. Returns a `Promise` and resolves when liked.

### gitment.unlike()

Unlike current post. Returns a `Promise` and resolves when unliked.

### gitment.likeAComment(commentId)

#### commentId

Type: `string`

Like a comment. Returns a `Promise` and resolves when liked.

### gitment.unlikeAComment(commentId)

#### commentId

Type: `string`

Unlike a comment. Returns a `Promise` and resolves when unliked.
