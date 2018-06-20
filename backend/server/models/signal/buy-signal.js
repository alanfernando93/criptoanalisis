export default (buySignal) => {
    //hook que realiza una compra de una señal
    buySignal.beforeRemote('create',(ctx,result,next)=>{
        let transaccion = buySignal.app.models.Transaccion;
        let signal = buySignal.app.models.signal;
        signal.findById(ctx.req.body.signalId)
        .then(signal=>{
            transaccion.makeTransaction(signal.usuarioId, ctx.req.body.usuarioId, signal.precio, 'signal sold')
            .then(done=>{
                if(done) {
                    next();
                } else {
                    next(new Error('not enough found to make transaction'));
                }
            });
        })
       .catch(err=>{
        next(err);
       })
    });
};
