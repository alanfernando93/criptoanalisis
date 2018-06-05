export const _GLOBAL = {
    apiUrl: 'https://backend.criptoanalisis.org/api/',
    Url: 'https://backend.criptoanalisis.org',
}

export const configCrud = {
    message: {
        success: "Se guardo con exito!!!",
        error: "Se produjo un error con",
    }
};
export const configImage = {
    maxSize: 1000000,
    pixele: {
        maxWidth: 2000,
        maxHeigth: 6000,
        minWidth: 100,
        minHeigth: 100,
    },
    type: new Array(
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/bmp"
    ),
    message: {
        success: "La imagen se cargo exitosamente",
        warning: "Las imagenes permitidas son: png,jpg,jpeg,bmp",
        error: "Vuelva a intertarlo",
    }
};

export const dBox = {
    token: 'NirdHiRLreAAAAAAAAAAWz7lcT2HvMv-XoyOD7wF7dHE4l0f1lMkL6aXd-kv-V_w',
    key: '',
    secret: 'vrm42gw40yjlaa4'
}

export const typeCoinByDefault = [{
    id: 'USD'
}, {
    id: 'BTC'
}, {
    id: 'ETH'
}]

export const typeOfOffer = [{
    title: 'Comprar',
    key: true,
}, {
    title: 'Vender',
    key: false,
}]
export const TipoSalida = [{
    title: 'Take Profit',
    key: true,
}, {
    title: 'Stop Profit',
    key: false,
}];