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
//validacion campos notcias con hooks
  Noticia.observe('before save', function(context, next) {
    var tit = context.instance.titulo;
    var cont = context.instance.contenido;
    if (tit.length > 25)
    {
      return next(new HttpErrors.BadRequest('Titulo debe tener como maximo 25 caracteres'));   
    }
    if (tit === ' ')
    {
      return next(new HttpErrors.BadRequest('Titulo es un campo  requerido'));
      
    }
    if (cont === ' ')
    {
      return next(new HttpErrors.BadRequest('Contenido es un campo requerido'));
  
    }
    if (cont.length > 5000)
    {
      return next(new HttpErrors.BadRequest('El contenido debe tener como maximo 5000 caracteres'));
    }
    next();
  });
};
