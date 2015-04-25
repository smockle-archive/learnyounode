#!/usr/bin/env node
"use strict";

class HTTPServer {
  constructor(port) {
    let http = require("http");
    let server = http.createServer(function (request, response) {
      this.toUpperCase(request).pipe(response);
    }.bind(this));
    server.listen(port);
  }

  toUpperCase(stream) {
    let map = require("through2-map");
    return stream.pipe(map(chunk => chunk.toString().toUpperCase()));
  }
}

(() => {
  let server = new HTTPServer(process.argv[2]);
})();
