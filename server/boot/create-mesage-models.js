'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('messageRoom', function(err) {
    if (err)
      throw err;
    app.models.messageRoom.create({
      'message': 'Bienvenido al chat',
    }, (err, data)=>{
      if (err) throw err;
      else
        console.log('mensaje insertado', data);
    });
  });
  app.dataSources.db.autoupdate('userMessage', function(err) {
    if (err)
      throw err;
    app.models.userMessage.create({
      'message': 'hola',
      'idProper': 123,
    });
  });
};
