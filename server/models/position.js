'use strict';
var io = require('socket.io-client');
module.exports = function(Position) {
  // funcion para calcular el promedio de puntos de entrada
  Position.findEnterPoints = function(position) {
    Position.updateAll({id: position.id}, {
      reached: true,
    })
    .then(data=>{
      Position.find({
        where: {
          and: [
            {signalId: position.signalId},
            {puntoId: 1},
            {reached: true},
          ],
        },
      }).
      then(data=>{
        var prom = 0;
        data.forEach(element => {
          prom = prom + element.valor;
        });
        prom = prom / data.length;
        Position.app.models.signal.updateAll({
          id: position.signalId,
        }, {
          PEP: prom,
        });
      });
    });
  };
  // function para calcular la variacion porcentual en caso de fracaso
  function CalcularPrecision(signal, position, estado) {
    if (signal.PEP > 0) {
      var x = position.valor - signal.PEP;
      x = x / signal.PEP * 100;
      Position.app.models.signal.updateAll({
        id: signal.id,
      }, {
        precision: x,
        estado: estado,
      }, (err, data)=>{
        Position.app.models.usuario.precisionmod(signal.usuarioId);
      });
    }
  };
  function calcularExito(signal, position, estado) {
    Position.updateAll({id: position.id}, {
      reached: true,
    })
    .then(data=>{
      Position.find({
        where: {
          and: [
            {signalId: position.signalId},
            {puntoId: 2},
            {reached: true},
          ],
        },
      }).
      then(data=>{
        var prom = 0;
        data.forEach(element => {
          prom = prom + element.valor;
        });
        prom = prom / data.length;
        Position.app.models.signal.updateAll({
          id: position.signalId,
        }, {
          PSP: prom,
          precision: prom,
          estado: estado,
        }, (err, data)=>{
          Position.app.models.usuario.precisionmod(signal.usuarioId);
        });
      });
    });
  }
};
