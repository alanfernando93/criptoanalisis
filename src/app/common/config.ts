export const ConfigSettings = {
    message: {
        success: "Se guardo con exito!!!",
        warning: "Se produjo un error con los puntos",
    },
    Image: {
        size: 1000000,
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
            warning: "Las imagenes permitidas son: png,jpg,jpeg,bmp"
        }
    }
}