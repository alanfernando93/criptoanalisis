'use strict';

var server = require('../server/server.js');
var database = server.dataSources.db;
var jsonfile = require('./fakedata');
var migrationArray = [];
Object.keys(jsonfile).forEach(name => {
  var modelMigrated = database.automigrate(name)
    .then(createdModel => {
      var modelInstance = server.registry.modelBuilder.getModel(name);
      jsonfile[name].reduce((promise, element) => {
        return promise.then(data=>{
          return modelInstance.create(element);
        });
      }, Promise.resolve());
    });
  migrationArray.push(modelMigrated);
});
Promise.all(migrationArray)
.then(()=>{
  process.exit();
});
