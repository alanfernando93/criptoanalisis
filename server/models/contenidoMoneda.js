'use strict';

module.exports = function(Contenido) {
  Contenido.beforeRemote('create', function(ctx, content, next) {
    console.log(ctx.req.instance);
    next();
  });
};
