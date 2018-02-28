'use strict';

module.exports = function(Messageroom) {
  Messageroom.RoomMessage = function(room, cb) {
    Messageroom.find({where: {RoomId: room}}, cb);
  };
  Messageroom.remoteMethod('RoomMessage', {
    accepts: {arg: 'room', type: 'string', required: true},
    http: {path: '/RoomMessage/:room', verb: 'get'},
    returns: {arg: 'room', type: 'Object'},
  });
  Messageroom.afterRemote('RoomMessage', (ctx, messages, next)=>{
    var x = [];
    var message = ctx.result.room;
    message.forEach((element, index) => {
      var con = Messageroom.app.models.usuario.findById(element.usuarioId)
      .then(resp=>{
        ctx.result.room[index].username = resp.username;
      });
      x.push(con);
    });
    Promise.all(x).then(resp=>{
      next();
    });
  });
};
