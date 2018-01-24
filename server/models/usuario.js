'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = function(Usuario) {
  Usuario.getNoticias = function(cb) {
    Usuario.find({
      where: {
        id: $state.params.id
      },
      'include': {'relation': 'noticia',
      },
    });
  };
  Usuario.remoteMethod('noticia_usuario', {
    returns: {arg: 'Usuarios', type: 'array'},
    http: {path: '/noticias', verb: 'get'},
  });
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

  Usuario.download = function(req, res, cb) {
    var Container = Usuario.app.models.Container;
    // var user = req.params.id;
    Container.download('2', 'tabs-vs-spaces.jpg', cb);
  };
  Usuario.remoteMethod(
    'download',
    {
      http: {path: '/:id/download', verb: 'get'},
      accepts: [
        {arg: 'body', type: 'file', root: true},
        {arg: 'Content-Type', type: 'string', 'http': {target: 'header'}},
      ],
      returns: {arg: 'status', type: 'file'},
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
