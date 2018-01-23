'use strict';

module.exports = function(Container) {
  Container.getArchivos = function(cb) {
    Container.getFiles('profile', (err)=>{
      console.log("soy un error");
    }, cb )};
  Container.remoteMethod('getArchivos', {
        returns: {arg: 'Archivos', type: 'array'},
        http: {path: '/getArchivos', verb: 'get'},
      });
 };
