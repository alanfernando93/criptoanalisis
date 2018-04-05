'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('transaccion', function(err, data) {
    if (err)
      throw err;
    else
    app.models.transaccion.create([{
      monto: 100,
      activo: true,
      senderId: 2,
      recieverId: 1,
    },
    ]);
  });
  app.dataSources.db.autoupdate('solicitud', function(err, data) {
    if (err)
      throw err;
    else
    app.models.solicitud.create([{
      activo: true,
      aceptacion: false,
      duracion: Date.now(),
      senderId: 3,
      recieverId: 1,
    },
    ]);
  });
};
