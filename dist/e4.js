#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var babel_polyfille = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

var File = (function () {
  function File(path) {
    _classCallCheck(this, File);

    this.path = path;
    this.countNewlines = co.wrap(regeneratorRuntime.mark(function callee$2$0() {
      var _this = this;

      var result;
      return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _this.readFile().next().value;

          case 2:
            result = context$3$0.sent;
            return context$3$0.abrupt("return", result.split("\n").length - 1);

          case 4:
          case "end":
            return context$3$0.stop();
        }
      }, callee$2$0, this);
    }));
  }

  _createClass(File, {
    readFile: {
      value: regeneratorRuntime.mark(function readFile() {
        var _this = this;

        return regeneratorRuntime.wrap(function readFile$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return File.readFile(_this.path);

            case 2:
            case "end":
              return context$2$0.stop();
          }
        }, readFile, this);
      })
    }
  }, {
    readFile: {
      value: function readFile(path) {
        return function (callback) {
          fs.readFile(path, "utf8", callback);
        };
      }
    }
  });

  return File;
})();

(function () {
  co(regeneratorRuntime.mark(function callee$1$0() {
    var file;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          file = new File(process.argv[2]);
          context$2$0.next = 3;
          return Promise.resolve(file.countNewlines());

        case 3:
          context$2$0.t0 = context$2$0.sent;
          console.log(context$2$0.t0);

        case 5:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
})();

