export default (Answernoticia) =>{
  Answernoticia.afterRemote('create', (ctx, user, next) => {
    var io = Answernoticia.app.io;
    var answer = 'news' + ctx.result.noticiaId;
    io.to(answer).emit('newAns', ctx.result);
    next();
  });
  Answernoticia.afterRemote('create', (ctx, user, next)=>{
    var io = Answernoticia.app.io;
    Answernoticia.app.models.noticia.findById(ctx.result.noticiaId)
    .then(data=>{
      Answernoticia.app.models.notification.create({
        'tipo': 'comNews',
        'senderId': ctx.result.noticiaId,
        'date': Date.now(),
        'status': false,
        'usuarioId': data.usuarioId,
        'emmiterId': ctx.result.userId,
      });
      io.to(data.usuarioId).emit('request', {
        tipo: 'comNews',
        senderId: ctx.result.noticiaId,
        emmiterId: ctx.result.userId,
      });
    });
  });
};

