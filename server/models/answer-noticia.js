'use strict';

module.exports = function(Answernoticia) {
  Answernoticia.afterRemote('create', (ctx, user, next) => {
    var io = Answernoticia.app.io;
    var answer = 'news' + ctx.result.noticiaId;
    io.to(answer).emit('newAns', ctx.result);
    next();
  });
};
