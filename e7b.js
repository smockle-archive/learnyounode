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
        else reject(new Error("HTTP " + res.statusCode));
      })
      .on("error", err => reject(err));
    });
  }

  static stringify(response) {
    return new Promise((resolve, reject) => {
      var data = [];
      response.then(res => res
              .on("data", chunk => data.push(chunk))
              .on("end", () => {
                // resolve(Buffer.concat(data).toString());
                resolve(data);
              }));
    });
  }

  get() {
    return co(function* () {
      return Promise.resolve(yield WWW.get(this.url));
    }.bind(this))
    .catch(err => console.log(err.stack));
  }

  stringify(response) {
    return co(function* () {
      return Promise.resolve(yield WWW.stringify(response));
    }.bind(this))
    .catch(err => console.log(err.stack));
  }
}

(() => {
  co(function* () {
    let www = new WWW(process.argv[2]);
    let response = Promise.resolve(yield www.get());
    let stringify = yield www.stringify(response);
    stringify.map((currentValue, index, array) =>
      console.log(currentValue.toString()));
  })
  .catch(err => console.log(err.stack));
})();
