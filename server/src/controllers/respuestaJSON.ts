
export const obtenerJsonRespuesta=(message:string, autorizacion:string, data:string) => {
    const jsonRespuesta = {
        message,
        body: { 
            autorizacion,
            data,
        }
    };
    return jsonRespuesta;
}

