'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('messageRoom', function(err) {
    if (err)
      throw err;
    app.models.messageRoom.create({
      'content': 'Bienvenido al chat',
    }, (err, data)=>{
      if (err) throw err;
      else
        console.log('mensaje insertado', data);
    });
  });
};
