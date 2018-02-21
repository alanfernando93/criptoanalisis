'use strict';

module.exports = function(Contenido) {
  Contenido.beforeRemote('create', function(ctx, content, next) {
    ctx.req.body.fechaCreacion = Date.now();
    next();
  });
};
