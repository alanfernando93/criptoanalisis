
import loopback from 'loopback';
import base64Img from 'base64-img';
import config from '../../config.json';
import path from 'path';
var senderAddress = "noreply@loopback.com";

export default (Usuario) => {
  Usuario.validatesLengthOf('password', {
    min: 5, message:
      { min: 'el password debe de contener por lo menos 5 caracteres' },
  });
  Usuario.validatesLengthOf('username',
    { min: 3, message: { min: 'username debe de tener como minimo 3 letras' } });
  Usuario.validatesLengthOf('nombre',
    { min: 3, message: { min: 'nombre debe de tener como minimo 3 letras' } });
  Usuario.validatesLengthOf('apellido', +
    { min: 3, message: { min: 'apellido debe de tener como minimo 3 letras' } });
  Usuario.validatesUniquenessOf('email', { message: 'el email no es unico' });
  Usuario.validatesFormatOf('nombre', {
    with: /[a-zA-Z\-'\s]+/,
    message: 'el nombre debe estar compuesto por solo letras',
  });// solo nombres con letras ej juan
  Usuario.validatesFormatOf('apellido', {
    with: /[a-zA-Z\-'\s]+/,
    message: 'el apellido debe de estar compuesto de solo letras',
  });// apellido solo letras ej lopez
  Usuario.validatesFormatOf('username', {
    with: /^[a-zA-Z\-'\w]*$/,
    message: 'el username debe estar compuesto por letras o numeroso',
  });// username letras o letras seguido de numeros juan123
  Usuario.validatesFormatOf('password', {
    with: /[a-zA-Z0-9]/,
    message: 'password debe de estar compuesto por letras y numeros',
  }); // password compuesto por letras y numeros

  Usuario.upload = (req, res, cb) => {
    var Container = Usuario.app.models.Container;
    var id = req.params.id;
    Usuario.findById(id)
      .then(user => {
        Container.destroyContainer(user.username, (err, c) => {
          Container.createContainer({ name: user.username }, (err, c) => {
            Container.upload(req, res, { container: user.username }, cb);
          });
        });
      });
  };
  Usuario.remoteMethod(
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
  Usuario.observe('loaded', (ctx, next) => {
    var homedir = (process.platform == 'win32') ? process.env.HOMEPATH : process.env.HOME;
    var container = Usuario.app.models.Container;
    if (ctx.data.username != undefined) {
      container.getFiles(ctx.data.username, (err, data) => {
        if (data.length > 0) {
          data.map((f) => {
            base64Img.base64(homedir + /loop/ +
              ctx.data.username + '/' + f.getMetadata().name, (err, data) => {
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
    } else {
      next();
    }
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
        rol.find({ where: { name: 'normal' } }, (err, rol) => {
          if (err)
            throw err;
          map.upsertWithWhere({ principalId: ctx.instance.id }, {
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
        rol.find({ where: { name: 'premium' } }, (err, rol) => {
          if (err)
            throw err;
          map.upsertWithWhere({ principalId: ctx.instance.id }, {
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
  Usuario.remoteMethod('updateInfo', {
    http: { path: '/:id/updateInfo', verb: 'put' },
    accepts: [
      { arg: 'req', type: 'object', 'http': { source: 'req' } },
      { arg: 'res', type: 'object', 'http': { source: 'res' } },
    ],
    returns: { arg: 'user', type: 'object' },
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
              id: moneda[0].id, valor: 2, symbol: moneda[0].symbol
            },
            ];
          } else {
            var element = data.fama.find(
              element => element.id === moneda[0].id);
            if (element === undefined) {
              data.fama.push({
                id: moneda[0].id, valor: 2, symbol: moneda[0].symbol
              });
            } else {
              // @dev valor que se autoincrementa para segun al valor de la moneda
              data.fama[data.fama.indexOf(element)].valor += punto * 2;
            }
          }
          Usuario.updateAll({ id: userId }, {
            puntos: data.puntos + punto,
            fama: data.fama,
          }).then(data => {
          });
        });
      });
  };
  Usuario.precisionmod = (userId) => {
    Usuario.app.models.signal.find({
      where: {
        usuarioId: userId,
      },
      order: 'FechaCreate DESC',
      limit: 10,
      fields: {
        id: true,
        precision: true,
        FechaCreate: true,

      },
    }).then(data => {
      var x = 0;
      var count = 0;
      data.forEach(element => {
        if (element.precision != 0) {
          x = element.precision + x;
          count++;
        }
      });
      x = x / data.length;
      Usuario.findById(userId)
        .then(data => {
          var precision = {
            valor: x,
            nropost: data.precision.nropost + 1,
          };
          Usuario.updateAll({ id: userId }, {
            precision: precision,
          });
        });
    });
  };
  
  Usuario.haveEnoughFounds = (userId, monto) => {
    return Usuario.findById(userId)
      .then(user => {
        if (user.puntos >= monto)
          return true;
        return false;
      })
      .catch(err => {
        return false;
      });
  };

  Usuario.afterRemote('create', function (context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    user.verify(options, function (err, response) {
      if (err) {
        Usuario.deleteById(user.id);
        return next(err);
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
          'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  Usuario.afterRemote('prototype.verify', function (context, user, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent ' +
        'to your email successfully',
      content: 'Please check your email and click on the verification link ' +
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  Usuario.on('resetPasswordRequest', function (info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

      Usuario.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function (err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  Usuario.afterRemote('changePassword', function (context, user, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  Usuario.afterRemote('setPassword', function (context, user, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
};
