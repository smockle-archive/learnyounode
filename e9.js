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
              .on("end", () => resolve(Buffer.concat(data).toString()));
    });
  }
}

(() => {
  var printwww = co.wrap(function*(index) {
    let www = new WWW(process.argv[index]);
    let response = yield www.get(www.url);
    let stringify = yield www.stringify(response);
    console.log(stringify);
  });

  printwww(2)
  .then(printwww.bind(this, 3))
  .then(printwww.bind(this, 4))
  .catch(err => console.log(err.stack));
})();
