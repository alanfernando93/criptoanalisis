'use strict';
var jsonfile = require('./defaultdata.json');
module.exports = function createdefaultData(app) {
  var fakedataArray = jsonfile.fakeDataArray;
  fakedataArray.forEach(model => {
    app.dataSources.db.automigrate(model.name)
    .then(createdModel => {
      var modelInstance = app.registry.modelBuilder.getModel(model.name);
      var PromiseArray = [];
      model.Array.forEach(jsonObject=>{
        var createPromise = modelInstance.create(jsonObject);
        PromiseArray.push(createPromise);
      });
      Promise.all(PromiseArray)
      .catch(err=>{
        console.log('error while inserting elements');
      });
    });
  });
};
