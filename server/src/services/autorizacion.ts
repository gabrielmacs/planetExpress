import crypto from 'crypto';
import { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const encryptPassword=(password: string, salt: string) =>{
    var salted = `${password}{${salt}}`;
    const encoding = "binary";
    if (!salt) {
        salted = password;
    }
    var digest = crypto.createHash('sha512').update(salted).digest(encoding);
    for (var i = 1; i < 10; i++) {
        digest = crypto.createHash('sha512').update(Buffer.concat([Buffer.from(digest, 'binary'), Buffer.from(salted, 'utf8')])).digest(encoding);
    }
    return (Buffer.from(digest, 'binary')).toString('base64');
}

/* AQUI VA LA VERIFICACION DEL TOKEN, SI SE NECESITA EL VALOR QUE
 SE OBTIENE DEL TOKEN se debe enviar por el res al valor que se obtiene de jwt.verify*/

export const verificarToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('autorizacion');
    if(!token) return res.status(401).json('No puede acceder sin autenticarse');

    jwt.verify(token,process.env.TOKEN_SECRETO ||  "PlanetExpresSA+4[|Uracion");
    
    next();
}
module.exports=verificarToken;