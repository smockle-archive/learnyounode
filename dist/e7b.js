#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    http = require("http");

var WWW = (function () {
  function WWW(url) {
    _classCallCheck(this, WWW);

    this.url = url;
  }

  _createClass(WWW, [{
    key: "get",
    value: function get(url) {
      return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
          if (res.statusCode === 200) resolve(res);else reject(new Error("HTTP " + res.statusCode));
        }).on("error", function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "stringify",
    value: function stringify(response) {
      return new Promise(function (resolve, reject) {
        var data = [];
        response.on("data", function (chunk) {
          return data.push(chunk);
        }).on("end", function () {
          return resolve(data);
        });
      });
    }
  }]);

  return WWW;
})();

co(regeneratorRuntime.mark(function callee$0$0() {
  var www, response, stringify;
  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        www = new WWW(process.argv[2]);
        context$1$0.next = 3;
        return www.get(www.url);

      case 3:
        response = context$1$0.sent;
        context$1$0.next = 6;
        return www.stringify(response);

      case 6:
        stringify = context$1$0.sent;

        stringify.map(function (currentValue, index, array) {
          return console.log(currentValue.toString());
        });

      case 8:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}))["catch"](function (err) {
  return console.log(err.stack);
});

