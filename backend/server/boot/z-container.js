'use scrict';
var loopback = require('loopback');
module.exports = function(app) {
      app.dataSources.FileStorage.connector.getFilename = function (origFilename, req, res) {
        var origFilename = origFilename.name;
        var parts = origFilename.split('.'),
        extension = parts[parts.length-1];
        var newFilename = Date.now() + '.' + extension;
        return origFilename;
      };
};