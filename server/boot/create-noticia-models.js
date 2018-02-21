'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('noticia', function(err) {
    if (err) throw err;
  });
};
