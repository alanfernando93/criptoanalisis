'use strict';

module.exports = function(Signal) {
  Signal.observe('loaded', function(ctx, next) {
    var comment = Signal.app.models.commentSignal;
    comment.find({
      where: {SignalId: ctx.data.id},
    }, (err, data)=>{
      ctx.data.comments = data;
      next();
    });
  });
  Signal.observe('loaded', function(ctx, next) {
    var likes = Signal.app.models.LikeSignal;
    likes.count({
      where: {SignalId: ctx.data.id},
    }, (err, data)=>{
      ctx.data.likes = data;
      next();
    });
  });

  Signal.verGratis = function(cb) {
    Signal.find({
      where: {
        visible: 'gratuito',
      },
      include: ['positions', 'comments', 'likes'],
    }, cb);
  };
  Signal.remoteMethod('verGratis', {
    returns: {arg: 'señales', type: 'array'},
    http: {path: '/ver_Gratis', verb: 'get'},
  });
};
