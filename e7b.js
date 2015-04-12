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

  get(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        if (res.statusCode === 200) resolve(res);
        else reject(new Error("HTTP " + res.statusCode));
      })
      .on("error", err => reject(err));
    });
  }

  stringify(response) {
    return new Promise((resolve, reject) => {
      var data = [];
      response.on("data", chunk => data.push(chunk))
              .on("end", () => resolve(data));
    });
  }
}

co(function* () {
  let www = new WWW(process.argv[2]);
  let response = yield www.get(www.url);
  let stringify = yield www.stringify(response);
  stringify.map((currentValue, index, array) =>
    console.log(currentValue.toString()));
})
.catch(err => console.log(err.stack));
