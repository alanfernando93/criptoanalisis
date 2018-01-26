'use strict';
var path = require('path');
module.exports = function(app) {
    var loopback = require('loopback');

    var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
    var ruta = path.join(homedir, 'loop');
    var ds = loopback.createDataSource({
      name: 'FileStorage',
      connector: require('loopback-component-storage'),
      provider: 'filesystem',
      root: ruta,
    });
    var container = ds.createModel('Container');
    app.model(container);
}