'use strict';
// tipo: true comprar false: vender;
var io = require('socket.io-client');
var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _variable = require('../variable');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = (Signal, ctx, ctx2) => {
  const HttpErrors = require('http-errors');
  // ctx para dislike
  ctx = (0, _assign2.default)({
    method: 'dislike',
    endpoint: '/:id/dislike',
    dislikes: 'dislikes',
    userModel: 'usuario',
    description: ' dislikes ' + Signal.definition.name + ' instance for the given userId'
  }, ctx);

  // agregando propiedad dislike a noticia
  Signal.defineProperty(ctx.dislikes, {type: Object, default: {total: 0, users: []}});

  // dislike metodo remoto
  Signal[ctx.method] = (id, userId, finish) => {
    // Verify that current model instance and user instances exists
    return new _promise2.default((resolve, reject) => {
      _async2.default.parallel({
        modelInstance: function modelInstance(next) {
          return Signal.findById(id, next);
        },
        userInstance: function userInstance(next) {
          return Signal.dataSource.models[ctx.userModel].findById(userId, next);
        },
      }, (err, results) => {
        // Handle Errors
        if (err) {
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        if (!results.modelInstance) {
          err = new Error('No Model instance of ' + Signal.definition.name + ' with id ' + id + ' was found');
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        if (!results.userInstance) {
          err = new Error('No Model instance of ' + ctx.userModel + ' with id ' + userId + ' was found');
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        // Get index of user like in array, if any
        var index = results.modelInstance[ctx.dislikes].users.indexOf(userId);

        // If user didnt liked before this instance we add a new like
        if (index < 0) {
          results.modelInstance[ctx.dislikes].users.push(userId);
          // Else we remove the like
        } else {
          results.modelInstance[ctx.dislikes].users.splice(index, 1);
        }
        results.modelInstance[ctx.dislikes].total = results.modelInstance[ctx.dislikes].users.length;
        results.modelInstance.save((saveerr, result) => {
          if (saveerr) reject(saveerr);
          if (typeof finish === 'function') {
            finish(err, result);
          } else {
            resolve(result);
          }
        });
      });
    });
  };

  // Endpoint settings
  Signal.remoteMethod(ctx.method, {
    accepts: [{arg: 'id', type: 'string', required: true}, {arg: 'userId', type: 'string', required: true}],
    returns: {root: true, type: 'object'},
    http: {path: ctx.endpoint, verb: 'get'},
    description: ctx.description,
  });

  // hook para quitar dislike si le damos like
  Signal.afterRemote('like', (ctx, signal, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    var coinSignal = ctx.result.tipo_moneda;
    var index = ctx.result.dislikes.users.indexOf(idUser);
    if (index > -1) {
      var d = ctx.result.dislikes.users.splice(index, 1);
      var d2 = ctx.result.dislikes.total = ctx.result.dislikes.total - 1;
      var d = ctx.result.dislikes;
      ctx.method.ctor.dislike(idn, idUser);
    }
    var index2 = ctx.result.likes.users.indexOf(idUser);
    if (index2 > -1) {
      likenotif(idn, idUser, ctx.result.usuarioId);
    }
    Signal.app.models.usuario.famaUser(idUser, _variable.rpl, coinSignal);
    next();
  });

  // hook para quitar like si le damos dislike

  Signal.afterRemote('dislike', (ctx, signal, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    // Signal.app.models.position.afterRemote('create', (ctx, position, next) => {
    //   var coinSignal = ctx.result.moneda1;
    //   console.log(coinSignal);
    // });
    var coinNews = ctx.result.tipo_moneda;
    var index = ctx.result.likes.users.indexOf(idUser);
    if (index > -1) {
      ctx.result.likes.users.splice(index, 1);
      ctx.result.likes.total = ctx.result.likes.total - 1;
      ctx.method.ctor.like(idn, idUser);
    }
    signal.app.models.usuario.famaUser(idUser, _variable.rpd, coinNews);
    next();
  });

  Signal.observe('loaded', (ctx, next) => {
    var comment = Signal.app.models.comentario_senal;
    comment.find({
      where: {SignalId: ctx.data.id},
    }, (err, data) => {
      ctx.data.comments = data;
      next();
    });
  });

  Signal.verGratis = (cb) => {
    Signal.find({
      where: {
        visible: 'gratuito',
      },
      include: ['puntos']
    }, cb);
  };

  Signal.remoteMethod('verGratis', {
    returns: {arg: 'señales', type: 'array'},
    http: {path: '/ver_Gratis', verb: 'get'},
  });

  Signal.upload = function(req, res, cb) {
    var Container = Signal.app.models.Container;
    var id = req.params.id;
    Container.createContainer({name: 'signal' + id}, function(err, c) {
      Container.upload(req, res, {container: 'signal' + id}, cb);
    });
  };

  Signal.remoteMethod(
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
  // hook que envia notificacion cuando postea señal
  Signal.afterRemote('create', (ctx, signal, next)=>{
    var io = Signal.app.io;
    var con = 'sus' + ctx.result.usuarioId;
    Signal.app.models.followUser.find({
      where: {
        posterId: ctx.result.usuarioId,
      },
    }).then(data=>{
      data.forEach(element => {
        Signal.app.models.notification.create({
          'tipo': 'signal',
          'senderId': ctx.result.id,
          'date': Date.now(),
          'status': false,
          'usuarioId': element.followerId,
        });
      });
    });
    io.to(con).emit('request', {
      tipo: 'signal',
      senderId: ctx.result.id,
    });
    next();
  });
  Signal.signalnot = (id, cb) => {
    Signal.findById(id, {
      fields: ['id', 'tipo', 'estado', 'usuarioId', 'usuario'],
      include: {
        relation: 'usuario',
        scope: {
          fields: ['id', 'username', 'perfil'],
        },
      },
    }, cb);
  };

  Signal.remoteMethod('signalnot', {
    returns: {arg: 'signal', type: 'array'},
    accepts: {arg: 'id', type: 'string', required: true},
    http: {path: '/:id/signalnot', verb: 'get'},
  });
  Signal.afterRemote('create', (ctx, user, next) => {
    let userId = ctx.result.usuarioId;
    let coinSignal = ctx.result.tipo_moneda;
    Signal.app.models.usuario.famaUser(userId, _variable.rps, coinSignal);
    next();
  });
  Signal.afterRemote('create', (ctx, signal, next) => {
    var io = Signal.app.io;
    io.emit('insertSig', ctx.result);
    next();
  });
  // funcion para conectar a socket por las diferentes positions
  Signal.afterRemote('create', (ctx, signal, next)=>{
    var socket = io.connect('wss://streamer.cryptocompare.com', {reconnect: true});
    var sw = false;
    socket.on('connect', function(socket) {
      console.log('Connected!');
    });
    socket.emit('SubAdd', {subs: [`0~Poloniex~${ctx.result.moneda1}~${ctx.result.moneda2}`]});
    Signal.app.models.position.find({
      where: {signalId: ctx.result.id},
    }).then(data=> {
      var pos = data;
      var men, may;
      socket.on('m', function(message) {
        var x = message.split('~');
        if (x.length > 2) {
          men = parseInt(x[8]) - (parseInt(x[8]) * 0.003);
          may = parseInt(x[8]) + (parseInt(x[8]) * 0.003);
          console.log(`${men} ${x[8]} ${may}`);
          pos.forEach((element, index)=>{
            if (men <= element.valor && element.valor <= may && !element.reached) {
              pos[index].reached = true;
              Signal.app.models.position.updateAll({id: element.id}, {reached: true});
              switch (element.puntoId) {
                case 1 : {
                  Signal.updateAll({id: ctx.result.id}, {estado: 'activo'});
                  getstatus(pos, 1);
                  break;
                }
                case 2: {
                  Signal.app.models.position.findEnterPoints(element);
                  if (getstatus(pos, 2)) {
                    socket.emit('SubRemove', {subs: [`0~Poloniex~${ctx.result.moneda1}~${ctx.result.moneda2}`]});
                  }
                  Signal.updateAll({id: ctx.result.id}, {estado: 'exito'});
                  break;
                }
                case 3: {
                  Signal.updateAll({id: ctx.result.id}, {estado: 'fracaso'});
                  modprec(ctx.result.id, false, element.valor);
                  socket.emit('SubRemove', {subs: [`0~Poloniex~${ctx.result.moneda1}~${ctx.result.moneda2}`]});
                  break;
                }
              }
            }
          });
        }
      });
    });
    next();
  });
  // argumentos array de pocisiones y tipo entrada o salida
  function getstatus(positions, tipo) {
    var pos = positions.filter(element=>{
      if (element.puntoId == tipo && element.reached)
        return true;
      else
        return false;
    });
    console.log(pos.length);
    if (pos.length == 1 || pos.length == 2) {
      getprom(pos, tipo);
      return false;
    } else if (pos.length == 3) {
      getprom(pos);
      return true;
    }
    return false;
  };
  // funcion para modificar promedio de puntos de entrada
  function getprom(pos, tipo) {
    var x = 0;
    pos.forEach(element=>{
      x = x + element.valor;
    });
    if (pos.length > 0)
      x = x / pos.length;
    if (tipo == 1)
      Signal.updateAll({id: pos[0].signalId}, {PEP: x});
    else if (tipo == 2)
      Signal.updateAll({id: pos[0].signalId}, {PSP: x});
  }
  function modprec(signalId, type, value) {
    Signal.findById(signalId)
    .then(data=>{
      var x = 0;
      // type sera true en caso de exito
      if (type && data.PEP > 0) {
        x = ((data.PSP - data.PEP) / data.PEP) * 100;
      } else if (data.PSP > 0) {
        x = ((value - data.PEP) / data.PEP) * 100;
      }
      console.log(x, value);
      Signal.updateAll({id: signalId}, {precision: x});
      Signal.app.models.usuario.precisionmod(data.usuarioId);
    });
  };
  // notificaciones de likes para usuarios
  function likenotif(signalId, userId, owner) {
    var io = Signal.app.io;
    Signal.app.models.notification.create({
      'tipo': 'likeSig',
      'senderId': signalId,
      'date': Date.now(),
      'status': false,
      'usuarioId': owner,
      'emmiterId': userId,
    });
    io.to(owner).emit('request', {
      tipo: 'likeSig',
      senderId: signalId,
      emmiterId: userId,
    });
  }
};

