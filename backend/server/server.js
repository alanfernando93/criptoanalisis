'use strict';
require('babel-core/register')();
var boot = require('loopback-boot');
var socket = require('socket.io');
//var app = require('./app.js');

var loopback = require('loopback');
var app = module.exports = loopback();

app.start = () => {
  // start the web server
  var server = app.listen(function() {
    app.emit('started', server);
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
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
    if (transfer.length > 0) {
      modPuntos(senderId, -costo);
      if (senderId == transfer[0].senderId) {
      // flujo de aumento de creditos
        app.models.transaccion.updateAll({id: transfer[0].id},
           {monto: transfer[0].monto + costo});
      } else {
        console.log('el mensaje es gratuito');
      };
    } else {
      app.models.transaccion.create([{
        tipo: type,
        monto: costo,
        senderId: senderId,
        recieverId: receptorId,
        razon: 'chat',
        activo: true,
      }], (err, data)=>{
        console.log('transferido', data);
      });
    };
  });
}
// chat gratis usuario (tipo objeto)
function chatGratis(usuario, idchat, path) {
  app.models.solicitud.find({
    where: {and: [{or:
    [{and: [
        {senderId: usuario.senderId},
        {recieverId: usuario.receptorId},
    ]}, {and: [
        {senderId: usuario.receptorId},
        {recieverId: usuario.senderId},
    ]}],
    }, {activo: true}, {aceptacion: true}]},
  }).then(data=>{
    console.log(data);
    if (data.length > 0) {
      sendmessage(usuario, idchat, path);
    } else {
      path.to(idchat).emit('fail', {'message': 'la solicitud caduco o aun no esta aceptada'});
    }
  });
}
function sendmessage(message, idchat, path) {
  app.models.userMessage.create({
    'idProper': idchat,
    'message': message.message,
    'senderId': message.senderId,
    'recieverId': message.receptorId,
  }).then(data=>{
    path.to(idchat).emit('user says', message);
  });
};

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
