'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = function (Noticia, ctx, ctx2) {
  const HttpErrors = require('http-errors');
  //ctx para dislike
  ctx = (0, _assign2.default)({
    method: 'dislike',
    endpoint: '/:id/dislike',
    dislikes: 'dislikes',
    userModel: 'usuario',
    description: ' dislikes ' + Noticia.definition.name + ' instance for the given userId'
  }, ctx);
  //ctx2 para comentarios
  ctx2 = (0, _assign2.default)({
    method: 'comment',
    endpoint: '/:id/comment',
    comments: 'comments',
    userModel: 'usuario',
    description: ' comments ' + Noticia.definition.name + ' instance for the given userId'
  }, ctx2);

  //agregando propiedad dislike a noticia
  Noticia.defineProperty(ctx.dislikes, { type: Object, default: { total: 0, users: [] } });
  //agregando propiedad comentario a noticia
  Noticia.defineProperty(ctx2.comments, { type: Object, default: { total: 0, users: [], users_comments: [] } });

  //dislike metodo remoto
  Noticia[ctx.method] = function (id, userId, finish) {
    // Verify that current model instance and user instances exists
    return new _promise2.default(function (resolve, reject) {
      _async2.default.parallel({
        modelInstance: function modelInstance(next) {
          return Noticia.findById(id, next);
        },
        userInstance: function userInstance(next) {
          return Noticia.dataSource.models[ctx.userModel].findById(userId, next);
        }
      }, function (err, results) {
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
        results.modelInstance.save(function (saveerr, result) {
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
    accepts: [{ arg: 'id', type: 'string', required: true }, { arg: 'userId', type: 'string', required: true }],
    returns: { root: true, type: 'object' },
    http: { path: ctx.endpoint, verb: 'get' },
    description: ctx.description,
  });




  //metodo remoto para comentarios
  Noticia[ctx2.method] = function (id, userId, com, finish) {
    // Verify that current model instance and user instances exists
    return new _promise2.default(function (resolve, reject) {
      _async2.default.parallel({
        modelInstance: function modelInstance(next) {
          return Noticia.findById(id, next);
        },
        userInstance: function userInstance(next) {
          return Noticia.dataSource.models[ctx2.userModel].findById(userId, next);
        }
      }, function (err, results) {
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
          err = new Error('No Model instance of ' + ctx2.userModel + ' with id ' + userId + ' was found');
          if (typeof finish === 'function') finish(err);
          return reject(err);
        }
        //  we add a new commment

        results.modelInstance[ctx2.comments].users.push(userId);
        results.modelInstance[ctx2.comments].users_comments.push(com);

        results.modelInstance[ctx2.comments].total = results.modelInstance[ctx2.comments].users.length;
        results.modelInstance.save(function (saveerr, result) {
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
  Noticia.remoteMethod(ctx2.method, {
    accepts: [{ arg: 'id', type: 'string', required: true }, { arg: 'userId', type: 'string', required: true },
    { arg: 'com', type: 'string', required: true }],
    returns: { root: true, type: 'object' },
    http: { path: ctx2.endpoint, verb: 'get' },
    description: ctx2.description,
  });


  //hook para quitar dislike si le damos like
  Noticia.afterRemote('like', function (ctx, noticia, next) {

    var idn = ctx.req.params.id;
    var id_user = ctx.req.query.userId;
    var index = ctx.result.dislikes.users.indexOf(id_user);
    if (index > -1) {
      var d = ctx.result.dislikes.users.splice(index, 1);
      var d2 = ctx.result.dislikes.total = ctx.result.dislikes.total - 1;
      var d = ctx.result.dislikes;
      ctx.method.ctor.dislike(idn, id_user);

    }
    next();
  });
  //hook para quitar like si le damos dislike
  Noticia.afterRemote('dislike', function (ctx, noticia, next) {

    var idn = ctx.req.params.id;
    var id_user = ctx.req.query.userId;

    var index = ctx.result.likes.users.indexOf(id_user);

    if (index > -1) {
      ctx.result.likes.users.splice(index, 1);
      ctx.result.likes.total = ctx.result.likes.total - 1;
      ctx.method.ctor.like(idn, id_user);
    }
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
};
