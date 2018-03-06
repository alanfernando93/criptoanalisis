'use strict';

module.exports = function(app) {

  app.dataSources.db.automigrate('asesoria_personal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('disputa', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('instruccion',function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('pago',function(err) {
    if (err) throw err;
  });
  
};
