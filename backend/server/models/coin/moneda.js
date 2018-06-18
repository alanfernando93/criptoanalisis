export default (Moneda) => {
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
  Moneda.CrearVarios = function(req, res, cb) {
    var monedas = req.body;
    var cons = [];
    monedas.forEach(element => {
      var x = Moneda.create({
        'name': element.name,
        'symbol': element.symbol,
        'TotalSuply': element.total_supply,
      });
      cons.push(x);
    });
    Promise.all(cons).then(values=>{
      cb(null, values);
    });
  };
  Moneda.remoteMethod(
       'CrearVarios',
    {
      http: {path: '/CrearVarios', verb: 'post'},
      accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: {arg: 'status', type: 'string'},
    }
  );
  Moneda.nombres = function(cb) {
    Moneda.find({
      fields: {id: true, name: true},
    }, cb);
  };
  Moneda.remoteMethod('nombres', {
    returns: {arg: 'monedas', type: 'array'},
    http: {path: '/nombres', verb: 'get'},
  });
};
