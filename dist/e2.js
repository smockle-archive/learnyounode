#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Numbers = (function () {
  function Numbers(array) {
    _classCallCheck(this, Numbers);

    this.numbers = array.map(Numbers.parseNumber);
  }

  _createClass(Numbers, {
    sum: {
      value: function sum() {
        return this.numbers.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue;
        }, 0);
      }
    }
  }, {
    parseNumber: {
      value: function parseNumber(object) {
        var number = +object;
        if (isNaN(number)) {
          throw new Error("Object cannot be converted to a number");
        }
        return number;
      }
    }
  });

  return Numbers;
})();

(function () {
  var numbers = new Numbers(process.argv.splice(2));
  console.log(numbers.sum());
})();

