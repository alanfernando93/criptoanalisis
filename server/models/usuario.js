'use strict';
var loopback = require('loopback');
var base64Img = require('base64-img');
module.exports = function(Usuario) {
  // validacion de campos de usuario con metodos loopback
  const HttpErrors = require('http-errors');
  // var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;
  Usuario.validatesLengthOf('password', {min: 5, message:
    {min: 'el password debe de contener por lo menos 5 caracteres'}});
  Usuario.validatesLengthOf('username',
  {min: 3, message: {min: 'username debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('nombre',
  {min: 3, message: {min: 'nombre debe de tener como minimo 3 letras'}});
  Usuario.validatesLengthOf('apellido', +
  {min: 3, message: {min: 'apellido debe de tener como minimo 3 letras'}});
  Usuario.validatesUniquenessOf('email', {message: 'el email no es unico'});
  Usuario.validatesFormatOf('nombre', {with: /[a-zA-Z\-'\s]+/, message:  "el nombre debe estar compuesto por solo letras"});// solo nombres con letras ej juan
  Usuario.validatesFormatOf('apellido', {with: /[a-zA-Z\-'\s]+/, message: "el apellido debe de estar compuesto de solo letras"});// apellido solo  letras ej lopez
  Usuario.validatesFormatOf('username', {with: /^[a-zA-Z]\w*$/, message: "el username debe estar compuesto por letras o por letras y numeros"});// username letras o letras seguido de numeros juan123
  Usuario.validatesFormatOf('password', {with: /[a-zA-Z0-9]/, message: "password debe de estar compuesto por letras y numeros"});  // password compuesto por letras y numeros
  // Usuario.validatesFormatOf('email', {with: re, message: 'debe contener un email valido'});
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
  Usuario.observe('before save', function(context, next) {
    var em = context.instance.email;
    next();
  });

  //Usuario.observe('loaded', function(context, next) {
    //if (context.data.id != undefined){
    //  var cont = context.data.id;
    //  var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
    //  base64Img.base64(homedir + '/loop/' + cont + '/perfil.png', (err, data)=> {
     //   context.data.profile = data;
    //    next();
    //  });
   // };
  //});
};
