#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

var babel_polyfill = require("babel/polyfill"),
    co = require("co"),
    http = require("http");

class WWW {
  constructor(url) {
    this.url = url;
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        if (res.statusCode === 200) resolve(res);
        else reject(new Error("HTTP " + res.statusCode + ": request did not complete successfully"));
      })
      .on("error", err => reject(err));
    });
  }
}

(() => {
    WWW.get(process.argv[2])
    .then(res => {
      res.setEncoding("utf8").on("data", data => console.log(data));
    })
    .catch(err => {
      console.log(err.stack);
    });
})();
