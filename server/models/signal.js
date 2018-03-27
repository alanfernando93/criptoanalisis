'use strict';

var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
var _assign = require('babel-runtime/core-js/object/assign');
var _assign2 = _interopRequireDefault(_assign);
var _async = require('async');
var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = function (Signal, ctx, ctx2) {
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
  Signal.defineProperty(ctx.dislikes, { type: Object, default: { total: 0, users: [] } });

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
    accepts: [{ arg: 'id', type: 'string', required: true }, { arg: 'userId', type: 'string', required: true }],
    returns: { root: true, type: 'object' },
    http: { path: ctx.endpoint, verb: 'get' },
    description: ctx.description,
  });

  // hook para quitar dislike si le damos like
  Signal.afterRemote('like', (ctx, signal, next) => {

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

  // hook para quitar like si le damos dislike

  Signal.afterRemote('dislike', (ctx, signal, next) => {

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
      include: ['positions', 'comments'],
    }, cb);
  };
  Signal.remoteMethod('verGratis', {
    returns: { arg: 'señales', type: 'array' },
    http: { path: '/ver_Gratis', verb: 'get' },
  });
};

