'use strict';
var path = require('path');
module.exports = function(app){
    var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
    var ruta = path.join(homedir, 'loop');
    var ds = app.dataSource('FileStorage', {
      connector: require('loopback-component-storage'),
      provider: 'filesystem',
      root: ruta,
    });
    var container = ds.createModel('Container');
    app.model(container);
}