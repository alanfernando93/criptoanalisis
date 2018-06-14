'use strict';
const HttpErrors = require('http-errors');
var path = require('path');
module.exports = function(app) {
  var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
  var ruta = path.join(homedir, 'loop');
  var ds = app.dataSource('FileStorage', {
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: ruta,
    allowedContentTypes: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'text/plain',
      'text/html',
    ],
    maxFileSize: 2000000,
  });
  var container = ds.createModel('Container',
    {base: 'model'});
  app.model(container);
  app.models.Container.createContainer({"name":"galery"},(err, data)=>{
    console.log('created container');
  });
  app.models.Container.createContainer({"name":"forms"},(err, data)=>{
    console.log('created container');
  });
};
