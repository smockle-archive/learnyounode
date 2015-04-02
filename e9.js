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
                resolve(Buffer.concat(data).toString());
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
  var printwww = co.wrap(function*(index) {
    let www = new WWW(process.argv[index]);
    let response = Promise.resolve(yield www.get());
    let stringify = yield www.stringify(response);
    console.log(stringify);
    return;
  });

  printwww(2)
  .then(printwww.bind(this, 3))
  .then(printwww.bind(this, 4))
  .catch(err => console.log(err.stack));
})();
