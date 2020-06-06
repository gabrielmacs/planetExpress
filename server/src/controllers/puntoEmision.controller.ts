import { Request, Response, response } from 'express';
import { PuntoEmision } from '../models/PuntoEmision';
import pool from '../database';
import { obtenerJsonRespuesta } from './respuestaJSON';

class puntoEmisionController {
    public  obtenerPtoEmision= async(req: Request, res: Response): Promise<void> => {

        const solicitud = req.params;
        pool.query('select user_id,establecimiento_id,nombre,codigo,secuencialFactura,activo from ptoemision where user_id=?', solicitud.userID, (err, rows, fields) => {
            if (!err) {
                if (rows.length) {
                    const estado = 200;
                    const mensaje = 'Punto de emision encontrado satisfactoriamente.';
                    const puntoEmision:PuntoEmision  = rows[0]
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, "", rows[0]));
                } else {
                    const estado = 200;
                    const mensaje = 'No se encontro ningún punto de emision.';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, "", rows));
                }
            } else {
                const estado = 401;
                const mensaje = 'No se pudo conectar con el servidor.';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, "", rows));
            }
        });

    }


    public getPtoEmision= async(userID:string): Promise<void>=> {

        pool.query('select user_id,establecimiento_id,nombre,codigo,secuencialFactura,activo from ptoemision where user_id=?', userID, (err, rows, fields) => {
            if (!err) {
               
                    const estado = 200;
                    const mensaje = 'Punto de emision encontrado satisfactoriamente.';
                    const puntoEmision:PuntoEmision  = rows[0]
                    console.log(puntoEmision.secuencialFactura)
                    return puntoEmision.secuencialFactura;                
            } else {
                const estado = 401;
                const mensaje = 'No se pudo conectar con el servidor.';
                return mensaje;                

            }
        });

    }



}
export default new puntoEmisionController;
