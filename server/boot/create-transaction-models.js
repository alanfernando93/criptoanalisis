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
};
