const fs = require('fs');
const assert = require('assert');
const async = require('async');
const SyncGatewayAdmin = require('sync-gateway-client').SyncGatewayAdmin;

module.exports = {
  openStream: function (fileName, encoding) {
    const fd = fs.openSync(fileName, 'r');
    const stream = fs.createReadStream(fileName, { fd: fd });
    return stream;
  },

  gateway: function(options, callback) {
    let error = null;
    let service = null;
    try {
      assert(options.parent.database);
      assert(options.parent.host);
      assert(options.parent.port);
      service = new SyncGatewayAdmin({
        database: options.parent.database,
        host: options.parent.host,
        port: options.parent.port
      });
    }
    catch(e) {
      error = e;
    }
    callback(error, service);
  },

  jsonify: function (text, callback) {
    let json = null;
    let error = null;
    try {
      assert.ok(typeof text === 'string');
      json = JSON.parse(text);
    }
    catch (exception) {
      error = exception;
    }
    callback(error, json);
  },

  readInput: function (stream, encoding, callback) {
    let buffer = '';
    stream.setEncoding(encoding);
    stream.on('data', (chunk) => {
      console.log("data: ", chunk);
      buffer += chunk;
    });
    stream.on('end', () => {
      callback(null, buffer);
    });
    stream.on('error', (err) => {
      callback(err);
    });
  }

};
