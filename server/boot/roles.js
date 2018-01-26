'use strict';
module.exports = function(app) {
  var role = app.models.Role;
  role.create({
    name: 'normal',
  }, function(err, role) {
    if (err)
      throw err;
    else
     console.log('rol creado:', role);
  });
};
