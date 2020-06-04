import express, { Router } from 'express';
import productoController from '../controllers/producto.controller';
import clienteController from "../controllers/cliente.controller";
import usuarioController from "../controllers/usuario.controller";
import puntoEmisionController from "../controllers/puntoEmision.controller";

class Rutas {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {

        //Usuario
        //      this.router.post('/loginUsuario', rutasUsuario);
        //Producto
        this.router.post('/obtenerProductos', productoController.obtenerProductos);
        this.router.post('/crearProducto', productoController.crearProducto);
        //Cientes
        this.router.post('/obtenerClientes', clienteController.obtenerClientes);
        this.router.post('/crearCliente', clienteController.crearCliente);
        this.router.post('/loginUsuario', usuarioController.loginUsuario);
        this.router.get('/obtenerPtoEmision/:userID', puntoEmisionController.obtenerPtoEmision);

  
    }

}

const rutas = new Rutas();

export default rutas.router;



