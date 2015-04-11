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

  readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  countNewlines() {
    return new Promise(function(resolve, reject) {
      co(function* () {
        let file = yield this.readFile(this.path);
        resolve(file.split("\n").length - 1);
      }.bind(this))
      .catch(err => reject(err));
    }.bind(this));
  }
}

co(function* () {
  let file = new File(process.argv[2]);
  let count = yield file.countNewlines();
  console.log(count);
})
.catch(err => console.error(err.stack));
