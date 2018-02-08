'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = function(Usuario) {
  Usuario.validatesLengthOf('password', {min: 5, message:
    {min: 'el password debe de contener por lo menos 5 caracteres'}});
  Usuario.validatesLengthOf('username',
    {min: 3, message: {min: 'username debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('nombre',
    {min: 3, message: {min: 'nombre debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('apellido', +
    {min: 3, message: {min: 'apellido debe de tener como minimo 3 letras'}});
  Usuario.validatesUniquenessOf('email', {message: 'el email no es unico'});
  Usuario.validatesFormatOf('nombre', {with: /[a-zA-Z\-'\s]+/, message: "el nombre debe estar compuesto por solo letras"});// solo nombres con letras ej juan
  Usuario.validatesFormatOf('apellido', {with: /[a-zA-Z\-'\s]+/, message: "el apellido debe de estar compuesto de solo letras"});// apellido solo letras ej lopez
  Usuario.validatesFormatOf('username', {with: /^[a-zA-Z]\w*$/, message: "el username debe estar compuesto por letras o por letras y numeros"});// username letras o letras seguido de numeros juan123
  Usuario.validatesFormatOf('password', {with: /[a-zA-Z0-9]/, message: "password debe de estar compuesto por letras y numeros"}); // password compuesto por letras y numeros
  
  Usuario.upload = function(req, res, cb) {
    var Container = Usuario.app.models.Container;
    var user = req.params.id;
    Container.createContainer({name: user}, function(err, c) {
      Container.upload(req, res, {container: user}, cb);
    });
  };
  Usuario.remoteMethod(
       'upload',
    {
      http: {path: '/:id/upload', verb: 'post'},
      accepts: [
           {arg: 'req', type: 'object', 'http': {source: 'req'}},
           {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: {arg: 'status', type: 'string'},
    }
  );
  Usuario.afterRemote('findById', function(ctx, usuario, next) {
    var homedir = (process.platform == 'win32') ? process.env.HOMEPATH : process.env.HOME;
    base64Img.base64(homedir + /loop/ + ctx.result.id + '/perfil.png', (err, data)=>{
      if (err)
        console.log('aun no tiene imagen');
      ctx.result.perfil = data;
      next();
    });
  });
  Usuario.beforeRemote('create', function(ctx, user, next) {
    ctx.req.body.fecha_registro = Date.now();
    if (ctx.req.body.realm == null) {
      ctx.req.body.realm = 'normal';
    }
    next();
  });
  Usuario.observe('after save', function(ctx, next) {
    var rol = Usuario.app.models.Role;
    var map = Usuario.app.models.RoleMapping;
    if (ctx.instance.realm == 'normal') {
      rol.find({where: {name: 'normal'}}, function(err, rol) {
        if (err)
          throw err;
        map.upsertWithWhere({principalId: ctx.instance.id}, {
          principalType: 'NORMAL',
          principalId: ctx.instance.id,
          roleId: rol[0].id,
        }, function(err, rolemapping) {
          if (err)
            console.log('error asignando roles');
          console.log(rolemapping);
        });
      });
    }
    if (ctx.instance.realm == 'premium') {
      rol.find({where: {name: 'premium'}}, function(err, rol) {
        if (err)
          throw err;
        map.upsertWithWhere({principalId: ctx.instance.id}, {
          principalType: 'Premium',
          principalId: ctx.instance.id,
          roleId: rol[0].id,
        }, function(err, rolemapping) {
          if (err)
            console.log('error asignando roles');
          console.log(rolemapping);
        });
      });
    }
    next();
  });
  Usuario.verPagaSignal = function(id, cb) {
    var suscrito = Usuario.app.models.Suscripcion;
    var signalPaga = Usuario.app.models.Signal;
    var iterable = [];
    suscrito.find({where: {seguidorId: id}})
    .then(traders=> {
      traders.forEach(trader => {
        var x = signalPaga.find({
          where: {usuarioId: trader.TraderId},
        });
        iterable.push(x);
      });
      Promise.all(iterable).then(values=>{
        cb(null, values);
      });
    });
  };
  Usuario.remoteMethod('verPagaSignal',
    {
      accepts: {arg: 'id', type: 'number', required: true},
      http: {path: '/:id/verPagaSignal', verb: 'get'},
      returns: {arg: 'signal', type: 'Object'},
    });
};
