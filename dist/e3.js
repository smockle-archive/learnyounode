#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var File = (function () {
  function File(path) {
    _classCallCheck(this, File);

    var fs = require("fs");
    this.file = fs.readFileSync(path);
  }

  _createClass(File, {
    countNewlines: {
      value: function countNewlines() {
        return this.file.toString().split("\n").length - 1;
      }
    }
  });

  return File;
})();

(function () {
  var file = new File(process.argv[2]);
  console.log(file.countNewlines());
})();

