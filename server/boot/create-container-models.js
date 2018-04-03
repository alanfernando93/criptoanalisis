"use strict";

module.exports = function(app) {
  app.dataSources.db.autoupdate("container", function(err) {
    app.models.Container.createContainer({ name: "galery" }, function(
      err,
      c
    ) {});
    app.models.Container.createContainer({ name: "forms" }, function(
      err,
      c
    ) {});
  });
};
