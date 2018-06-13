// TODO: Se ejecutara cada vez que se inicie la aplicacion, borrando todos los datos en estas tablas? MOVER?
'use strict';
var server = require('../server');
var ds = server.dataSources.db;
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];
module.exports = function(app) {
  app.dataSources.db.autoupdate(lbTables, function(err, data) {
    if (err)
      console.log('no se pudo crear las tablas correctamente');
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    Role.create({
      name: 'admin',
    }, function(err, role) {
      if (err)
        console.log('rol ya creado');
      else {
        console.log('Created role:', role);
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: 1,
        }, function(err, principal) {
          if (err)
            console.log('rol ya creado');
          else
            console.log('Created principal:', principal);
        });
      };
      Role.create({
        name: 'normal',
      }, function(err, role) {
        if (err)
          console.log('rol ya creado');
        else
          console.log('created:', role);
        Role.create({
          name: 'premium',
        }, function(err, role) {
          if (err)
            console.log('rol ya creado');
          else
            console.log('created:', role);
        });
      });
    });
  });
};

