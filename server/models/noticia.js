'use strict';

module.exports = function(Noticia) {
    Noticia.Listar_noticias = function(cb){
        Noticia.find({
            where:{
                titulo:'bitcoin'
            }
        },cb)
    };

    Noticia.remoteMethod('Listar_noticias', {
        returns: {arg: 'Noticias', type: 'array'},
        http: {path:'/listar_noticas', verb: 'get'}
      });

};
