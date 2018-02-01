'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = function(Usuario) {
  
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
    var signals = [];
    suscrito.find({where: {seguidorId: id}}, (err, traders)=> {
      traders.forEach(trader => {
        signalPaga.find({
          where: {usuarioId: trader.TraderId},
        }, (err, data)=> {
          signals.push(data);
        });
      });
    });
    setTimeout(() => {
      cb(null, signals);
    }, 1000);
  };
  Usuario.remoteMethod('verPagaSignal',
    {
      accepts: {arg: 'id', type: 'number', required: true},
      http: {path: '/:id/verPagaSignal', verb: 'get'},
      returns: {arg: 'signal', type: 'Object'},
    });
};
