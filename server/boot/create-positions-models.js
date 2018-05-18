'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('punto', function(err) {
    if (err) throw err;
    app.models.punto.create({
      descripcion: 'entrada',
    }, (err, data)=>{
      app.models.punto.create({
        descripcion: 'salida',
      }, (err, data)=>{
        app.models.punto.create({
          descripcion: 'stoploss',
        });
      });
    });
  });
  app.dataSources.db.autoupdate('position', function(err) {
    if (err) throw err;
  });
};
