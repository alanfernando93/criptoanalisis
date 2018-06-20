export default(Transaccion) => {
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
  Transaccion.modPuntos = function(userId, monto) {
    Transaccion.app.models.usuario.findById(userId)
    .then(data=>{
      Transaccion.app.models.usuario.updateAll({id: userId}, {puntos: data.puntos + monto})
      .catch(err=>{
        console.log('error durante la transaccion');
      });
    });
  };
  Transaccion.makeTransaction = (sellerId, buyerId, monto, razon)=> {
    let usuario = Transaccion.app.models.usuario;
    return usuario.haveEnoughFounds(buyerId, monto)
    .then(result=>{
      if (result) {
        Transaccion.modPuntos(buyerId, -monto);
        Transaccion.modPuntos(sellerId, monto);
        Transaccion.create({
          'senderId': buyerId,
          'recieverId': sellerId,
          'monto': monto,
          'razon': razon,
          'activo': false,
        });
        return true;
      } else {
        return false;
      }
    });
  };
};
