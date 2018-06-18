import loopback from 'loopback';
var app = module.exports = loopback();

app.start = () => {
  // start the web server
  var server = app.listen(function() {
    app.emit('started', server);
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
// devuelve el monto a cobrarse sin contar palabras de dos letras
function countWords(message) {
  var x = message.split(' ');
  var monto = 0;
  x.forEach(element => {
    if (element.length > 2) {
      monto += element.length * 0.3;
    }
  });
  return monto;
}
// modifica los puntos de un usuario de acuerdo a lo gastado
function modPuntos(id, monto) {
  app.models.usuario.findById(id)
  .then(data=>{
    app.models.usuario.updateAll({id: id}, {puntos: data.puntos + monto})
    .then(data=>{
      console.log('cambiado');
    });
  });
}
// realiza la transaccion de dinero en caso de ser el receptor
function transfiere(senderId, receptorId, type, costo) {
  // obtencion de una tranzaccion activa entre los usuarios
  app.models.transaccion.find({
    where: {and: [{or:
    [{and: [
      {senderId: senderId},
      {recieverId: receptorId},
    ]}, {and: [
      {senderId: receptorId},
      {recieverId: senderId},
    ]}],
    }, {activo: true}]},
  }).then(transfer=>{
    // obtencion del solicitante y aumento de creditos en caso verdadero
    if (transfer.length > 0) {
      modPuntos(senderId, -costo);
      if (senderId == transfer[0].senderId) {
      // flujo de aumento de creditos
        app.models.transaccion.updateAll({id: transfer[0].id},
           {monto: transfer[0].monto + costo});
      } else {
        console.log('el mensaje es gratuito');
      };
    } else {
      app.models.transaccion.create([{
        tipo: type,
        monto: costo,
        senderId: senderId,
        recieverId: receptorId,
        razon: 'chat',
        activo: true,
      }], (err, data)=>{
        console.log('transferido', data);
      });
    };
  });
}
// chat gratis usuario (tipo objeto)
function chatGratis(usuario, idchat, path) {
  app.models.solicitud.find({
    where: {and: [{or:
    [{and: [
        {senderId: usuario.senderId},
        {recieverId: usuario.receptorId},
    ]}, {and: [
        {senderId: usuario.receptorId},
        {recieverId: usuario.senderId},
    ]}],
    }, {activo: true}, {aceptacion: true}]},
  }).then(data=>{
    console.log(data);
    if (data.length > 0) {
      sendmessage(usuario, idchat, path);
    } else {
      path.to(idchat).emit('fail', {'message': 'la solicitud caduco o aun no esta aceptada'});
    }
  });
}
function sendmessage(message, idchat, path) {
  app.models.userMessage.create({
    'idProper': idchat,
    'message': message.message,
    'senderId': message.senderId,
    'recieverId': message.receptorId,
  }).then(data=>{
    path.to(idchat).emit('user says', message);
  });
};
export default app;
