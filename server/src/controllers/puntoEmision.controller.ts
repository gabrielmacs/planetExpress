import { Request, Response } from 'express';
import { PuntoEmision } from '../models/PuntoEmision';
import pool from '../database';
import { obtenerJsonRespuesta } from './respuestaJSON';

class puntoEmisionController {
    public async obtenerPtoEmision(req: Request, res: Response): Promise<void> {

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

}
export default new puntoEmisionController;
