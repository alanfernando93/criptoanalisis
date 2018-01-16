'use strict';

module.exports = function (app) {

  app.dataSources.db.automigrate('noticia', function (err) {
    if (err) throw err;

    app.models.noticia.create([{  
      "titulo": "bitcoin",
      "contenido": "prueba noticia",
      "tipo_moneda": "bitcoin",
      "conj_moneda": "siacoin",
      "like":"0",
      "fecha_create":"",
      "conj_precio":"ninguna",
      "fuentes":"wikipedia"
    }], function(err, noticias) {
      console.log('Models created: \n', noticias);
    });
  });
};