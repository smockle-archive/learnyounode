#!/usr/bin/env node

"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var HTTPServer = (function () {
  function HTTPServer(port, path) {
    _classCallCheck(this, HTTPServer);

    var http = require("http");
    var server = http.createServer((function (request, response) {
      this.readFile(path).pipe(response);
    }).bind(this));
    server.listen(port);
  }

  _createClass(HTTPServer, [{
    key: "readFile",
    value: function readFile(path) {
      var fs = require("fs");
      return fs.createReadStream(path);
    }
  }]);

  return HTTPServer;
})();

(function () {
  var server = new HTTPServer(process.argv[2], process.argv[3]);
})();

