'use strict';
var _variable = require('../variable');

module.exports = (Comentarionoticia) => {
  Comentarionoticia.afterRemote('create', (ctx, user, next) => {
    Comentarionoticia.app.models.noticia.findById(ctx.result.noticiaId).then(data => {
      let userId = ctx.result.usuarioId;
      let coinNews = data.tipo_moneda;
      Comentarionoticia.app.models.usuario.famaUser(userId, _variable.rpc, coinNews);
    });
    next();
  });
};
