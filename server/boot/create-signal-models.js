'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('signal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('Suscripcion', function(err) {
    if (err) throw err;
  });
};
