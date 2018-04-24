'use strict';

module.exports = function(Usermessage) {
  Usermessage.PersonalMessage = function(pair, cb) {
    Usermessage.find({where: {idProper: pair}}, cb);
  };
  Usermessage.remoteMethod('PersonalMessage', {
    accepts: {arg: 'pair', type: 'string', required: true},
    http: {path: '/PersonalMessage/:pair', verb: 'get'},
    returns: {arg: 'messages', type: 'Object'},
  });
  Usermessage.afterRemote('PersonalMessage', function(ctx, messages, next) {
    var x = [];
    var message = ctx.result.messages;
    message.forEach((element, index) => {
      var con = Usermessage.app.models.usuario.findById(element.senderId)
      .then(resp=>{
        ctx.result.messages[index].username = resp.username;
      });
      x.push(con);
    });
    Promise.all(x).then(resp=>{
      next();
    });
  });
};
