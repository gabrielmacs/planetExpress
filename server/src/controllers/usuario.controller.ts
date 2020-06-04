import { Request, Response } from 'express';
import pool from '../database';
import { obtenerJsonRespuesta } from './respuestaJSON';
import { encryptPassword } from '../services/autorizacion'
import { Usuario } from '../models/Usuario';
import jwt from 'jsonwebtoken';

class usuarioController {

    public async loginUsuario(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT user.id as userId, user.emisor_id, user.rol_id,user.username,user.password,user.email,user.nombre,user.apellidos, user.salt,user.is_active as userActivo,emisor.ruc,emisor.razonSocial,emisor.nombreComercial,emisor.direccionMatriz, establecimiento.id as idEstablecimiento,establecimiento.codigo as codigoEstablecimiento,establecimiento.activo as establecimientoActivo from user   INNER JOIN role on user.emisor_id = role.id  INNER JOIN emisor on user.emisor_id = emisor.id INNER JOIN establecimiento on user.emisor_id = establecimiento.emisor_id where username=?';
        const usuario: Usuario = req.body;
        pool.query(consulta, usuario.username.trim(), (err, rows, fields) => {
            if (!err) {
                try {
                    if (encryptPassword(usuario.password.trim(), rows[0].salt) == rows[0].password) {
                        const token = jwt.sign({ _id: rows[0].username }, process.env.TOKEN_SECRETO || "PlanetExpresSA+4[|Uracion")
                        const estado = 200;
                        const mensaje = 'Usuario logeado con éxito';
                        const autorizacion = token;
                        rows[0].password = "";
                        rows[0].salt = "";
                        const data = rows[0];
                        res.status(estado).json(obtenerJsonRespuesta(mensaje, autorizacion, data));
                    } else {
                        const estado = 401;
                        const mensaje = 'El password no coincide con el del usuario ' + rows[0].username;
                        res.status(estado).json(obtenerJsonRespuesta(mensaje, "", ""));
                    }
                } catch (error) {

                    const estado = 401;
                    const mensaje = 'No se encontró en la BDD el usuario  ' + usuario.username;
                    res.status(estado).json(obtenerJsonRespuesta(mensaje, "", ""));
                }

            } else {
                console.log(err);
                const estado = 404;
                const mensaje = 'No se pudo conectar a la BDD';
                res.status(estado).json(obtenerJsonRespuesta(mensaje, "", ""));


            }
        });



    }
    

}





export default new usuarioController;


