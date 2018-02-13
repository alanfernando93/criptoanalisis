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
  app.dataSources.db.automigrate('moneda', function(err) {
    console.log('model created');
  });
  app.dataSources.db.automigrate('titulo', function(err) {
    if (err)
      throw err;
    app.models.titulo.create({
      'nombre': 'Ideas del proyecto',
    }, function(err, data) {
      app.models.titulo.create({
        'nombre': 'Redes Sociales',
      }, function(err, data) {
        app.models.titulo.create({
          'nombre': 'Oferta y Demanda',
        }, function(err, data) {
          app.models.titulo.create({
            'nombre': 'Team',
          }, function(err, data) {
            app.models.titulo.create({
              'nombre': 'RoadMap',
              'correspondencia': 1,
            });
            app.models.titulo.create({
              'nombre': 'estadisticas',
              'correspondencia': 2,
            });
            app.models.titulo.create({
              'nombre': 'Oferta',
              'correspondencia': 3,
            });
          });
        });
      });
    });

  });
  app.dataSources.db.automigrate('contenidoMoneda', function(err) {
    if (err)
      throw err;
  });
};
