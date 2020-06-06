
import { Request, Response, query } from 'express';
import { Factura } from '../models/Factura'
import pool from '../database';
import QueryResult from 'mysql';

import { obtenerJsonRespuesta } from './respuestaJSON';
import puntoEmisionController from "../controllers/puntoEmision.controller";

class facturaController {




    public crearFactura = async (req: Request, res: Response): Promise<void> => {
        const consultaPtEmision = 'select establecimiento_id,nombre,codigo,secuencialFactura,activo from ptoemision where user_id=?';
        const consultaFactura = 'INSERT INTO factura(cliente_id,emisor_id,establecimiento_id,claveAcceso,estado,ambiente,tipoEmision,secuencial,formaPago,fechaEmision,totalSinImpuestos,subtotal12,subtotal0,subtotalNoIVA,subtotalExentoIVA,valorICE,valorIRBPNR,iva12,totalDescuento,propina,valorTotal,firmado,enviarSiAutorizado,observacion,createdAt,updatedAt,ptoEmision_id,createdBy_id,updatedBy_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        const createdAt = new Date();
        const updatedAt = new Date();
        const claveAcceso="011"
        const factura:Factura = await req.body;
        pool.query(consultaPtEmision, factura.user_id, async (err, rows) => {
            if (!err) {
                

                factura.secuencialFactura=rows[0].secuencialFactura

                pool.query(consultaFactura, [factura.cliente_id,factura.emisor_id,factura.establecimiento_id,claveAcceso,factura.estado,factura.ambiente,factura.tipoEmision,factura.secuencialFactura, factura.formaPago,factura.fechaEmision,factura.totalSinImpuestos,factura.subtotal12,factura.subtotal0,factura.subtotalNoIVA,factura.subtotalExentoIVA,factura.valorICE,factura.valorIRBPNR,factura.iva12,factura.totalDescuento,factura.propina,factura.valorTotal,0,0,factura.observacion,createdAt,updatedAt,factura.ptoEmision_id,factura.createdBy_id,factura.updatedBy_id], (error, resp) => {
                    if (!error) {
                        const autorizacion = ""
                        const estado = 200;
                        const mensaje = 'Factura creada satisfactoriamente.';
                        res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, resp));  
                    } else {
                        const autorizacion = ""
        
                        const estado = 401;
                        const mensaje = 'Error al crear la factura.';
                        res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, ""));
                    }
                });

            } else {
                const autorizacion = ""

                const estado = 401;
                const mensaje = 'No se pudo conectar con el servidor.';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, ""));
            }
        })



    }

}

export default new facturaController;


