
import { Request, Response } from 'express';
import {Producto} from '../models/Producto'
import pool from '../database';
import {obtenerJsonRespuesta} from './respuestaJSON';

class productoController {

    public async obtenerProductos(req: Request, res: Response): Promise<void> {
        const solicitud = req.body;
        pool.query('select id,codigoPrincipal,nombre,precioUnitario,impuesto_iva_id from producto where emisor_id=?', solicitud.emisor_id, (err, rows, fields) => {
            if (!err) {
                if (rows.length) {
                    const autorizacion = ""
                    const estado = 200;
                    const mensaje = 'Productos encontrados satisfactoriamente.';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
                } else {
                    const autorizacion = ""
                    const estado = 200;
                    const mensaje = 'No se encontro ningún producto.';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
                }
            } else {
                const autorizacion = ""
                const estado = 401;
                const mensaje = 'No se pudo conectar con el servidor.';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
            }
        });

    }

    public async crearProducto(req: Request, res: Response): Promise<void> {
        const createdAt = new Date();
        const updatedAt = new Date();
        const producto:Producto = req.body;
        pool.query('insert into producto (emisor_id,impuesto_iva_id,codigoPrincipal,codigoAuxiliar,nombre,precioUnitario,createdBy_id,updatedBy_id,createdAt,updatedAt )  values  (?,?,?,?,?,?,?,?,?,?)', [producto.emisor_id, producto.impuesto_iva_id, producto.codigoPrincipal, producto.codigoAuxiliar, producto.nombre, producto.precioUnitario, producto.createdBy_id, producto.updatedBy_id, createdAt, updatedAt], (err, rows, fields) => {
            if (!err) {
    
                const autorizacion=""
                const estado = 200;
                const mensaje = 'Producto creado correctamente';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
    
            } else {
                console.log(err)
                const autorizacion=""
                const estado = 400;
                const mensaje = 'Error: Los datos del Producto son incorrectos.';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
            }
        });
    
    }

 

}
 
export default new productoController;


 