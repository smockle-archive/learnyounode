#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

class File {
  constructor(path) {
    this.path = path;
  }

  static readFile(path) {
    return function(callback) {
      fs.readFile(path, "utf8", callback);
    };
  }

  *readFile() {
    yield File.readFile(this.path);
  }

  countNewlines() {
    return co(function* () {
      let file = yield this.readFile().next().value;
      return file.split("\n").length - 1;
    }.bind(this))
    .catch((err) => console.error(err.stack));
  }
}

(() => {
  co(function* () {
    let file = new File(process.argv[2]);
    let count = yield Promise.resolve(file.countNewlines());
    console.log(count);
  })
  .catch((err) => console.error(err.stack));
})();
