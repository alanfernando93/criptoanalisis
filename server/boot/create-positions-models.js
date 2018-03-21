'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('punto', function(err) {
    if (err) throw err;
    app.models.punto.create([{
      descripcion: 'entrada',
    }, {
      descripcion: 'salida',
    }, {
      descripcion: 'stoploss',
    }]);
  });
  app.dataSources.db.autoupdate('commentSignal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('position', function(err) {
    if (err) throw err;
  });
};
