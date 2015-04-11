#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

var File = (function () {
  function File(path) {
    _classCallCheck(this, File);

    this.path = path;
  }

  _createClass(File, [{
    key: "readFile",
    value: function readFile(path) {
      return new Promise(function (resolve, reject) {
        fs.readFile(path, "utf8", function (err, data) {
          if (err) reject(err);else resolve(data);
        });
      });
    }
  }, {
    key: "countNewlines",
    value: function countNewlines() {
      return new Promise((function (resolve, reject) {
        co(regeneratorRuntime.mark(function callee$3$0() {
          var file;
          return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
            while (1) switch (context$4$0.prev = context$4$0.next) {
              case 0:
                context$4$0.next = 2;
                return this.readFile(this.path);

              case 2:
                file = context$4$0.sent;

                resolve(file.split("\n").length - 1);

              case 4:
              case "end":
                return context$4$0.stop();
            }
          }, callee$3$0, this);
        }).bind(this))["catch"](function (err) {
          return reject(err);
        });
      }).bind(this));
    }
  }]);

  return File;
})();

co(regeneratorRuntime.mark(function callee$0$0() {
  var file, count;
  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        file = new File(process.argv[2]);
        context$1$0.next = 3;
        return file.countNewlines();

      case 3:
        count = context$1$0.sent;

        console.log(count);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}))["catch"](function (err) {
  return console.error(err.stack);
});

