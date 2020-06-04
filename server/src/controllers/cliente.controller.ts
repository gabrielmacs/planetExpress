import { Request, Response } from 'express';
import pool from '../database';
import { obtenerJsonRespuesta } from './respuestaJSON';
import { Cliente } from '../models/Cliente';

class clienteController {
    public async obtenerClientes(req: Request, res: Response): Promise<void> {
        const solicitud= req.body;
        pool.query('select id,nombre,identificacion,celular,correoElectronico from cliente where emisor_id=?', solicitud.emisor_id, (err, rows, fields) => {
            if (!err) {
                if (rows.length) {
                    const autorizacion=""
                    const estado = 200;
                    const mensaje = 'Clientes encontrados satisfactoriamente.';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
                } else {
                    const autorizacion=""
                    const estado = 200;
                    const mensaje = 'No se encontro ningún cliente.';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
                }
            } else {
                const autorizacion=""
                const estado = 400;
                const mensaje = 'Error: no se pudo obtener los clientes';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
            }
        });

    }


    public async crearCliente(req: Request, res: Response): Promise<void> {
        const createdAt = new Date();
        const updatedAt = new Date();
        const cliente:Cliente = req.body;
        pool.query('insert into cliente (emisor_id,nombre,tipoIdentificacion,identificacion,direccion,celular,correoElectronico,createdBy_id,updatedBy_id,createdAt,updatedAt ) values (?,?,?,?,?,?,?,?,?,?,?)', [cliente.emisor_id, cliente.nombre, cliente.tipoIdentificacion, cliente.identificacion, cliente.direccion, cliente.celular, cliente.correoElectronico, cliente.createdBy_id, cliente.updatedBy_id,createdAt,updatedAt], (err, rows, fields) => {
            if (!err) {
               
                    const autorizacion=""
                    const estado = 200;
                    const mensaje = 'Cliente creado correctamente';
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
              
            } else {
                console.error(err)
                const autorizacion=""
                const estado = 400;
                const mensaje = 'Error: Los datos del cliente son incorrectos.';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, rows));
            }
        });
    
    }
    




}

export default new clienteController;


