import {CalculatePrice} from '../../../calculateFunctions/CoinFunction';
export default (Contenido) => {
      // verifica si es tiene un precio por defecto
  // verifica si es tiene un precio por defecto
  Contenido.afterRemote('create', (ctx, news, next)=>{
    if (ctx.result.precio == null) {
      Contenido.setPrice(ctx.result.id, ctx.result.usuarioId)
      .then(price=>{
        ctx.result.precio = price;
        next();
      });
    } else {
      next();
    }
  });
  Contenido.setPrice = (contentId, userId)=>{
    let usuarioModel = Contenido.app.models.usuario;
    return usuarioModel.findById(userId)
      .then(usuario =>{
        return Contenido.count({usuarioId: userId})
        .then(val=>{
          let price = CalculatePrice(usuario.precision.valor, val);
          Contenido.updateAll({id: contentId}, {precio: price, comprable: true});
          return price;
        });
      });
  };
};
