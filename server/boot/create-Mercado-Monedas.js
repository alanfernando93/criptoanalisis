'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('mercado', function(err){
    if (err)
      throw err;
  });
  app.dataSources.db.autoupdate('moneda', function(err) {
    console.log('model created');
  });
  app.dataSources.db.autoupdate('titulo', function(err) {
    if (err)
      throw err;
  });
  app.dataSources.db.autoupdate('contenidoMoneda', function(err) {
    if (err)
      throw err;
  });
};
