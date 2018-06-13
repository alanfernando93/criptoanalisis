'use strict';
var jsonfile = require('./defaultdata.js');
module.exports = function createdefaultData(app) {
  Object.keys(jsonfile).forEach(name => {
    app.dataSources.db.automigrate(name)
    .then(createdModel => {
      var modelInstance = app.registry.modelBuilder.getModel(name);
      jsonfile[name].reduce((promise, element) => {
        return promise.then(data=>{
          return modelInstance.create(element);
        });
      }, Promise.resolve());
    });
  });
};

