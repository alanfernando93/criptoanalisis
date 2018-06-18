export default (Followuser) => {
  Followuser.follow = function(req, res, cb) {
    Followuser.findOne({
      where: {
        and: [
            {followerId: req.body.followerId},
            {posterId: req.body.posterId},
        ],
      },
    }). then(data=>{
      var res = '';
      if (data != null) {
        Followuser.destroyById(data.id, (err, data)=>{
          cb(null, data);
        });
      } else {
        Followuser.create(req.body, (err, data)=>{
          cb(null, data);
        });
      };
    });
  };
  Followuser.remoteMethod('follow', {
    http: {path: '/follow', verb: 'post'},
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'follow', type: 'object'},
  });
  Followuser.afterRemote('follow', (ctx, model, next)=>{
    var io = Followuser.app.io;
    if (ctx.result.follow.count == undefined) {
      Followuser.app.models.notification.create({
        'tipo': 'follow',
        'senderId': ctx.result.follow.followerId,
        'date': Date.now(),
        'status': false,
        'usuarioId': ctx.result.follow.posterId,
      });
      io.to(ctx.result.follow.posterId).emit('request', {
        tipo: 'follow',
        senderId: ctx.result.follow.followerId,
      });
    }
    next();
  });
};
