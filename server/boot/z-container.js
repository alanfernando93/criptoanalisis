'use scrict';
var loopback = require('loopback');
module.exports = function(app) {

    if(app.dataSources.FileStorage != undefined)
    {
      app.dataSources.FileStorage.connector.getFilename = function (origFilename, req, res) {
        var origFilename = origFilename.name;
        var parts = origFilename.split('.'),
        extension = parts[parts.length-1];
        var newFilename = 'perfil.' + extension;
        return newFilename;
  }
    } 
  };