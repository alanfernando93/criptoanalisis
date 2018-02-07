'use strict';

module.exports = function(Noticia) {
  const HttpErrors = require('http-errors');

// validacion campos de noticia

  Noticia.Listar_noticias = function(cb) {
    Noticia.find({
      where: {
        titulo: 'bitcoin',
      },
    }, cb);
  };

  Noticia.remoteMethod('Listar_noticias', {
    returns: {arg: 'Noticias', type: 'array'},
    http: {path: '/listar_noticias', verb: 'get'},
  });
  Noticia.afterRemote('find', function(ctx, noticia, next) {
    ctx.result.forEach(element => {
      element.fecha_create=Date.now();
      console.log(element.fecha_create);
    });
    next();
  });
};
