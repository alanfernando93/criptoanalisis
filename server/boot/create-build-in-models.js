//TODO: Se ejecutara cada vez que se inicie la aplicacion, borrando todos los datos en estas tablas? MOVER?
var server = require('../server');
var ds = server.dataSources.db;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);  
});