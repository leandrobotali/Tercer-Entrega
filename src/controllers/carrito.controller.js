import carritos from "../daos/DaosCarritos.js";
import logger from '../helpers/logger.js'
import {envioMailSmsWsp} from '../helpers/envio.js'

export const getCarrito = async (req, res, next) => {
    try {
        const Carrito = await carritos.getCarrito(req.user.id)
        let precioTotal = 0;
        for (let i = 0; i < Carrito.length; i++) {
            precioTotal += (Carrito[i].catidad * Carrito[i].PrecioProd)
        }
        res.render("Carrito/get-carrito", { Carrito: Carrito});
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const confirmarCompra = async (req, res, next) => {
    try {
        envioMailSmsWsp(req)
        await carritos.deleteByIdProd(req)
        req.flash("success_msg", "Su compra esta en proceso");
        res.redirect("/carrito");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const agregarProdaCarr = async (req, res, next) => {
    try {
        await carritos.agregarProdaCarr(req)
        req.flash("success_msg", "Producto agregado");
        res.redirect("/productos");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteByIdProd = async (req, res, next) => {
    try {
        await carritos.deleteByIdProd(req)
        req.flash("success_msg", "Producto Eliminado de Carrito");
        res.redirect("/carrito");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
