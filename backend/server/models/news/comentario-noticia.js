import _variable from '../../variable';

export default (Comentarionoticia) => {
  Comentarionoticia.afterRemote('create', (ctx, user, next) => {
    var io = Comentarionoticia.app.io;
    var news =  'news' + ctx.result.noticiaId;
    ctx.result.res = [];
    io.to(news).emit('newCom', ctx.result);
    next();
  });
  Comentarionoticia.afterRemote('create', (ctx, user, next) => {
    Comentarionoticia.app.models.noticia.
    findById(ctx.result.noticiaId).then(data => {
      let userId = ctx.result.userId;
      let coinNews = data.tipo_moneda;
      Comentarionoticia.app.models.usuario.
      famaUser(userId, _variable.rpc, coinNews);
    });
    next();
  });
  Comentarionoticia.afterRemote('create', (ctx, user, next)=>{
    var io = Comentarionoticia.app.io;
    Comentarionoticia.app.models.noticia.findById(ctx.result.noticiaId)
    .then(data=>{
      Comentarionoticia.app.models.notification.create({
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
    next();
  });
};
