'use strict';

module.exports = function(Transaccion) {
  Transaccion.closeChat = function(req, res, cb) {
    console.log(req.body.sender);
    Transaccion.find({
      where: {and: [{and:
          [{senderId: req.body.sender}, {recieverId: req.body.reciever}],
      }, {activo: true}]},
    }).then(transfer=>{
      console.log(transfer);
      if (transfer.length > 0) {
        Transaccion.modPuntos(req.body.reciever, transfer[0].monto);
        Transaccion.updateAll({id: transfer[0].id}, {activo: false});
      } else {
        console.log('no tiene ningun cobro pendiente');
      };
      cb();
    });
  };
  Transaccion.remoteMethod('closeChat', {
    http: {path: '/closeChat', verb: 'post'},
    accepts: [
         {arg: 'req', type: 'object', 'http': {source: 'req'}},
         {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: '', type: 'object'},
  });
  Transaccion.modPuntos = function(id, monto) {
    console.log(id);
    Transaccion.app.models.usuario.findById(id)
    .then(data=>{
      Transaccion.app.models.usuario.updateAll({id: id}, {puntos: data.puntos + monto})
      .then(data=>{
        console.log('cambiado');
      });
    });
  };
};
