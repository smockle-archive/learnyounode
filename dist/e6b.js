#!/usr/bin/env node

/*jshint esnext: true */
"use strict";

var ls = require("./e6a.js");

ls(process.argv[2], process.argv[3], function (err, data) {
  data.forEach(function (currentValue, index, array) {
    return console.log(currentValue);
  });
});

