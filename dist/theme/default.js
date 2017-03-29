'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _icons = require('../icons');

var _constants = require('../constants');

function renderHeader(_ref, instance) {
  var meta = _ref.meta,
      user = _ref.user,
      reactions = _ref.reactions;

  var container = document.createElement('div');
  container.className = 'gitment-container gitment-header-container';

  var likeButton = document.createElement('span');
  var likedReaction = reactions.find(function (reaction) {
    return reaction.user.login === user.login;
  });
  likeButton.className = 'gitment-header-like-btn';
  likeButton.innerHTML = '\n    ' + _icons.heart + '\n    ' + (likedReaction ? 'Unlike' : 'Like') + '\n    ' + (meta.reactions && meta.reactions.heart ? ' \u2022 <strong>' + meta.reactions.heart + '</strong> Liked' : '') + '\n  ';
  if (likedReaction) {
    likeButton.classList.add('liked');
    likeButton.onclick = function () {
      return instance.unlike();
    };
  } else {
    likeButton.classList.remove('liked');
    likeButton.onclick = function () {
      return instance.like();
    };
  }
  container.appendChild(likeButton);

  var issueLink = document.createElement('a');
  issueLink.className = 'gitment-header-issue-link';
  issueLink.href = meta.html_url;
  issueLink.target = '_blank';
  issueLink.innerText = 'Issue Page';
  container.appendChild(issueLink);

  return container;
}

function renderComments(_ref2, instance) {
  var comments = _ref2.comments,
      user = _ref2.user,
      error = _ref2.error;

  var container = document.createElement('div');
  container.className = 'gitment-container gitment-comments-container';

  if (error) {
    var errorBlock = document.createElement('div');
    errorBlock.className = 'gitment-comments-error';

    if (error === _constants.NOT_INITIALIZED_ERROR && user.login === instance.owner) {
      var initHint = document.createElement('div');
      var initButton = document.createElement('button');
      initButton.className = 'gitment-comments-init-btn';
      initButton.onclick = function () {
        initButton.setAttribute('disabled', true);
        instance.init().catch(function (e) {
          initButton.removeAttribute('disabled');
          alert(e);
        });
      };
      initButton.innerText = 'Initialize Comments';
      initHint.appendChild(initButton);
      errorBlock.appendChild(initHint);
    } else {
      errorBlock.innerText = error;
    }
    container.appendChild(errorBlock);
    return container;
  } else if (comments === undefined) {
    var loading = document.createElement('div');
    loading.innerText = 'Loading comments...';
    loading.className = 'gitment-comments-loading';
    container.appendChild(loading);
    return container;
  } else if (!comments.length) {
    var emptyBlock = document.createElement('div');
    emptyBlock.className = 'gitment-comments-empty';
    emptyBlock.innerText = 'No Comment Yet';
    container.appendChild(emptyBlock);
    return container;
  }

  var commentsList = document.createElement('ul');
  commentsList.className = 'gitment-comments-list';

  comments.forEach(function (comment) {
    var createDate = new Date(comment.created_at);
    var updateDate = new Date(comment.updated_at);
    var commentItem = document.createElement('li');
    commentItem.className = 'gitment-comment';
    commentItem.innerHTML = '\n      <a class="gitment-comment-avatar" href="' + comment.user.html_url + '" target="_blank">\n        <img class="gitment-comment-avatar-img" src="' + comment.user.avatar_url + '"/>\n      </a>\n      <div class="gitment-comment-main">\n        <div class="gitment-comment-header">\n          <a class="gitment-comment-name" href="' + comment.user.html_url + '" target="_blank">\n            ' + comment.user.login + '\n          </a>\n          commented on\n          <span title="' + createDate + '">' + createDate.toDateString() + '</span>\n          ' + (createDate.toString() !== updateDate.toString() ? ' \u2022 <span title="comment was edited at ' + updateDate + '">edited</span>' : '') + '\n        </div>\n        <div class="gitment-comment-body">' + instance.marked(comment.body) + '</div>\n      </div>\n    ';
    commentsList.appendChild(commentItem);
  });

  container.appendChild(commentsList);

  return container;
}

