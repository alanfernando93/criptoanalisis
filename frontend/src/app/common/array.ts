export function orderData(obj) {
    obj.fama.sort(function (a, b) {
      return a.valor < b.valor;
    });
  }
