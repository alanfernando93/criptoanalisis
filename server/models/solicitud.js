'use strict';

module.exports = function(Solicitud) {
  Solicitud.Pendientes = function(id, cb) {
    Solicitud.find({where:
    {and: [{or: [{senderId: id}, {recieverId: id}]},
    {activo: true}]}})
      .then(data=>{
        var request = [];
        console.log(data);
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
  Solicitud.findSol = function(sender, reciever, cb) {
    Solicitud.find({
      where: {
        or:
        [{and: [
          {senderId: sender},
          {recieverId: reciever},
        ]}, {and: [
          {senderId: reciever},
          {recieverId: sender},
        ]}],
      },
    }, cb);
  };
  Solicitud.remoteMethod('findSol', {
    accepts: [{arg: 'sender', type: 'string', required: true},
    {arg: 'reciever', type: 'string', required: true}],
    http: {path: '/:sender/:reciever/findsol', verb: 'get'},
    returns: {arg: 'requests', type: 'array'},
  });
};
