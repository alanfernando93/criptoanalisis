'use strict';
var io = require('socket.io-client');
module.exports = function(Position) {
  // hook para conexion a socket de cryptocompare
  Position.afterRemote('create', function(ctx, user, next) {
    var socket = io.connect('wss://streamer.cryptocompare.com', {reconnect: true});
    var sw = false;
    socket.on('connect', function(socket) {
      console.log('Connected!');
    });
    socket.emit('SubAdd', {subs: [`0~Poloniex~${ctx.result.moneda1}~${ctx.result.moneda2}`]});
    socket.on('m', function(message) {
      var x = message.split('~');
      if (x.length > 2) {
        if (parseInt(x[8]) >= ctx.result.valor) {
          // cambiar el estado en caso de exito y desconexion
          sw = true;
          Position.app.models.signal.findById(ctx.result.signalId)
          .then(data=>{
            if (data.estado == 'pasivo') {
              Position.app.models.signal.updateAll({id: ctx.result.signalId},
                {estado: 'activo'});
            } else if (data.estado == 'activo') {
              Position.app.models.signal.updateAll({id: ctx.result.signalId},
                {estado: 'exito'});
            }
            socket.emit('SubRemove', {subs: [`0~Poloniex~${ctx.result.moneda1}~${ctx.result.moneda2}`]});
          });
        }
      }
    });
    next();
  });
};
