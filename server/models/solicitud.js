'use strict';

module.exports = function(Solicitud) {
  Solicitud.Pendientes = function(id, cb) {
    Solicitud.find({where:
    {and: [{or: [{senderId: id}, {recieverId: id}]},
    {activo: true}, {aceptacion: false}]}})
      .then(data=>{
        var request = [];
        data.forEach((element, index) => {
          var usuario = (element.senderId == id) ? element.recieverId : element.senderId;
          var x = Solicitud.app.models.Usuario.findById(usuario, {
            fields: {id: true, username: true, puntos: true}})
            .then(user=>{
              data[index].user = user;
            });
          request.push(x);
        });
        Promise.all(request)
        .then(elem=>{
          cb(null, data);
        });
      });
  };
  Solicitud.remoteMethod('Pendientes', {
    accepts: {arg: 'id', type: 'string', required: true},
    http: {path: '/:id/Pendientes', verb: 'get'},
    returns: {arg: 'requests', type: 'array'},
  });
  // aceptar solicitud de chat
  Solicitud.AcceptReq = function(req, res, cb) {
    Solicitud.updateAll({
      id: req.params.id,
    }, {
      aceptacion: true,
    }, cb);
  };
  Solicitud.remoteMethod('AcceptReq', {
    http: {path: '/:id/AcceptReq', verb: 'post'},
    accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'answer', type: 'object'},
  });
  // crear solicitud de un usuario
  Solicitud.CrearReq = function(req, res, cb) {
    Solicitud.findOrCreate({
      where: {
        or:
        [{and: [
          {senderId: req.body.senderId},
          {recieverId: req.body.receptorId},
        ]}, {and: [
          {senderId: req.body.receptorId},
          {recieverId: req.body.senderId},
        ]}],
      },
    }, req.body, cb);
  };
  Solicitud.remoteMethod('CrearReq', {
    http: {path: '/CrearReq', verb: 'post'},
    accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'request', type: 'object'},
  });
  // buscar una solicitud aceptada y activa
  Solicitud.findSol = function(sender, reciever, cb) {
    Solicitud.findOne({
      where: {
        and: [
          {or:
          [{and: [
              {senderId: sender},
              {recieverId: reciever},
          ]}, {and: [
              {senderId: reciever},
              {recieverId: sender},
          ]}]},
          {aceptacion: true},
          {activo: true},
        ],
      },
    }, cb);
  };
  Solicitud.remoteMethod('findSol', {
    accepts: [{arg: 'sender', type: 'string', required: true},
    {arg: 'reciever', type: 'string', required: true}],
    http: {path: '/:sender/:reciever/findsol', verb: 'get'},
    returns: {arg: 'requests', type: 'array'},
  });
  Solicitud.afterRemote('CrearReq', (ctx, request, next)=> {
    var io = Solicitud.app.io;
    Solicitud.app.models.usuario.findById(ctx.result.request.senderId, {
      fields: {id: true, username: true, puntos: true},
    }, (err, data)=>{
      io.to(ctx.result.request.recieverId).emit('request', {
        'tipo': 'request',
        'sender': data.username,
        'senderId': data.id,
      });
      // envia la notificiacion de la solicitud al usuario
      Solicitud.app.models.notification.create({
        'tipo': 'request',
        'senderId': data.id,
        'date': Date.now(),
        'status': false,
        'usuarioId': ctx.result.request.recieverId,
      });
    });
  });
  // finalizar chat
  Solicitud.Finish = function(req, res, cb) {
    Solicitud.updateAll({
      or:
      [{and: [
          {senderId: req.body.sender},
          {recieverId: req.body.reciever},
      ]}, {and: [
          {senderId: req.body.reciever},
          {recieverId: req.body.sender},
      ]}],
    }, {
      activo: false,
    }, cb);
  };
  Solicitud.remoteMethod('Finish', {
    http: {path: '/Finish', verb: 'post'},
    accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'finish', type: 'object'},
  });
};
