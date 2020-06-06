import express, { Router } from 'express';
import productoController from '../controllers/producto.controller';
import clienteController from "../controllers/cliente.controller";
import usuarioController from "../controllers/usuario.controller";
import puntoEmisionController from "../controllers/puntoEmision.controller";
import facturaController from "../controllers/factura.controller";

class Rutas {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        //Producto
        this.router.post('/obtenerProductos', productoController.obtenerProductos);
        this.router.post('/crearProducto', productoController.crearProducto);
        //Cientes
        this.router.post('/obtenerClientes', clienteController.obtenerClientes);
        this.router.post('/crearCliente', clienteController.crearCliente);
        //user
        this.router.post('/loginUsuario', usuarioController.loginUsuario);
        //factura
        this.router.post('/crearFactura', facturaController.crearFactura);
        this.router.get('/obtenerPtoEmision/:userID', puntoEmisionController.obtenerPtoEmision);

  
    }

}

const rutas = new Rutas();

export default rutas.router;



