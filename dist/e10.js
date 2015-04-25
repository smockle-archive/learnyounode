#!/usr/bin/env node

"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var TCPServer = (function () {
  function TCPServer(port) {
    _classCallCheck(this, TCPServer);

    var net = require("net");
    var server = net.createServer((function (socket) {
      this.writeSocket(socket, this.getDateTime());
    }).bind(this));
    server.listen(port);
  }

  _createClass(TCPServer, [{
    key: "writeSocket",
    value: function writeSocket(socket, data) {
      socket.write(data);
      socket.end();
    }
  }, {
    key: "getDateTime",
    value: function getDateTime() {
      var strftime = require("strftime");
      return strftime("%F %H:%M");
    }
  }]);

  return TCPServer;
})();

(function () {
  var server = new TCPServer(process.argv[2]);
})();

