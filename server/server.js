'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
// devuelve el monto a cobrarse sin contar palabras de dos letras
function countWords(message) {
  var x = message.split(' ');
  var monto = 0;
  x.forEach(element => {
    if (element.length > 2) {
      monto += element.length * 0.3;
    }
  });
  return monto;
}
// modifica los puntos de un usuario de acuerdo a lo gastado
function modPuntos(id, monto) {
  app.models.usuario.findById(id)
  .then(data=>{
    app.models.usuario.updateAll({id: id}, {puntos: data.puntos + monto})
    .then(data=>{
      console.log('cambiado');
    });
  });
}
// realiza la transaccion de dinero en caso de ser el receptor
function transfiere(senderId, receptorId, type, costo) {
  // obtencion de una tranzaccion activa entre los usuarios
  app.models.transaccion.find({
    where: {and: [{or:
    [{and: [
      {senderId: senderId},
      {recieverId: receptorId},
    ]}, {and: [
      {senderId: receptorId},
      {recieverId: senderId},
    ]}],
    }, {activo: true}]},
  }).then(transfer=>{
    // obtencion del solicitante y aumento de creditos en caso verdadero
    console.log(transfer);
    if (senderId == transfer[0].senderId) {
      modPuntos(senderId, -costo);
      if (transfer.length > 0) {
      // flujo de aumento de creditos
        app.models.transaccion.updateAll({id: transfer[0].id}, {monto: transfer[0].monto + costo});
      } else {
        app.models.transaccion.create([{
          tipo: type,
          monto: costo,
          senderId: senderId,
          recieverId: receptorId,
        }], (err, data)=>{
          console.log('transferido', data);
        });
      };
    } else {
      console.log('el mensaje es gratuito');
    };
  });
}

boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    app.io.on('connection', (socket) => {
      // socket.broadcast.emit('new user',
      // {message: 'Ha entrado un usuario al Chat'});
      socket.on('join', roomId => {
        console.log('joining roomId', roomId);
        socket.join(roomId);
      });
      socket.on('leave', roomId =>{
        if (roomId != undefined) {
          socket.leave(roomId);
          console.log('room left', roomId);
        }
      });
      socket.on('room message', message => {
        app.models.messageRoom.create([
          {
            'senderId': message.usuarioId,
            'message': message.message,
            'RoomId': message.room,
          },
        ]).then(mensaje=>{
          console.log('mensaje insertado:', mensaje);
          app.models.usuario.findById(message.usuarioId).then(resp=>{
            mensaje.username = resp.username;
            app.io.to(message.room).emit('user says', mensaje[0]);
          });
        });
      });
      socket.on('personal message', message => {
        var idChat, costo;
        (message.senderId > message.receptorId) ? idChat = message.receptorId * 10 + message.senderId : idChat = message.senderId * 10 + message.receptorId;
        costo = countWords(message.message);
        console.log('tendra un costo de ', costo);
        app.models.usuario.findById(message.senderId, {
          fields: {id: true, username: true, puntos: true},
        }, (err, sender)=> {
          if (sender.puntos >= costo && costo > 0) {
            app.models.userMessage.create([{
              'idProper': idChat,
              'message': message.message,
              'senderId': message.senderId,
              'recieverId': message.receptorId,
            }])
            .then(mensaje => {
              console.log('insertado', mensaje);
              transfiere(message.senderId, message.receptorId, 'pay', costo);
              app.io.to(idChat).emit('user says', {
                message: message.message,
                senderId: message.senderId,
                username: sender.username,
                hora: mensaje.fechaEnvio,
                costo: costo,
              });
            });
          } else {
            app.io.to(idChat).emit('fail', {
              'message': 'no tiene saldo suficiente para enviar este mensaje',
            });
          }
        });
      });
      socket.on('disconnect', () => {
        console.log('Ha salido un usuario del Chat');
        socket.broadcast.emit('bye bye user',
        {message: 'Ha salido un usuario del Chat'});
      });
    });
  }
});
