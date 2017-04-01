'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = exports.Query = exports.isString = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getTargetContainer = getTargetContainer;

var _constants = require('./constants');

var isString = exports.isString = function isString(s) {
  return toString.call(s) === '[object String]';
};

function getTargetContainer(container) {
  var targetContainer = void 0;
  if (container instanceof Element) {
    targetContainer = container;
  } else if (isString(container)) {
    targetContainer = document.getElementById(container);
  } else {
    targetContainer = document.createElement('div');
  }

  return targetContainer;
}

var Query = exports.Query = {
  parse: function parse() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;

    if (!search) return {};
    var queryString = search[0] === '?' ? search.substring(1) : search;
    var query = {};
    queryString.split('&').forEach(function (queryStr) {
      var _queryStr$split = queryStr.split('='),
          _queryStr$split2 = _slicedToArray(_queryStr$split, 2),
          key = _queryStr$split2[0],
          value = _queryStr$split2[1];

      if (key) query[key] = value;
    });

    return query;
  },
  stringify: function stringify(query) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';

    var queryString = Object.keys(query).map(function (key) {
      return key + '=' + encodeURIComponent(query[key] || '');
    }).join('&');
    return queryString ? prefix + queryString : '';
  }
};

function ajaxFactory(method) {
  return function (apiPath) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://api.github.com';

    var req = new XMLHttpRequest();
    var token = localStorage.getItem(_constants.LS_ACCESS_TOKEN_KEY);

    var url = '' + base + apiPath;
    var body = null;
    if (method === 'GET' || method === 'DELETE') {
      url += Query.stringify(data);
    }

    var p = new Promise(function (resolve, reject) {
      req.addEventListener('load', function () {
        var contentType = req.getResponseHeader('content-type');
        var res = req.responseText;
        if (!/json/.test(contentType)) {
          resolve(res);
          return;
        }
        var data = req.responseText ? JSON.parse(res) : {};
        if (data.message) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      });
      req.addEventListener('error', function (error) {
        return reject(error);
      });
    });
    req.open(method, url, true);

    req.setRequestHeader('Accept', 'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json');
    if (token) {
      req.setRequestHeader('Authorization', 'token ' + token);
    }
    if (method !== 'GET' && method !== 'DELETE') {
      body = JSON.stringify(data);
      req.setRequestHeader('Content-Type', 'application/json');
    }

    req.send(body);
    return p;
  };
}

var http = exports.http = {
  get: ajaxFactory('GET'),
  post: ajaxFactory('POST'),
  delete: ajaxFactory('DELETE'),
  put: ajaxFactory('PUT')
};
//# sourceMappingURL=utils.js.map