#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

(function () {
  var ls = require("./e6a.js");
  ls(process.argv[2], process.argv[3], function (err, list) {
    return list.forEach(function (currentValue, index, array) {
      return console.log(currentValue);
    });
  });
})();

