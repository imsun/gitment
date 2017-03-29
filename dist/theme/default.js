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
  container.className = 'gc-container gc-header-container';

  var likeButton = document.createElement('span');
  var likedReaction = reactions.find(function (reaction) {
    return reaction.user.login === user.login;
  });
  likeButton.className = 'gc-header-like-btn';
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
  issueLink.className = 'gc-header-issue-link';
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
  container.className = 'gc-container gc-comments-container';

  if (error) {
    var errorBlock = document.createElement('div');
    errorBlock.className = 'gc-comments-error';

    if (error === _constants.NOT_INITIALIZED_ERROR && user.login === instance.owner) {
      var initHint = document.createElement('div');
      var initButton = document.createElement('button');
      initButton.className = 'gc-comments-init-btn';
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
    loading.className = 'gc-comments-loading';
    container.appendChild(loading);
    return container;
  } else if (!comments.length) {
    var emptyBlock = document.createElement('div');
    emptyBlock.className = 'gc-comments-empty';
    emptyBlock.innerText = 'No Comment Yet';
    container.appendChild(emptyBlock);
    return container;
  }

  var commentsList = document.createElement('ul');
  commentsList.className = 'gc-comments-list';

  comments.forEach(function (comment) {
    var createDate = new Date(comment.created_at);
    var updateDate = new Date(comment.updated_at);
    var commentItem = document.createElement('li');
    commentItem.className = 'gc-comment';
    commentItem.innerHTML = '\n      <a class="gc-comment-avatar" href="' + comment.user.html_url + '" target="_blank">\n        <img class="gc-comment-avatar-img" src="' + comment.user.avatar_url + '"/>\n      </a>\n      <div class="gc-comment-main">\n        <div class="gc-comment-header">\n          <a class="gc-comment-name" href="' + comment.user.html_url + '" target="_blank">\n            ' + comment.user.login + '\n          </a>\n          commented on\n          <span title="' + createDate + '">' + createDate.toDateString() + '</span>\n          ' + (createDate.toString() !== updateDate.toString() ? ' \u2022 <span title="comment was edited at ' + updateDate + '">edited</span>' : '') + '\n        </div>\n        <div class="gc-comment-body">' + instance.marked(comment.body) + '</div>\n      </div>\n    ';
    commentsList.appendChild(commentItem);
  });

  container.appendChild(commentsList);

  return container;
}

function renderEditor(_ref3, instance) {
  var user = _ref3.user;

  var container = document.createElement('div');
  container.className = 'gc-container gc-editor-container';

  var shouldDisable = user.login ? '' : 'disabled';
  var disabledTip = user.login ? '' : 'Login to Comment';
  container.innerHTML = '\n      ' + (user.login ? '<a class="gc-editor-avatar" href="' + user.html_url + ' target="_blank">\n            <img class="gc-editor-avatar-img" src="' + user.avatar_url + '"/>\n          </a>' : user.loginning ? '<div class="gc-editor-avatar">' + _icons.spinner + '</div>' : '<a class="gc-editor-avatar" href="' + instance.loginLink + '" title="login with GitHub">\n              ' + _icons.github + '\n            </a>') + '\n    </a>\n    <div class="gc-editor-main">\n      <div class="gc-editor-header">\n        <nav class="gc-editor-tabs">\n          <button class="gc-editor-tab selected">Write</button>\n          <button class="gc-editor-tab">Preview</button>\n        </nav>\n        <div class="gc-editor-login">\n          ' + (user.login ? '<a class="gc-editor-logout-link">Logout</a>' : user.loginning ? 'Loginning...' : '<a class="gc-editor-login-link" href="' + instance.loginLink + '">Login</a> with GitHub') + '\n        </div>\n      </div>\n      <div class="gc-editor-body">\n        <div class="gc-editor-write-field">\n          <textarea placeholder="Leave a comment" title="' + disabledTip + '" ' + shouldDisable + '></textarea>\n        </div>\n        <div class="gc-editor-preview-field hidden">\n          <div class="gc-editor-preview"></div>\n        </div>\n      </div>\n      <div class="gc-editor-footer">\n        <a class="gc-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">\n          Styling with Markdown is supported\n        </a>\n        <button class="gc-editor-submit" title="' + disabledTip + '" ' + shouldDisable + '>Comment</button>\n      </div>\n    </div>\n  ';
  if (user.login) {
    container.querySelector('.gc-editor-logout-link').onclick = function () {
      return instance.logout();
    };
  }

  var writeField = container.querySelector('.gc-editor-write-field');
  var previewField = container.querySelector('.gc-editor-preview-field');

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

  var _container$querySelec = container.querySelectorAll('.gc-editor-tab'),
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
    previewField.querySelector('.gc-editor-preview').innerHTML = instance.marked(content);
  };

  var submitButton = container.querySelector('.gc-editor-submit');
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
  container.className = 'gc-container gc-footer-container';
  container.innerHTML = '\n    Powered by\n    <a class="gc-footer-project-link" href="https://github.com/imsun/gh-comments" target="_blank">\n      gh-comments\n    </a>\n  ';
  return container;
}

function render(state, instance) {
  var container = document.createElement('div');
  container.className = 'gc-container gc-root-container';
  container.appendChild(instance.renderHeader(state, instance));
  container.appendChild(instance.renderComments(state, instance));
  container.appendChild(instance.renderEditor(state, instance));
  container.appendChild(instance.renderFooter(state, instance));
  return container;
}

exports.default = { render: render, renderHeader: renderHeader, renderComments: renderComments, renderEditor: renderEditor, renderFooter: renderFooter };
//# sourceMappingURL=default.js.map