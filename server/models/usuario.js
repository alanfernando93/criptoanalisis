'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = (Usuario) => {
  Usuario.validatesLengthOf('password', {
    min: 5, message:
      {min: 'el password debe de contener por lo menos 5 caracteres'},
  });
  Usuario.validatesLengthOf('username',
    {min: 3, message: {min: 'username debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('nombre',
    {min: 3, message: {min: 'nombre debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('apellido', +
    {min: 3, message: {min: 'apellido debe de tener como minimo 3 letras'}});
  Usuario.validatesUniquenessOf('email', {message: 'el email no es unico'});
  Usuario.validatesFormatOf('nombre', {with: /[a-zA-Z\-'\s]+/, message: 'el nombre debe estar compuesto por solo letras'});// solo nombres con letras ej juan
  Usuario.validatesFormatOf('apellido', {with: /[a-zA-Z\-'\s]+/, message: 'el apellido debe de estar compuesto de solo letras'});// apellido solo letras ej lopez
  Usuario.validatesFormatOf('username', {with: /^[a-zA-Z]\w*$/, message: 'el username debe estar compuesto por letras o por letras y numeros'});// username letras o letras seguido de numeros juan123
  Usuario.validatesFormatOf('password', {with: /[a-zA-Z0-9]/, message: 'password debe de estar compuesto por letras y numeros'}); // password compuesto por letras y numeros

  Usuario.upload = (req, res, cb) => {
    var Container = Usuario.app.models.Container;
    var id = req.params.id;
    Usuario.findById(id)
      .then(user => {
        Container.createContainer({name: user.username}, (err, c) => {
          Container.upload(req, res, {container: user.username}, cb);
        });
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
  Usuario.observe('loaded', (ctx, next) => {
    var homedir = (process.platform == 'win32') ? process.env.HOMEPATH : process.env.HOME;
    var container = Usuario.app.models.Container;
    container.getFiles(ctx.data.username, (err, data) => {
      if (data.length > 0) {
        data.map((f) => {
          base64Img.base64(homedir + /loop/ + ctx.data.username + '/' + f.getMetadata().name, (err, data) => {
            if (err)
              console.log('aun no tiene imagen');
            ctx.data.perfil = data;
            next();
          });
        });
      } else {
        next();
      }
    });
  });
  Usuario.beforeRemote('create', (ctx, user, next) => {
    if (ctx.req.body.realm == null) {
      ctx.req.body.realm = 'normal';
    }
    next();
  });
  Usuario.observe('after save', (ctx, next) => {
    var rol = Usuario.app.models.Role;
    var map = Usuario.app.models.RoleMapping;
    if (ctx.instance != undefined) {
      if (ctx.instance.realm == 'normal') {
        rol.find({where: {name: 'normal'}}, (err, rol) => {
          if (err)
            throw err;
          map.upsertWithWhere({principalId: ctx.instance.id}, {
            principalType: 'NORMAL',
            principalId: ctx.instance.id,
            roleId: rol[0].id,
          }, (err, rolemapping) => {
            if (err)
              console.log('error asignando roles');
            console.log(rolemapping);
          });
        });
      }
      if (ctx.instance.realm == 'premium') {
        rol.find({where: {name: 'premium'}}, (err, rol) => {
          if (err)
            throw err;
          map.upsertWithWhere({principalId: ctx.instance.id}, {
            principalType: 'Premium',
            principalId: ctx.instance.id,
            roleId: rol[0].id,
          }, (err, rolemapping) => {
            if (err)
              console.log('error asignando roles');
            console.log(rolemapping);
          });
        });
      }
    }
    next();
  });
  Usuario.verPagaSignal = (id, cb) => {
    var suscrito = Usuario.app.models.Suscripcion;
    var signalPaga = Usuario.app.models.Signal;
    var iterable = [];
    suscrito.find({where: {seguidorId: id}})
      .then(traders => {
        traders.forEach(trader => {
          var x = signalPaga.find({
            where: {usuarioId: trader.TraderId},
          });
          iterable.push(x);
        });
        Promise.all(iterable).then(values => {
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
  Usuario.updateInfo = (req, res, cb) => {
    Usuario.updateAll({
      id: req.params.id,
    }, req.body, cb);
  };
  Usuario.remoteMethod('updateInfo', {
    http: {path: '/:id/updateInfo', verb: 'put'},
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'user', type: 'object'},
  });

  Usuario.famaUser = (userId, punto, coinType) => {
    Usuario.findById(userId)
      .then(data => {
        Usuario.app.models.moneda.find({
          where: {
            name: coinType,
          },
        }, (err, moneda) => {
          if (data.fama == null) {
            // @dev valor : valor que tenga la moneda
            data.fama = [{
              id: moneda[0].id, valor: 2, symbol: moneda[0].symbol},
            ];
          } else {
            var element = data.fama.find(
              element => element.id === moneda[0].id);
            if (element === undefined) {
              data.fama.push({
                id: moneda[0].id, valor: 2, symbol: moneda[0].symbol});
            } else {
              // @dev valor que se autoincrementa para segun al valor de la moneda
              data.fama[data.fama.indexOf(element)].valor += punto * 2;
            }
          }
          Usuario.updateAll({id: userId}, {
            puntos: data.puntos + punto,
            fama: data.fama,
          }).then(data => {
          });
        });
      });
  };
};
