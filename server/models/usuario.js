'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = function(Usuario) {
  Usuario.upload = function(req, res, cb) {
    var Container = Usuario.app.models.Container;
    var user = req.params.id;
    Container.createContainer({name: user}, function(err, c) {
      Container.upload(req, res, {container: user}, cb);
    });
  };
  Usuario.remoteMethod(
       'upload',
    {
      http: {path: '/:id/upload', verb: 'post'},
      accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: {arg: 'status', type: 'string'},
    }
  );
  Usuario.observe('loaded', function(context, next) {
    if (context.data.id != undefined){
      var cont = context.data.id;
      var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
      base64Img.base64(homedir + '/loop/' + cont + '/perfil.png', (err, data)=> {
        context.data.profile = data;
        next();
      });
    };
  });
};
