#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    fs = require("fs");

class Directory {
  constructor(path) {
    this.path = path;
  }

  static readdir(path) {
    return done => {
      fs.readdir(path, done);
    };
  }

  *readdir() {
    yield Directory.readdir(this.path);
  }

  listByExtension(extension) {
    return co(function* () {
      let list = yield this.readdir().next().value;
      return list.filter((element, index, array) =>
        element.toLowerCase().endsWith("." + extension));
    }.bind(this))
    .catch(err => console.log(err.stack));
  }
}

(() => {
  co(function* () {
    let directory = new Directory(process.argv[2]);
    let list = yield Promise.resolve(directory.listByExtension(process.argv[3]));
    list.forEach((currentValue, index, array) => console.log(currentValue));
  })
  .catch(err => console.log(err.stack));
})();
