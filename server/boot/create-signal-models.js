'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('signal', function(err) {
    if (err) throw err;

    app.models.signal.create([{
      'titulo': 'Bitcoin',
      'tipoInversion': 'prueba de señales',
      'visible': 'gratuito',
      'usuarioId': 1,
    }], function(err, señal) {
      if (err)
        console.log('error insertando señal');
      console.log('Models created: \n', señal);
    });
  });
  app.dataSources.db.automigrate('Suscripcion', function(err) {
    if (err) throw err;
    app.models.Suscripcion.create([{
      'SeguidorId': '1',
      'TraderId': '1',
    }], function(err, suscripcion) {
      if (err)
        console.log('error al suscribirse');
      console.log('Models created: \n', suscripcion);
    });
  });
};
