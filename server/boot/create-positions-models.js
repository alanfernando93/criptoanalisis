'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('punto', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('LikeSignal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('commentSignal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('position', function(err) {
    if (err) throw err;
    app.models.position.create([{
      descripcion: 'entrada',
    }, {
      descripcion: 'salida',
    }, {
      descripcion: 'stoploss',
    }]);
  });
};
