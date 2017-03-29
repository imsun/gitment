'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _mobx = require('mobx');

var _constants = require('./constants');

var _utils = require('./utils');

var _default = require('./theme/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scope = 'repo';

_marked2.default.setOptions({
  breaks: true,
  gfm: true,
  sanitize: true
});

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

var Comments = function () {
  _createClass(Comments, [{
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

  function Comments() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Comments);

    Object.assign(this, {
      marked: _marked2.default,
      defaultTheme: _default2.default,
      id: window.location.href,
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
      theme: _default2.default,
      oauth: {}
    }, options);

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
      reactions: []
    });

    var renderers = Object.keys(this.theme);
    renderers.forEach(function (renderer) {
      return extendRenderer(_this, renderer);
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

      this.state.user.loginning = true;
      _utils.http.post('https://gh-oauth.imsun.net', {
        code: code,
        client_id: client_id,
        client_secret: client_secret
      }, '').then(function (data) {
        _this.accessToken = data.access_token;
        _this.update();
      }).catch(function (e) {
        _this.user.loginning = false;
        alert(e);
      });
    } else {
      this.update();
    }
  }

  _createClass(Comments, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      return this.createIssue().then(function () {
        return _this2.load();
      }).then(function (comments) {
        _this2.state.error = null;
        return comments;
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      return Promise.all([this.loadMeta(), this.loadUserInfo()]).then(function () {
        return Promise.all([_this3.load(), _this3.loadReactions()]);
      }).catch(function (e) {
        return _this3.state.error = e;
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue() {
      var _this4 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo,
          title = this.title,
          link = this.link,
          desc = this.desc,
          labels = this.labels;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues', {
        title: title,
        labels: labels.concat([id]),
        body: link + '\n\n' + desc
      }).then(function (meta) {
        _this4.state.meta = meta;
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
      return this.getIssue().then(function (issue) {
        return _utils.http.post(issue.comments_url, { body: body }, '');
      });
    }
  }, {
    key: 'loadMeta',
    value: function loadMeta() {
      var _this5 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo;

      return _utils.http.get('/repos/' + owner + '/' + repo + '/issues', {
        creator: owner,
        labels: id
      }).then(function (issues) {
        if (!issues.length) return Promise.reject(_constants.NOT_INITIALIZED_ERROR);
        _this5.state.meta = issues[0];
        return issues[0];
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var _this6 = this;

      return this.getIssue().then(function (issue) {
        return _utils.http.get(issue.comments_url, {}, '');
      }).then(function (comments) {
        _this6.state.comments = comments;
        return comments;
      });
    }
  }, {
    key: 'loadUserInfo',
    value: function loadUserInfo() {
      var _this7 = this;

      if (!this.accessToken) {
        this.logout();
        return Promise.resolve({});
      }

      return _utils.http.get('/user').then(function (user) {
        _this7.state.user = user;
        localStorage.setItem(_constants.LS_USER_KEY, JSON.stringify(user));
        return user;
      });
    }
  }, {
    key: 'loadReactions',
    value: function loadReactions() {
      var _this8 = this;

      if (!this.accessToken) return Promise.resolve([]);

      return this.getIssue().then(function (issue) {
        return _utils.http.get(issue.reactions.url, {}, '');
      }).then(function (reactions) {
        _this8.state.reactions = reactions;
        return reactions;
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
    key: 'like',
    value: function like() {
      var _this9 = this;

      if (!this.accessToken) {
        alert('Login to Like');
        return Promise.reject();
      }

      var owner = this.owner,
          repo = this.repo;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues/' + this.state.meta.number + '/reactions', {
        content: 'heart'
      }).then(function (reaction) {
        _this9.state.reactions.push(reaction);
        _this9.state.meta.reactions.heart++;
      });
    }
  }, {
    key: 'unlike',
    value: function unlike() {
      var _this10 = this;

      if (!this.accessToken) return Promise.reject();

      var _state = this.state,
          user = _state.user,
          reactions = _state.reactions;

      var index = reactions.findIndex(function (reaction) {
        return reaction.user.login === user.login;
      });
      return _utils.http.delete('/reactions/' + reactions[index].id).then(function () {
        reactions.splice(index, 1);
        _this10.state.meta.reactions.heart--;
      });
    }
  }]);

  return Comments;
}();

module.exports = Comments;
//# sourceMappingURL=comments.js.map