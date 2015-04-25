#!/usr/bin/env node
"use strict";

class HTTPServer {
  constructor(port) {
    let http = require("http");
    let server = http.createServer(function (request, response) {
      let url = require("url");
      this.route(url.parse(request.url, true), response);
    }.bind(this));
    server.listen(port);
  }

  route(url, response) {
      switch (url.pathname) {
      case "/api/parsetime":
        return this.routeParseTime(url, response);
      case "/api/unixtime":
        return this.routeUnixTime(url, response);
      default:
        return this.routeDefault(url, response);
      }
  }

  routeParseTime(url, response) {
    let date = new Date(url.query.iso);
    let json = {
      "hour": date.getHours(),
      "minute": date.getMinutes(),
      "second": date.getSeconds()
    };
    response.write(JSON.stringify(json));
    response.statusCode = 200;
    response.end();
  }

  routeUnixTime(url, response) {
    let date = new Date(url.query.iso);
    let json = {
      "unixtime": date.getTime()
    };
    response.write(JSON.stringify(json));
    response.statusCode = 200;
    response.end();
  }

  routeDefault(url, response) {
    response.statusCode = 404;
    response.end();
  }
}

(() => {
  let server = new HTTPServer(process.argv[2]);
})();
