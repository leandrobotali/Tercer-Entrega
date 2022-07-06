import logger from '../helpers/logger.js'
import {Carrito, Comprar, agregarProd, deleteProd} from '../servicios/servCarrito.js'

export const getCarrito = async (req, res, next) => {
    try {
        const Carritos = await Carrito(req.user.id)
        res.render("Carrito/get-carrito", { Carrito: Carritos});
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const confirmarCompra = async (req, res, next) => {
    try {
        await Comprar(req)
        req.flash("success_msg", "Su compra esta en proceso");
        res.redirect("/carrito");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const agregarProdaCarr = async (req, res, next) => {
    try {
        await agregarProd(req)
        req.flash("success_msg", "Producto agregado");
        res.redirect("/productos");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteByIdProd = async (req, res, next) => {
    try {
        await deleteProd(req)
        req.flash("success_msg", "Producto Eliminado de Carrito");
        res.redirect("/carrito");
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
