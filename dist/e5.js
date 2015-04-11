#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

var Directory = (function () {
  function Directory(path) {
    _classCallCheck(this, Directory);

    this.path = path;
  }

  _createClass(Directory, [{
    key: "readdir",
    value: function readdir(path) {
      return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, data) {
          if (err) reject(err);else resolve(data);
        });
      });
    }
  }, {
    key: "listByExtension",
    value: function listByExtension(extension) {
      return new Promise((function (resolve, reject) {
        co(regeneratorRuntime.mark(function callee$3$0() {
          var list;
          return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
            while (1) switch (context$4$0.prev = context$4$0.next) {
              case 0:
                context$4$0.next = 2;
                return this.readdir(this.path);

              case 2:
                list = context$4$0.sent;

                resolve(list.filter(function (element, index, array) {
                  return element.toLowerCase().endsWith("." + extension);
                }));

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

  return Directory;
})();

co(regeneratorRuntime.mark(function callee$0$0() {
  var directory, list;
  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        directory = new Directory(process.argv[2]);
        context$1$0.next = 3;
        return directory.listByExtension(process.argv[3]);

      case 3:
        list = context$1$0.sent;

        list.forEach(function (currentValue, index, array) {
          return console.log(currentValue);
        });

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}))["catch"](function (err) {
  return console.log(err.stack);
});

