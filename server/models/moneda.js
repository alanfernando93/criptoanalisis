'use strict';

module.exports = function(Moneda) {
  Moneda.afterRemote('findById', function(ctx, moneda, next) {
    var title = Moneda.app.models.titulo;
    title.find({
      where: {
        correspondencia: null,
      },
      include: {
        relation: 'contenido',
        scope: {
          where: {monedaId: ctx.result.id},
        },
      },
    }, function(err, data) {
      ctx.result.titulos = data;
      next();
    });
  });
  Moneda.afterRemote('findById', function(ctx, moneda, next) {
    var title = Moneda.app.models.titulo;
    var iterable = [];
    ctx.result.titulos.forEach((element, index) => {
      var x = title.find({
        where: {
          correspondencia: element.id,
        },
        include: {
          relation: 'contenido',
          scope: {
            where: {monedaId: ctx.result.id},
          },
        },
      }).then(function(data) {
        ctx.result.titulos[index].subtitulos = data;
      });
      iterable.push(x);
    });
    Promise.all(iterable).then(values=>{
      next();
    });
  });
};
