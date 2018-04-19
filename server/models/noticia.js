'use strict';

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

module.exports = (Noticia, ctx, ctx2) => {
  Noticia.upload = (req, res, cb) => {
    var Container = Noticia.app.models.Container;
    var id = req.params.id;
    Container.createContainer({name: 'news' + id}, (err, c) => {
      Container.upload(req, res, {container: 'news' + id}, cb);
    });
  };

  Noticia.remoteMethod(
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

  const HttpErrors = require('http-errors');
  //ctx para dislike
  ctx = (0, _assign2.default)({
    method: 'dislike',
    endpoint: '/:id/dislike',
    dislikes: 'dislikes',
    userModel: 'usuario',
    description: ' dislikes ' + Noticia.definition.name + ' instance for the given userId'
  }, ctx);

  //agregando propiedad dislike a noticia
  Noticia.defineProperty(ctx.dislikes, {type: Object, default: {total: 0, users: []}});

  //dislike metodo remoto
  Noticia[ctx.method] = (id, userId, finish) => {
    // Verify that current model instance and user instances exists
    return new _promise2.default((resolve, reject) => {
      _async2.default.parallel({
        modelInstance: function modelInstance(next) {
          return Noticia.findById(id, next);
        },
        userInstance: function userInstance(next) {
          return Noticia.dataSource.models[ctx.userModel].findById(userId, next);
        },
      }, (err, results) => {
        // Handle Errors
        if (err) {
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        if (!results.modelInstance) {
          err = new Error('No Model instance of ' + Noticia.definition.name + ' with id ' + id + ' was found');
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
  Noticia.remoteMethod(ctx.method, {
    accepts: [{arg: 'id', type: 'string', required: true}, {arg: 'userId', type: 'string', required: true}],
    returns: {root: true, type: 'object'},
    http: {path: ctx.endpoint, verb: 'get'},
    description: ctx.description,
  });

  //hook para quitar dislike si le damos like
  Noticia.afterRemote('like', (ctx, noticia, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    var coinNews = ctx.req.query.tipo_moneda;
    var index = ctx.result.dislikes.users.indexOf(idUser);
    if (index > -1) {
      var d = ctx.result.dislikes.users.splice(index, 1);
      var d2 = ctx.result.dislikes.total = ctx.result.dislikes.total - 1;
      var d = ctx.result.dislikes;
      ctx.method.ctor.dislike(idn, idUser);
    }
    Noticia.app.models.usuario.famaUser(idUser, _variable.rpl, coinNews);
    next();
  });
  //hook para quitar like si le damos dislike
  Noticia.afterRemote('dislike', (ctx, noticia, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    var coinNews = ctx.req.query.tipo_moneda;
    var index = ctx.result.likes.users.indexOf(idUser);
    if (index > -1) {
      ctx.result.likes.users.splice(index, 1);
      ctx.result.likes.total = ctx.result.likes.total - 1;
      ctx.method.ctor.like(idn, idUser);
    }
    Noticia.app.models.usuario.famaUser(idUser, _variable.rpd, coinNews);
    next();
  });

  // validacion campos de noticia  
  Noticia.observe('before save', (context, next) => {
    var tit = context.instance.titulo;
    var cont = context.instance.contenido;
    if (tit.length > 90) {
      return next(new HttpErrors.BadRequest('Titulo debe tener como maximo 90 caracteres caracteres'));
    }
    if (tit === ' ') {
      return next(new HttpErrors.BadRequest('Titulo es un campo requerido'));
    }
    if (cont === ' ') {
      return next(new HttpErrors.BadRequest('Contenido es un campo requerido'));
    }
    if (cont.length > 5000) {
      return next(new HttpErrors.BadRequest('El contenido debe tener como maximo 5000 caracteres'));
    }
    next();
  });

  Noticia.afterRemote('create', (ctx, user, next) => {
    let userId = ctx.result.usuarioId;
    let coinNews = ctx.result.tipo_moneda;
    Noticia.app.models.usuario.famaUser(userId, _variable.rpn, coinNews);
    next();
  });
};
