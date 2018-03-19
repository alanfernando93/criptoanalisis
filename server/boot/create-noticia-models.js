'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('noticia', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('comentario_noticia', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.autoupdate('answer_noticia', function(err) {
    if (err) throw err;
  });
};
