#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    http = require("http");

var WWW = (function () {
  function WWW(url) {
    _classCallCheck(this, WWW);

    this.url = url;
  }

  _createClass(WWW, {
    get: {
      value: function get() {
        return co(regeneratorRuntime.mark(function callee$2$0() {
          var _this = this;

          return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return WWW.get(_this.url);

              case 2:
                context$3$0.t0 = context$3$0.sent;
                return context$3$0.abrupt("return", Promise.resolve(context$3$0.t0));

              case 4:
              case "end":
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        }).bind(this))["catch"](function (err) {
          return console.log(err.stack);
        });
      }
    },
    stringify: {
      value: function stringify(response) {
        return co(regeneratorRuntime.mark(function callee$2$0() {
          return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return WWW.stringify(response);

              case 2:
                context$3$0.t1 = context$3$0.sent;
                return context$3$0.abrupt("return", Promise.resolve(context$3$0.t1));

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
    get: {
      value: function get(url) {
        return new Promise(function (resolve, reject) {
          http.get(url, function (res) {
            if (res.statusCode === 200) resolve(res);else reject(new Error("HTTP " + res.statusCode));
          }).on("error", function (err) {
            return reject(err);
          });
        });
      }
    },
    stringify: {
      value: function stringify(response) {
        return new Promise(function (resolve, reject) {
          var data = [];
          response.then(function (res) {
            return res.on("data", function (chunk) {
              return data.push(chunk);
            }).on("end", function () {
              resolve(Buffer.concat(data).toString());
            });
          });
        });
      }
    }
  });

  return WWW;
})();

(function () {
  var printwww = co.wrap(regeneratorRuntime.mark(function callee$1$0(index) {
    var www, response, stringify;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          www = new WWW(process.argv[index]);
          context$2$0.next = 3;
          return www.get();

        case 3:
          context$2$0.t2 = context$2$0.sent;
          response = Promise.resolve(context$2$0.t2);
          context$2$0.next = 7;
          return www.stringify(response);

        case 7:
          stringify = context$2$0.sent;

          console.log(stringify);
          return context$2$0.abrupt("return");

        case 10:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));

  printwww(2).then(printwww.bind(undefined, 3)).then(printwww.bind(undefined, 4))["catch"](function (err) {
    return console.log(err.stack);
  });
})();

