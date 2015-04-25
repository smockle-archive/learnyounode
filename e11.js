#!/usr/bin/env node
"use strict";

class HTTPServer {
  constructor(port, path) {
    let http = require("http");
    let server = http.createServer(function (request, response) {
      this.readFile(path).pipe(response);
    }.bind(this));
    server.listen(port);
  }

  readFile(path) {
    let fs = require("fs");
    return fs.createReadStream(path);
  }
}

(() => {
  let server = new HTTPServer(process.argv[2], process.argv[3]);
})();
