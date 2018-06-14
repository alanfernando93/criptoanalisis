'use strict';
var server = require('../server/server.js');
var database = server.dataSources.db;
var jsonfile = require('./proddata.js');
var migrationArray = [];

Object.keys(jsonfile).forEach(name => {
  var modelmigrated = database.autoupdate(name);
  migrationArray.push(modelmigrated);
});
Promise.all(migrationArray)
.then(()=>{
  process.exit();
});