function renderEditor(_ref3, instance) {
  var user = _ref3.user;

  var container = document.createElement('div');
  container.className = 'gitment-container gitment-editor-container';

  var shouldDisable = user.login ? '' : 'disabled';
  var disabledTip = user.login ? '' : 'Login to Comment';
  container.innerHTML = '\n      ' + (user.login ? '<a class="gitment-editor-avatar" href="' + user.html_url + ' target="_blank">\n            <img class="gitment-editor-avatar-img" src="' + user.avatar_url + '"/>\n          </a>' : user.loginning ? '<div class="gitment-editor-avatar">' + _icons.spinner + '</div>' : '<a class="gitment-editor-avatar" href="' + instance.loginLink + '" title="login with GitHub">\n              ' + _icons.github + '\n            </a>') + '\n    </a>\n    <div class="gitment-editor-main">\n      <div class="gitment-editor-header">\n        <nav class="gitment-editor-tabs">\n          <button class="gitment-editor-tab selected">Write</button>\n          <button class="gitment-editor-tab">Preview</button>\n        </nav>\n        <div class="gitment-editor-login">\n          ' + (user.login ? '<a class="gitment-editor-logout-link">Logout</a>' : user.loginning ? 'Loginning...' : '<a class="gitment-editor-login-link" href="' + instance.loginLink + '">Login</a> with GitHub') + '\n        </div>\n      </div>\n      <div class="gitment-editor-body">\n        <div class="gitment-editor-write-field">\n          <textarea placeholder="Leave a comment" title="' + disabledTip + '" ' + shouldDisable + '></textarea>\n        </div>\n        <div class="gitment-editor-preview-field hidden">\n          <div class="gitment-editor-preview"></div>\n        </div>\n      </div>\n      <div class="gitment-editor-footer">\n        <a class="gitment-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">\n          Styling with Markdown is supported\n        </a>\n        <button class="gitment-editor-submit" title="' + disabledTip + '" ' + shouldDisable + '>Comment</button>\n      </div>\n    </div>\n  ';
  if (user.login) {
    container.querySelector('.gitment-editor-logout-link').onclick = function () {
      return instance.logout();
    };
  }

  var writeField = container.querySelector('.gitment-editor-write-field');
  var previewField = container.querySelector('.gitment-editor-preview-field');

  var textarea = writeField.querySelector('textarea');
  textarea.oninput = function () {
    textarea.style.height = 'auto';
    var style = window.getComputedStyle(textarea, null);
    var height = parseInt(style.height, 10);
    var clientHeight = textarea.clientHeight;
    var scrollHeight = textarea.scrollHeight;
    if (clientHeight < scrollHeight) {
      textarea.style.height = height + scrollHeight - clientHeight + 'px';
    }
  };

  var _container$querySelec = container.querySelectorAll('.gitment-editor-tab'),
      _container$querySelec2 = _slicedToArray(_container$querySelec, 2),
      writeTab = _container$querySelec2[0],
      previewTab = _container$querySelec2[1];

  writeTab.onclick = function () {
    writeTab.classList.add('selected');
    previewTab.classList.remove('selected');
    writeField.classList.remove('hidden');
    previewField.classList.add('hidden');

    textarea.focus();
  };
  previewTab.onclick = function () {
    previewTab.classList.add('selected');
    writeTab.classList.remove('selected');
    previewField.classList.remove('hidden');
    writeField.classList.add('hidden');

    var content = textarea.value.trim() || 'Nothing to preview';
    previewField.querySelector('.gitment-editor-preview').innerHTML = instance.marked(content);
  };

  var submitButton = container.querySelector('.gitment-editor-submit');
  submitButton.onclick = function () {
    submitButton.innerText = 'Submitting...';
    submitButton.setAttribute('disabled', true);
    instance.post(textarea.value.trim()).then(function (data) {
      textarea.value = '';
      instance.state.comments.push(data);
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    }).catch(function (e) {
      alert(e);
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    });
  };

  return container;
}

function renderFooter() {
  var container = document.createElement('div');
  container.className = 'gitment-container gitment-footer-container';
  container.innerHTML = '\n    Powered by\n    <a class="gitment-footer-project-link" href="https://github.com/imsun/gitment" target="_blank">\n      Gitment\n    </a>\n  ';
  return container;
}

function render(state, instance) {
  var container = document.createElement('div');
  container.className = 'gitment-container gitment-root-container';
  container.appendChild(instance.renderHeader(state, instance));
  container.appendChild(instance.renderComments(state, instance));
  container.appendChild(instance.renderEditor(state, instance));
  container.appendChild(instance.renderFooter(state, instance));
  return container;
}

exports.default = { render: render, renderHeader: renderHeader, renderComments: renderComments, renderEditor: renderEditor, renderFooter: renderFooter };
//# sourceMappingURL=default.js.map