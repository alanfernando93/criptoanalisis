  'use strict';

  module.exports = function(app) {
    var User = app.models.usuario;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    app.dataSources.db.automigrate('usuario', function(err) {
      if (err) throw err;

      app.models.usuario.create([{
        'username': 'ccuellar',
        'email': 'ccuellar@test.com',
        'password': 'claudio123',
      }], function(err, usuarios) {
        console.log('Models created: \n', usuarios);
      });
    });
  };
