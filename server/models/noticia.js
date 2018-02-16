'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = function(Noticia,ctx) {
  const HttpErrors = require('http-errors');

  ctx = (0, _assign2.default)({
    method: 'dislike',
    endpoint: '/:id/dislike',
    dislikes: 'dislikes',
    userModel: 'usuario',
    description: ' dislikes ' + Noticia.definition.name + ' instance for the given userId'
  }, ctx);
  
  Noticia.defineProperty(ctx.dislikes, {type: Object, default: {total: 0, users: []}});


//dislike metodo remoto
Noticia[ctx.method] = function(id, userId, finish) {
  // Verify that current model instance and user instances exists
  return new _promise2.default(function(resolve, reject) {
    _async2.default.parallel({
      modelInstance: function modelInstance(next) {
        return Noticia.findById(id, next);
      },
      userInstance: function userInstance(next) {
        return Noticia.dataSource.models[ctx.userModel].findById(userId, next);
      }
    }, function(err, results) {
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
      results.modelInstance.save(function(saveerr, result) {
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
//hook para quitar dislike si le damos like
Noticia.afterRemote('like', function(ctx, noticia, next) {

  var idn=ctx.req.params.id;
  var id_user=ctx.req.query.userId;
  var index = ctx.result.dislikes.users.indexOf(id_user);
         if(index > -1)
          {
           var d= ctx.result.dislikes.users.splice(index, 1);
            var d2=ctx.result.dislikes.total=ctx.result.dislikes.total-1;
            var d=ctx.result.dislikes;
            ctx.method.ctor.dislike(idn,id_user);
           
          }    
    next();
  });
//hook para quitar like si le damos dislike
  Noticia.afterRemote('dislike', function(ctx, noticia, next) {

    var idn=ctx.req.params.id;
    var id_user=ctx.req.query.userId;
    
    var index = ctx.result.likes.users.indexOf(id_user);
       
         if(index > -1)
            {
              ctx.result.likes.users.splice(index, 1);
             ctx.result.likes.total=ctx.result.likes.total-1;
             ctx.method.ctor.like(idn,id_user);
              }
      next();
    });
  Noticia.Listar_noticias = function(cb) {
    Noticia.find({
      where: {
        titulo: 'bitcoin',
      },
    }, cb);
  };

  Noticia.remoteMethod('Listar_noticias', {
    returns: {arg: 'Noticias', type: 'array'},
    http: {path: '/listar_noticias', verb: 'get'},
  });
  Noticia.afterRemote('find', function(ctx, noticia, next) {
    ctx.result.forEach(element => {
      element.fecha_create=Date.now();
      console.log(element.fecha_create);
    });
    next();
  });
// validacion campos de noticia  
  Noticia.observe('before save', function(context, next) {
    var tit = context.instance.titulo;
    var cont = context.instance.contenido;
    if (tit.length > 25)
{
      return next(new HttpErrors.BadRequest('Titulo debe tener como maximo 25 caracteres'));
}
    if (tit === ' ')
{
      return next(new HttpErrors.BadRequest('Titulo es un campo requerido'));
}
    if (cont === ' ')
{
      return next(new HttpErrors.BadRequest('Contenido es un campo requerido'));
}
    if (cont.length > 5000)
{
      return next(new HttpErrors.BadRequest('El contenido debe tener como maximo 5000 caracteres'));
}
    next();
  });
};
