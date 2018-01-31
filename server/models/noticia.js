'use strict';

module.exports = function(Noticia) {
// validacion campos de noticia
  Noticia.validatesPresenceOf('titulo', 'contenido');
  Noticia.validatesLengthOf('contenido',
  {max: 5000, message: {max: 'contenido is too long'}});
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
};
