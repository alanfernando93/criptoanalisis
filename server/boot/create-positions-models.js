'use strict';

module.exports = function(app) {

  app.dataSources.db.automigrate('position', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('LikeSignal', function(err) {
    if (err) throw err;
  });
  app.dataSources.db.automigrate('commentSignal',function(err) {
    if (err) throw err;
  });
};
