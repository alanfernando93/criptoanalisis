'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('denuncia', function(err) {
    if (err) throw err;
  });
};
