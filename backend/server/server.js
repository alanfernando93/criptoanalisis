'use strict';
require('babel-core/register')();
var boot = require('loopback-boot');
var socket = require('socket.io');
var app = require('./app.js');

boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = socket(app.start());
    app.io.on('connection', (socket) => {
      /** aqui se conecta a los sockets bajo el siguiente criterio
       * la clave de chat entre usuarios es el id de ambos
       * la clave de un usuario es su propio id
       * la clave de una suscripcion es el la palabra sus seguido del id al que estas suscrito
       */
      socket.on('join', roomId => {
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
          if (message.chatType === 'free') {
            // flujo en caso de chat gratuito
            chatGratis({
              message: message.message,
              senderId: message.senderId,
              username: sender.username,
              hora: Date.now(),
              costo: costo,
            }, idChat, app.io);
          } else {
            // flujo en caso de chat de paga
            if (sender.puntos >= costo && costo > 0) {
              transfiere(message.senderId, message.receptorId, 'pay', costo);
              sendmessage({
                message: message.message,
                senderId: message.senderId,
                username: sender.username,
                hora: Date.now(),
                costo: costo,
              }, idChat, app.io);
            } else {
              app.io.to(idChat).emit('fail', {
                'message': 'no tiene saldo suficiente para enviar este mensaje',
              });
            }
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
