'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

var _constants = require('./constants');

var _utils = require('./utils');

var _default = require('./theme/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scope = 'public_repo';

function extendRenderer(instance, renderer) {
  instance[renderer] = function (container) {
    var targetContainer = (0, _utils.getTargetContainer)(container);
    var render = instance.theme[renderer] || instance.defaultTheme[renderer];

    (0, _mobx.autorun)(function () {
      var e = render(instance.state, instance);
      if (targetContainer.firstChild) {
        targetContainer.replaceChild(e, targetContainer.firstChild);
      } else {
        targetContainer.appendChild(e);
      }
    });

    return targetContainer;
  };
}

var Gitment = function () {
  _createClass(Gitment, [{
    key: 'accessToken',
    get: function get() {
      return localStorage.getItem(_constants.LS_ACCESS_TOKEN_KEY);
    },
    set: function set(token) {
      localStorage.setItem(_constants.LS_ACCESS_TOKEN_KEY, token);
    }
  }, {
    key: 'loginLink',
    get: function get() {
      var oauthUri = 'https://github.com/login/oauth/authorize';
      var redirect_uri = this.oauth.redirect_uri || window.location.href;

      var oauthParams = Object.assign({
        scope: scope,
        redirect_uri: redirect_uri
      }, this.oauth);

      return '' + oauthUri + _utils.Query.stringify(oauthParams);
    }
  }]);

  function Gitment() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Gitment);

    this.defaultTheme = _default2.default;
    this.useTheme(_default2.default);

    Object.assign(this, {
      id: window.location.href,
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
      theme: _default2.default,
      oauth: {},
      perPage: 20,
      maxCommentHeight: 250
    }, options);

    this.useTheme(this.theme);

    var user = {};
    try {
      var userInfo = localStorage.getItem(_constants.LS_USER_KEY);
      if (this.accessToken && userInfo) {
        Object.assign(user, JSON.parse(userInfo), {
          fromCache: true
        });
      }
    } catch (e) {
      localStorage.removeItem(_constants.LS_USER_KEY);
    }

    this.state = (0, _mobx.observable)({
      user: user,
      error: null,
      meta: {},
      comments: undefined,
      reactions: [],
      commentReactions: {},
      currentPage: 1
    });

    var query = _utils.Query.parse();
    if (query.code) {
      var _oauth = this.oauth,
          client_id = _oauth.client_id,
          client_secret = _oauth.client_secret;

      var code = query.code;
      delete query.code;
      var search = _utils.Query.stringify(query);
      var replacedUrl = '' + window.location.origin + window.location.pathname + search + window.location.hash;
      history.replaceState({}, '', replacedUrl);

      Object.assign(this, {
        id: replacedUrl,
        link: replacedUrl
      }, options);

      this.state.user.isLoggingIn = true;
      _utils.http.post('https://gh-oauth.imsun.net', {
        code: code,
        client_id: client_id,
        client_secret: client_secret
      }, '').then(function (data) {
        _this.accessToken = data.access_token;
        _this.update();
      }).catch(function (e) {
        _this.state.user.isLoggingIn = false;
        alert(e);
      });
    } else {
      this.update();
    }
  }

  _createClass(Gitment, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      return this.createIssue().then(function () {
        return _this2.loadComments();
      }).then(function (comments) {
        _this2.state.error = null;
        return comments;
      });
    }
  }, {
    key: 'useTheme',
    value: function useTheme() {
      var _this3 = this;

      var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.theme = theme;

      var renderers = Object.keys(this.theme);
      renderers.forEach(function (renderer) {
        return extendRenderer(_this3, renderer);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      return Promise.all([this.loadMeta(), this.loadUserInfo()]).then(function () {
        return Promise.all([_this4.loadComments().then(function () {
          return _this4.loadCommentReactions();
        }), _this4.loadReactions()]);
      }).catch(function (e) {
        return _this4.state.error = e;
      });
    }
  }, {
    key: 'markdown',
    value: function markdown(text) {
      return _utils.http.post('/markdown', {
        text: text,
        mode: 'gfm'
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue() {
      var _this5 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo,
          title = this.title,
          link = this.link,
          desc = this.desc,
          labels = this.labels;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues', {
        title: title,
        labels: labels.concat(['gitment', id]),
        body: link + '\n\n' + desc
      }).then(function (meta) {
        _this5.state.meta = meta;
        return meta;
      });
    }
  }, {
    key: 'getIssue',
    value: function getIssue() {
      if (this.state.meta.id) return Promise.resolve(this.state.meta);

      return this.loadMeta();
    }
  }, {
    key: 'post',
    value: function post(body) {
      var _this6 = this;

      return this.getIssue().then(function (issue) {
        return _utils.http.post(issue.comments_url, { body: body }, '');
      }).then(function (data) {
        _this6.state.meta.comments++;
        var pageCount = Math.ceil(_this6.state.meta.comments / _this6.perPage);
        if (_this6.state.currentPage === pageCount) {
          _this6.state.comments.push(data);
        }
        return data;
      });
    }
  }, {
    key: 'loadMeta',
    value: function loadMeta() {
      var _this7 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo;

      return _utils.http.get('/repos/' + owner + '/' + repo + '/issues', {
        creator: owner,
        labels: id
      }).then(function (issues) {
        if (!issues.length) return Promise.reject(_constants.NOT_INITIALIZED_ERROR);
        _this7.state.meta = issues[0];
        return issues[0];
      });
    }
  }, {
    key: 'loadComments',
    value: function loadComments() {
      var _this8 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentPage;

      return this.getIssue().then(function (issue) {
        return _utils.http.get(issue.comments_url, { page: page, per_page: _this8.perPage }, '');
      }).then(function (comments) {
        _this8.state.comments = comments;
        return comments;
      });
    }
  }, {
    key: 'loadUserInfo',
    value: function loadUserInfo() {
      var _this9 = this;

      if (!this.accessToken) {
        this.logout();
        return Promise.resolve({});
      }

      return _utils.http.get('/user').then(function (user) {
        _this9.state.user = user;
        localStorage.setItem(_constants.LS_USER_KEY, JSON.stringify(user));
        return user;
      });
    }
  }, {
    key: 'loadReactions',
    value: function loadReactions() {
      var _this10 = this;

      if (!this.accessToken) {
        this.state.reactions = [];
        return Promise.resolve([]);
      }

      return this.getIssue().then(function (issue) {
        if (!issue.reactions.total_count) return [];
        return _utils.http.get(issue.reactions.url, {}, '');
      }).then(function (reactions) {
        _this10.state.reactions = reactions;
        return reactions;
      });
    }
  }, {
    key: 'loadCommentReactions',
    value: function loadCommentReactions() {
      var _this11 = this;

      if (!this.accessToken) {
        this.state.commentReactions = {};
        return Promise.resolve([]);
      }

      var comments = this.state.comments;
      var comentReactions = {};

      return Promise.all(comments.map(function (comment) {
        if (!comment.reactions.total_count) return [];

        var owner = _this11.owner,
            repo = _this11.repo;

        return _utils.http.get('/repos/' + owner + '/' + repo + '/issues/comments/' + comment.id + '/reactions', {});
      })).then(function (reactionsArray) {
        comments.forEach(function (comment, index) {
          comentReactions[comment.id] = reactionsArray[index];
        });
        _this11.state.commentReactions = comentReactions;

        return comentReactions;
      });
    }
  }, {
    key: 'login',
    value: function login() {
      window.location.href = this.loginLink;
    }
  }, {
    key: 'logout',
    value: function logout() {
      localStorage.removeItem(_constants.LS_ACCESS_TOKEN_KEY);
      localStorage.removeItem(_constants.LS_USER_KEY);
      this.state.user = {};
    }
  }, {
    key: 'goto',
    value: function goto(page) {
      this.state.currentPage = page;
      this.state.comments = undefined;
      return this.loadComments(page);
    }
  }, {
    key: 'like',
    value: function like() {
      var _this12 = this;

      if (!this.accessToken) {
        alert('Login to Like');
        return Promise.reject();
      }

      var owner = this.owner,
          repo = this.repo;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues/' + this.state.meta.number + '/reactions', {
        content: 'heart'
      }).then(function (reaction) {
        _this12.state.reactions.push(reaction);
        _this12.state.meta.reactions.heart++;
      });
    }
  }, {
    key: 'unlike',
    value: function unlike() {
      var _this13 = this;

      if (!this.accessToken) return Promise.reject();

      var _state = this.state,
          user = _state.user,
          reactions = _state.reactions;

      var index = reactions.findIndex(function (reaction) {
        return reaction.user.login === user.login;
      });
      return _utils.http.delete('/reactions/' + reactions[index].id).then(function () {
        reactions.splice(index, 1);
        _this13.state.meta.reactions.heart--;
      });
    }
  }, {
    key: 'likeAComment',
    value: function likeAComment(commentId) {
      var _this14 = this;

      if (!this.accessToken) {
        alert('Login to Like');
        return Promise.reject();
      }

      var owner = this.owner,
          repo = this.repo;

      var comment = this.state.comments.find(function (comment) {
        return comment.id === commentId;
      });

      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues/comments/' + commentId + '/reactions', {
        content: 'heart'
      }).then(function (reaction) {
        _this14.state.commentReactions[commentId].push(reaction);
        comment.reactions.heart++;
      });
    }
  }, {
    key: 'unlikeAComment',
    value: function unlikeAComment(commentId) {
      if (!this.accessToken) return Promise.reject();

      var reactions = this.state.commentReactions[commentId];
      var comment = this.state.comments.find(function (comment) {
        return comment.id === commentId;
      });
      var user = this.state.user;

      var index = reactions.findIndex(function (reaction) {
        return reaction.user.login === user.login;
      });

      return _utils.http.delete('/reactions/' + reactions[index].id).then(function () {
        reactions.splice(index, 1);
        comment.reactions.heart--;
      });
    }
  }]);

  return Gitment;
}();

module.exports = Gitment;
//# sourceMappingURL=gitment.js.map