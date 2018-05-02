'use strict';

module.exports = function(Answersenal) {
  Answersenal.afterRemote('create', (ctx, user, next) => {
    var io = Answersenal.app.io;
    var answer = 'signals' + ctx.result.signalId;
    io.to(answer).emit('signalAns', ctx.result);
    next();
  });
};
