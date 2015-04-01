#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

var Directory = (function () {
  function Directory(path) {
    _classCallCheck(this, Directory);

    this.path = path;
  }

  _createClass(Directory, {
    readdir: {
      value: regeneratorRuntime.mark(function readdir() {
        var _this = this;

        return regeneratorRuntime.wrap(function readdir$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return Directory.readdir(_this.path);

            case 2:
            case "end":
              return context$2$0.stop();
          }
        }, readdir, this);
      })
    },
    listByExtension: {
      value: function listByExtension(extension) {
        return co(regeneratorRuntime.mark(function callee$2$0() {
          var _this = this;

          var list;
          return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return _this.readdir().next().value;

              case 2:
                list = context$3$0.sent;
                return context$3$0.abrupt("return", list.filter(function (element, index, array) {
                  return element.toLowerCase().endsWith("." + extension);
                }));

              case 4:
              case "end":
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }).bind(this))["catch"](function (err) {
          return console.log(err.stack);
        });
      }
    }
  }, {
    readdir: {
      value: function readdir(path) {
        return function (done) {
          fs.readdir(path, done);
        };
      }
    }
  });

  return Directory;
})();

(function () {
  co(regeneratorRuntime.mark(function callee$1$0() {
    var directory, list;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          directory = new Directory(process.argv[2]);
          context$2$0.next = 3;
          return Promise.resolve(directory.listByExtension(process.argv[3]));

        case 3:
          list = context$2$0.sent;

          list.forEach(function (currentValue, index, array) {
            return console.log(currentValue);
          });

        case 5:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }))["catch"](function (err) {
    return console.log(err.stack);
  });
})();

