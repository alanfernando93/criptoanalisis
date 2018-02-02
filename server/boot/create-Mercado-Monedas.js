'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('mercado', function(err){
    if (err)
      throw err;
    app.models.mercado.create({
      'nombre': 'tarjeta de credito',
      'descripcion': 'esta monedas son utilizables en este mercado',
    });
  });
  app.dataSources.db.automigrate('moneda', function(err){
    if (err)
      throw err;
    app.models.moneda.create({
      'nombre': 'Siacoin',
      'TotalSupply': '2000000',
      'mineria': 'pow',
    });
  });
  app.dataSources.db.automigrate('titulo', function(err) {
    if (err)
      throw err;
    app.models.titulo.create({
      'nombre': 'Redes Sociales',
    });
    app.models.titulo.create({
      'nombre': 'estadisticos',
      'correspondencia': 1,
    });
  });
  app.dataSources.db.automigrate('contenidoMoneda', function(err) {
    if (err)
      throw err;
  });
};
