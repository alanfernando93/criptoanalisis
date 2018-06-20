'use strict';

module.exports = {
  AccessToken: [],
  ACL: [],
  Role: [
    {
      'name': 'admin',
    }, {
      'name': 'normal',
    }, {
      'name': 'premium',
    },
  ],
  RoleMapping: [{
    principalType: 'USER',
    principalId: 1,
    roleId: 1,
  }],
  usuario: [
    {
      'nombre': 'Tony',
      'apellido': 'Stark',
      'username': 'ironman',
      'password': 'ironman',
      'email': 'ironman@test.com',
      'fama': [{
        "id": 1,
        "valor": 84,
        "symbol": "BTC"
      },
      {
        "id": 3,
        "valor": 100,
        "symbol": "XRP"
      },
      {
        "id": 2,
        "valor": 2,
        "symbol": "ETH"
      },
      {
        "id": 4,
        "valor": 2,
        "symbol": 'BCH'
      }],
    }, {
      'nombre': 'Peter',
      'apellido': 'Parker',
      'username': 'spiderman',
      'password': 'spiderman',
      'email': 'spiderman@test.com',
      'fama': [{
        "id": 1,
        "valor": 84,
        "symbol": "BTC"
      },
      {
        "id": 3,
        "valor": 100,
        "symbol": "XRP"
      },
      {
        "id": 2,
        "valor": 2,
        "symbol": "ETH"
      },
      {
        "id": 4,
        "valor": 2,
        "symbol": 'BCH'
      }],
    }, {
      'nombre': 'Bruce',
      'apellido': 'Banner',
      'username': 'hulk',
      'password': 'hulk',
      'email': 'hulk@test.com',
      'fama': [{
        "id": 1,
        "valor": 84,
        "symbol": "BTC"
      },
      {
        "id": 3,
        "valor": 100,
        "symbol": "XRP"
      },
      {
        "id": 2,
        "valor": 2,
        "symbol": "ETH"
      },
      {
        "id": 4,
        "valor": 2,
        "symbol": 'BCH'
      }],
    },
  ],
  moneda: [
    {
      'name': 'Bitcoin',
      'symbol': 'BTC',
      'TotalSuply': 17089700.0,
    }, {
      'name': 'Ethereum',
      'symbol': 'ETH',
      'TotalSuply': 100035260.0,
    }, {
      'name': 'Ripple',
      'symbol': 'XRP',
      'TotalSuply': 99991958570.0,
    }, {
      'name': 'Bitcoin Cash',
      'symbol': 'BCH',
      'TotalSuply': 17180038.0,
    }, {
      'name': 'EOS',
      'symbol': 'EOS',
      'TotalSuply': 900000000.0,
    }, {
      'name': 'Litecoin',
      'symbol': 'LTC',
      'TotalSuply': 56952723.0,
    }, {
      'name': 'Stellar',
      'symbol': 'XLM',
      'TotalSuply': 104025824192.0,
    }, {
      'name': 'Cardano',
      'symbol': 'ADA',
      'TotalSuply': 31112483745.0,
    }, {
      'name': 'IOTA',
      'symbol': 'MIOTA',
      'TotalSuply': 2779530283.0,
    }, {
      'name': 'TRON',
      'symbol': 'TRX',
      'TotalSuply': 100000000000.0,
    },
  ],
  'asesoria_personal': [],
  'disputa': [],
  instruccion: [],
  pago: [],
  'comentario_asesoria': [],
  'answer_asesoria': [],
  mercado: [],
  mercado: [],
  titulo: [],
  contenidoMoneda: [],
  messageRoom: [],
  userMessage: [],
  noticia: [
    {
      'titulo': 'El servicio gratuito de Google traduce instantáneamente palabras',
      'contenido': '<p><span class=\"st\">El servicio gratuito de Google traduce instant&aacute;neamente palabras, frases y p&aacute;ginas web del espa&ntilde;ol a m&aacute;s de 100 idiomas y viceversa.</span></p>',
      'tipo_moneda': 'Bitcoin',
      'conj_moneda': '<p><span class=\"st\">El servicio gratuito de Google traduce instant&aacute;neamente palabras, frases y p&aacute;ginas web del espa&ntilde;ol a m&aacute;s de 100 idiomas y viceversa.</span></p>',
      'conj_precio': '<p><span class=\"st\">El servicio gratuito de Google traduce instant&aacute;neamente palabras, frases y p&aacute;ginas web del espa&ntilde;ol a m&aacute;s de 100 idiomas y viceversa.</span></p>',
      'usuarioId': 1,
    }, {
      'titulo': '¿Qué es Lorem Ipsum?',
      'contenido': '<h2>&iquest;Qu&eacute; es Lorem Ipsum?</h2>\n<p>&nbsp;</p>\n<p><strong>Lorem Ipsum</strong> es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno est&aacute;ndar de las industrias desde el a&ntilde;o 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)</p>',
      'tipo_moneda': 'ETX',
      'conj_moneda': '<h2>&iquest;Qu&eacute; es Lorem Ipsum?</h2>\n<p>&nbsp;</p>\n<p><strong>Lorem Ipsum</strong> es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno est&aacute;ndar de las industrias desde el a&ntilde;o 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)</p>',
      'conj_precio': '<h2>&iquest;Qu&eacute; es Lorem Ipsum?</h2>\n<p>&nbsp;</p>\n<p><strong>Lorem Ipsum</strong> es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno est&aacute;ndar de las industrias desde el a&ntilde;o 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)</p>',
      'usuarioId': 2,
    }, {
      'titulo': 'Crean videojuego con una mujer de pollera',
      'contenido': '<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Con el prop&oacute;sito de destacar espacios tur&iacute;sticos de El Alto un grupo de emprendedores crea el primer videojuego de El Alto con personajes aymaras, tendr&aacute; como principal atracci&oacute;n la aparici&oacute;n en 3D de la cholita pace&ntilde;a.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Los emprendedores aglutinados bajo el nombre de &ldquo;Mundo Virtual&rdquo;, un laboratorio de proyectos digitales forma ni&ntilde;os y j&oacute;venes en temas de rob&oacute;tica e inform&aacute;tica.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Entre sus principales trabajos se destaca el desarrollo y la producci&oacute;n de videojuegos</p>\n<h2 style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Recoger monedas</h2>\n<p><span style=\"color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Grover Suntura, uno de los emprendedores, explic&oacute; que &ldquo;el video juego tendr&aacute; la misi&oacute;n de recoger monedas y cada usuario empezar&aacute; ganando centavos de criptomonedas sin ning&uacute;n tipo de restricciones, recorrer&aacute; diversos sitios y paisajes de la urbe alte&ntilde;a&rdquo;.</span></p>\n<p><img src=\"http://www.elalteno.com.bo/sites/default/files/inline-images/inge-suntura.jpg\" alt=\"Crean videojuego con una mujer de pollera\" /></p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Seg&uacute;n sus impulsores el videojuego tiene un parecido a World of WarCraft y Vice City, videojuegos de rol multijugador masivo en l&iacute;nea desarrollado por Blizzard Entertainment.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Los juegos mencioandos fueron lanzados el 23 de noviembre de 2004, celebrando el d&eacute;cimo aniversario de la franquicia Warcraft.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">La primera expansi&oacute;n del juego The Burning Crusade fue lanzada el 16 de enero del 2007.</p>\n<h3 style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Autodidacta</h3>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Suntura afirma ser autodidacta en el &aacute;rea de animaci&oacute;n digital &ldquo;he decidido aprender solo, no sab&iacute;a nada de tecnolog&iacute;a&rdquo;, expresa el emprendedor indicando que sus primeros conocimientos en dise&ntilde;os los obtuvo a trav&eacute;s de los diversos tutoriales que se encuentran en YouTube.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">Adem&aacute;s, anticip&oacute; que el primer videojuego tendr&aacute; como principal protagonista a la cholita pace&ntilde;a, el lanzamiento se prev&eacute; para los primeros d&iacute;as del mes de junio en un acto a realizarse en la Cinemateca Boliviana.</p>\n<p style=\"margin-top: 0px; margin-bottom: 10px; color: #333333; font-family: Roboto, serif; font-size: 18px; background-color: #ffffff;\">&nbsp;</p>',
      'tipo_moneda': 'Bitcoin',
      'conj_moneda': '',
      'fecha_create': '2018-06-04T21:11:23.000Z',
      'conj_precio': '<p>Considero, que al ser una inclusion de imagenes e iconografia tradicional, este tipo de noticias impulsa y ayuda a el interes de los usuarios, estimo un analisis tecnico de este tipo:</p>\n<p><img src=\"dropbox:7-1528146678779.png:\" alt=\"\" /></p>\n<p>Asi que esperamos una subida poderosa</p>',
      'usuarioId': 3,
    }
  ],
  'comentario_noticia': [],
  'answer_noticia': [],
  notification: [],
  followUser: [],
  followUser: [],
  signal: [
    {
      'tipo': true,
      'tipoInversion': 'POW',
      'AnalisisFundamental': '<p>Considero, que al ser una inclusion de imagenes e iconografia tradicional, este tipo de noticias impulsa y ayuda a el interes de los usuarios, estimo un analisis tecnico de este tipo:</p>\n<p><img src=\"dropbox:7-1528146678779.png:\" alt=\"\" /></p>\n<p>Asi que esperamos una subida poderosa</p>',
      'AnalisisTecnico': '<p>Considero, que al ser una inclusion de imagenes e iconografia tradicional, este tipo de noticias impulsa y ayuda a el interes de los usuarios, estimo un analisis tecnico de este tipo:</p>\n<p><img src=\"dropbox:7-1528146678779.png:\" alt=\"\" /></p>\n<p>Asi que esperamos una subida poderosa</p>',
      'EstrategiaSalida': 'string',
      'moneda1': 'BTC',
      'moneda2': 'USD',
      'usuarioId': 1,
    }, {
      'tipo': false,
      'tipoInversion': 'POW',
      'AnalisisFundamental': '<p>Considero, que al ser una inclusion de imagenes e iconografia tradicional, este tipo de noticias impulsa y ayuda a el interes de los usuarios, estimo un analisis tecnico de este tipo:</p>\n<p><img src=\"dropbox:7-1528146678779.png:\" alt=\"\" /></p>\n<p>Asi que esperamos una subida poderosa</p>',
      'AnalisisTecnico': '<p>Considero, que al ser una inclusion de imagenes e iconografia tradicional, este tipo de noticias impulsa y ayuda a el interes de los usuarios, estimo un analisis tecnico de este tipo:</p>\n<p><img src=\"dropbox:7-1528146678779.png:\" alt=\"\" /></p>\n<p>Asi que esperamos una subida poderosa</p>',
      'EstrategiaSalida': 'string',
      'moneda1': 'ETH',
      'moneda2': 'USD',
      'usuarioId': 1,
    },
  ],
  punto: [
    {
      'descripcion': 'entrada'
    },
    {
      'descripcion': 'salida'
    },
    {
      'descripcion': 'stoploss'
    }
  ],
  position: [
    {
      'valor': 8830,
      'porcentajeCapital': 15,
      'signalId': 1,
      'puntoId': 1,
    }, {
      'valor': 8324,
      'porcentajeCapital': 40,
      'signalId': 1,
      'puntoId': 2,
    }, {
      'valor': 8322,
      'porcentajeCapital': 20,
      'signalId': 2,
      'puntoId': 1,
    }, {
      'valor': 8320,
      'porcentajeCapital': 50,
      'signalId': 2,
      'puntoId': 2,
    },
  ],
  buySignal: [],
  'comentario_senal': [],
  'answer-senal': [],
  transaccion: [],
  solicitud: [],
};

