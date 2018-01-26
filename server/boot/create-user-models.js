'use strict';

module.exports = function(app) {

  app.dataSources.db.automigrate('usuario', function (err) {
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
