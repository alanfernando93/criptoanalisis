'use strict';
var _variable = require('../../variable');

module.exports = (Comentariosenal) => {
  Comentariosenal.afterRemote('create', (ctx, user, next) => {
    var io = Comentariosenal.app.io;
    var signals = 'signals' + ctx.result.signalId;
    ctx.result.res = [];
    io.to(signals).emit('signalCom', ctx.result);
    next();
  });
  Comentariosenal.afterRemote('create', (ctx, user, next) => {
    Comentariosenal.app.models.signal.
    findById(ctx.result.signalId).then(data => {
      let userId = ctx.result.userId;
      let coinSignal = data.tipo_modena;
      Comentariosenal.app.models.usuario.
      famaUser(userId, _variable.rpc, coinSignal);
    });
    next();
  });
  Comentariosenal.afterRemote('create', (ctx, user, next)=>{
    var io = Comentariosenal.app.io;
    Comentariosenal.app.models.signal.findById(ctx.result.signalId)
    .then(data=>{
      Comentariosenal.app.models.notification.create({
        'tipo': 'comSig',
        'senderId': ctx.result.signalId,
        'date': Date.now(),
        'status': false,
        'usuarioId': data.usuarioId,
        'emmiterId': ctx.result.userId,
      });
      io.to(data.usuarioId).emit('request', {
        tipo: 'comSig',
        senderId: ctx.result.signalId,
        emmiterId: ctx.result.userId,
      });
    });
  });
};
