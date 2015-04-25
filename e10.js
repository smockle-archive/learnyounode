#!/usr/bin/env node
"use strict";

class TCPServer {
  constructor(port) {
    let net = require("net");
    let server = net.createServer(function (socket) {
      this.writeSocket(socket, this.getDateTime());
    }.bind(this));
    server.listen(port);
  }

  writeSocket(socket, data) {
    socket.write(data);
    socket.end();
  }

  getDateTime() {
    let strftime = require("strftime");
    return strftime("%F %H:%M");
  }
}

(() => {
  let server = new TCPServer(process.argv[2]);
})();
