'use strict';

module.exports = function (Usuario) {
  Usuario.getNoticias = function (cb) {
    Usuario.find({
      where: {
        id: $state.params.id
      },
      "include": {
        "relation": "noticia"
      }
    })
  }
  
  Usuario.remoteMethod('noticia_usuario', {
    returns: { arg: 'Usuarios', type: 'array' },
    http: { path: '/noticias', verb: 'get' }
  })
};
