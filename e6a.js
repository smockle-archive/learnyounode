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

  readdir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  listByExtension(extension) {
    return new Promise(function(resolve, reject) {
      co(function* () {
        let list = yield this.readdir(this.path);
        resolve(list.filter((element, index, array) =>
          element.toLowerCase().endsWith("." + extension)));
      }.bind(this))
      .catch(err => reject(err));
    }.bind(this));
  }
}

module.exports = (path, extension, callback) => {
  co(function* () {
    let directory = new Directory(path);
    let list = yield directory.listByExtension(extension);
    callback(null, list);
  })
  .catch(err => callback(err));
};
