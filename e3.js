#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

class File {
  constructor(path) {
    let fs = require("fs");
    this.file = fs.readFileSync(path);
  }

  countNewlines() {
    return this.file.toString().split("\n").length - 1;
  }
}

(function () {
  let file = new File(process.argv[2]);
  console.log(file.countNewlines());
})();
