export default (Answersenal) => {
  Answersenal.afterRemote('create', (ctx, user, next) => {
    var io = Answersenal.app.io;
    var answer = 'signals' + ctx.result.signalId;
    io.to(answer).emit('signalAns', ctx.result);
    next();
  });
  Answersenal.afterRemote('create', (ctx, user, next)=>{
    var io = Answersenal.app.io;
    Answersenal.app.models.signal.findById(ctx.result.signalId)
    .then(data=>{
      Answersenal.app.models.notification.create({
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
