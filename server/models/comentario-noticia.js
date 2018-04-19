'use strict';

var _variable = require('../variable');

module.exports = (Comentarionoticia) => {
  Comentarionoticia.afterRemote('create', (ctx, user, next) => {
    Comentarionoticia.app.models.noticia.findById(ctx.result.noticiaId).then(data => {
      let coinNews = data.tipo_moneda;
      let userId = ctx.result.userId;
      Comentarionoticia.app.models.usuario.famaUser(userId, _variable.rpc, coinNews);
    });
    next();
  });
};
