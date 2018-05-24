'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('signal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('Suscripcion', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('comentario_senal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('answer-senal', function(err) {
    if (err) throw err;
  });
};
