'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('signal', function(err) {
    if (err) throw err;

    app.models.signal.create([{
      "titulo": "Bitcoin",
      "tipoInversion" : "prueba de señales",
    }], function(err, noticias) {
      console.log('Models created: \n', noticias);
    });
  });
};