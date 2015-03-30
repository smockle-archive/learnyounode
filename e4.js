#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

var babel_polyfille = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

class File {
  static readFile(path) {
    return function(callback) {
      fs.readFile(path, "utf8", callback);
    };
  }

  *readFile() {
    yield File.readFile(this.path);
  }

  constructor(path) {
    this.path = path;
    this.countNewlines = co.wrap(function* () {
        let result = yield this.readFile().next().value;
        return result.split("\n").length - 1;
    });
  }
}

(() => {
  co(function* () {
    let file = new File(process.argv[2]);
    console.log(yield Promise.resolve(file.countNewlines()));
  });
})();
