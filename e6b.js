#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

(() => {
  let ls = require("./e6a.js");
  ls(process.argv[2], process.argv[3], (err, list) =>
    list.forEach((currentValue, index, array) =>
      console.log(currentValue)));
})();
