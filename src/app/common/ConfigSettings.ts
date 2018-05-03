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
        succes: "La imagen se cargo exitosamente",
        warning: "Las imagenes permitidas son: png,jpg,jpeg,bmp",
        error: "Vuelva a intertarlo",
    }
};