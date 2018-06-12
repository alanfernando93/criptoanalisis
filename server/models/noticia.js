'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _variable = require('../variable');

var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: _variable.token });
dbx.setClientId(_variable.key);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Noticia, ctx, ctx2) => {
  Noticia.upload = (req, res, cb) => {
    var Container = Noticia.app.models.Container;
    var id = req.params.id;
    Container.createContainer({ name: 'news' + id }, (err, c) => {
      Container.upload(req, res, { container: 'news' + id }, cb);
    });
  };

  Noticia.remoteMethod(
    'upload',
    {
      http: { path: '/:id/upload', verb: 'post' },
      accepts: [
        { arg: 'req', type: 'object', 'http': { source: 'req' } },
        { arg: 'res', type: 'object', 'http': { source: 'res' } },
      ],
      returns: { arg: 'status', type: 'string' },
    }
  );

  const HttpErrors = require('http-errors');
  // ctx para dislike
  ctx = (0, _assign2.default)({
    method: 'dislike',
    endpoint: '/:id/dislike',
    dislikes: 'dislikes',
    userModel: 'usuario',
    description: ' dislikes ' + Noticia.definition.name + ' instance for the given userId'
  }, ctx);

  // agregando propiedad dislike a noticia
  Noticia.defineProperty(ctx.dislikes, { type: Object, default: { total: 0, users: [] } });

  // dislike metodo remoto
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
    accepts: [{ arg: 'id', type: 'string', required: true }, { arg: 'userId', type: 'string', required: true }],
    returns: { root: true, type: 'object' },
    http: { path: ctx.endpoint, verb: 'get' },
    description: ctx.description,
  });

  // hook para quitar dislike si le damos like
  Noticia.afterRemote('like', (ctx, noticia, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    var userId = ctx.result.usuarioId;
    var coinNews = ctx.result.tipo_moneda;
    var index = ctx.result.dislikes.users.indexOf(idUser);
    if (index > -1) {
      var d = ctx.result.dislikes.users.splice(index, 1);
      var d2 = ctx.result.dislikes.total = ctx.result.dislikes.total - 1;
      var d = ctx.result.dislikes;
      ctx.method.ctor.dislike(idn, idUser);
    }
    var index2 = ctx.result.likes.users.indexOf(idUser);
    if (index2 > -1) {
      console.log(index2);
      likenotif(ctx.result.id, idUser, userId);
    }
    Noticia.app.models.usuario.famaUser(userId, _variable.rpl, coinNews);
    next();
  });

  // hook para quitar like si le damos dislike

  Noticia.afterRemote('dislike', (ctx, noticia, next) => {
    var idn = ctx.req.params.id;
    var idUser = ctx.req.query.userId;
    var userId = ctx.result.usuarioId;
    var coinNews = ctx.result.tipo_moneda;
    var index = ctx.result.likes.users.indexOf(idUser);
    if (index > -1) {
      ctx.result.likes.users.splice(index, 1);
      ctx.result.likes.total = ctx.result.likes.total - 1;
      ctx.method.ctor.like(idn, idUser);
    }
    Noticia.app.models.usuario.famaUser(userId, _variable.rpd, coinNews);
    next();
  });

  // validacion campos de noticias
  Noticia.observe('before save', (context, next) => {
    var tit = context.instance.titulo;
    var cont = context.instance.contenido;
    if (tit.length > 90) {
      return next(new HttpErrors.BadRequest('Titulo debe tener como maximo 90 caracteres'));
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

  Noticia.afterRemote('create', (ctx, noticia, next) => {
    let userNews = ctx.result.usuarioId;
    Noticia.app.models.usuario.findById(userNews)
      .then(data => {
        Noticia.app.models.usuario.updateAll(
          { id: userNews }, { puntos: data.puntos + 1 })
          .then(data => {
            next();
          });
      });
  });
  Noticia.afterRemote('create', (ctx, user, next) => {
    let userId = ctx.result.usuarioId;
    let coinNews = ctx.result.tipo_moneda;
    Noticia.app.models.usuario.famaUser(userId, _variable.rpn, coinNews);
    next();
  });
  // hook para enviar notificaciones de noticias suscritas
  Noticia.afterRemote('create', (ctx, noticia, next) => {
    var io = Noticia.app.io;
    var con = 'sus' + ctx.result.usuarioId;

    Noticia.app.models.followUser.find({
      where: {
        posterId: ctx.result.usuarioId,
      },
    }).then(data => {
      data.forEach(element => {
        Noticia.app.models.notification.create({
          'tipo': 'news',
          'senderId': ctx.result.id,
          'date': Date.now(),
          'status': false,
          'usuarioId': element.followerId,
        });
      });
    });
    io.to(con).emit('request', {
      tipo: 'news',
      title: ctx.result.titulo,
      senderId: ctx.result.id,
      coin: ctx.result.tipo_moneda,
    });
    next();
  });
  Noticia.afterRemote('create', (ctx, noticia, next) => {
    var io = Noticia.app.io;
    io.emit('insertNoti', ctx.result);
    next();
  });

  Noticia.afterRemote('find', (ctx, noticia, next) => {
    var iterablex = [], iterabley = [];
    ctx.result.forEach((element, index) => {
      var x = dbx.filesSearch({ path: '/news', query: '' + element.usuarioId + '-perfil-' + element.id + '' }).then(r => {
        console.log('nombre');
        ctx.result[index].perfilName = r.matches[0].metadata.name;
        var x = dbx.filesGetTemporaryLink({ path: '/news/' + ctx.result[index].perfilName }).then(resp => {
          console.log('link');

          ctx.result[index].perfilLink = resp.link;
        }).catch(error => {
          console.log(error)
        });
        iterabley.push(x);
      }).catch(error => {
        console.log(error);
      });
      iterablex.push(x);

    });
    Promise.all(iterablex).then(values => {
      Promise.all(iterabley).then(valor => {
        next();
      })
    });
  });

  Noticia.afterRemote('findById', (ctx, noticia, next) => {
    var iterable = [], iterabley = [];
    ctx.result.imgsEditor = [];
    var aux;

    var x = dbx.filesSearch({ path: '/news', query: ctx.result.usuarioId + '-perfil-' + ctx.result.id }).then(r => {

      ctx.result.perfilName = r.matches[0].metadata.name;
      var y = dbx.filesGetTemporaryLink({ path: '/news/' + ctx.result.perfilName }).then(resp => {
        ctx.result.perfilLink = resp.link;
      }).catch(error => {
        console.log(error)
      });
      iterabley.push(y);
    }).catch(error => {
      console.log(error);
    })
    iterable.push(x);

    var expReg = /dropbox:["']{0,1}([^"' >]*)/g;
    var codImg = ctx.result.contenido.match(expReg);
    if (codImg) {
      codImg.forEach((element) => {
        var nameImg = element.split(':')[1];
        ctx.result.imgsEditor.push(nameImg);
        var x = dbx.filesGetTemporaryLink({ path: '/news/' + nameImg }).then(resp => {
          aux = ctx.result.contenido.replace(element, resp.link);
          ctx.result.contenido = aux;
        }).catch(error => {
          console.log(error)
        });
        iterable.push(x);
      });
    }

    codImg = ctx.result.conj_moneda.match(expReg);
    if (codImg) {
      codImg.forEach((element) => {
        var nameImg = element.split(':')[1];
        ctx.result.imgsEditor.push(nameImg);
        var x = dbx.filesGetTemporaryLink({ path: '/news/' + nameImg }).then(resp => {
          aux = ctx.result.conj_moneda.replace(element, resp.link);
          ctx.result.conj_moneda = aux;
        }).catch(error => {
          console.log(error)
        });
        iterable.push(x);
      });
    }
    
    codImg = ctx.result.conj_precio.match(expReg);
    if (codImg) {
      codImg.forEach((element) => {
        var nameImg = element.split(':')[1];
        ctx.result.imgsEditor.push(nameImg);
        var x = dbx.filesGetTemporaryLink({ path: '/news/' + nameImg }).then(resp => {
          aux = ctx.result.conj_precio.replace(element, resp.link);
          ctx.result.conj_precio = aux;
        }).catch(error => {
          console.log(error)
        });
        iterable.push(x);
      });
    }
    Promise.all(iterable).then(values => {
      Promise.all(iterabley).then(value => {
        next();
      })
    });

  });
  function likenotif(newsId, userId, owner) {
    var io = Noticia.app.io;
    Noticia.app.models.notification.create({
      'tipo': 'likeNews',
      'senderId': newsId,
      'date': Date.now(),
      'status': false,
      'usuarioId': owner,
      'emmiterId': userId,
    });
    io.to(owner).emit('request', {
      tipo: 'likeNews',
      senderId: newsId,
      emmiterId: userId,
    });
  }
};
