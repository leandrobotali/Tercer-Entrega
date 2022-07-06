import express from 'express';
const router = express.Router();

import {getCarrito, confirmarCompra, agregarProdaCarr, deleteByIdProd} from '../controllers/carrito.controller.js'
import { isAuthenticated } from "../middelwares/auth.js";


router.get('/carrito', isAuthenticated, getCarrito);

router.post('/carrito/Compra/:id_prod', isAuthenticated, confirmarCompra);

router.post('/carrito/producto/:id_prod', isAuthenticated, agregarProdaCarr);;

router.delete('/carrito/productos/:id_prod', isAuthenticated, deleteByIdProd);

export default router;