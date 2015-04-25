#!/usr/bin/env node

"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var HTTPServer = (function () {
  function HTTPServer(port) {
    _classCallCheck(this, HTTPServer);

    var http = require("http");
    var server = http.createServer((function (request, response) {
      var url = require("url");
      this.route(url.parse(request.url, true), response);
    }).bind(this));
    server.listen(port);
  }

  _createClass(HTTPServer, [{
    key: "route",
    value: function route(url, response) {
      switch (url.pathname) {
        case "/api/parsetime":
          return this.routeParseTime(url, response);
        case "/api/unixtime":
          return this.routeUnixTime(url, response);
        default:
          return this.routeDefault(url, response);
      }
    }
  }, {
    key: "routeParseTime",
    value: function routeParseTime(url, response) {
      var date = new Date(url.query.iso);
      var json = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      };
      response.write(JSON.stringify(json));
      response.statusCode = 200;
      response.end();
    }
  }, {
    key: "routeUnixTime",
    value: function routeUnixTime(url, response) {
      var date = new Date(url.query.iso);
      var json = {
        unixtime: date.getTime()
      };
      response.write(JSON.stringify(json));
      response.statusCode = 200;
      response.end();
    }
  }, {
    key: "routeDefault",
    value: function routeDefault(url, response) {
      response.statusCode = 404;
      response.end();
    }
  }]);

  return HTTPServer;
})();

(function () {
  var server = new HTTPServer(process.argv[2]);
})();

