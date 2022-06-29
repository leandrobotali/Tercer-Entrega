import carritos from "../daos/DaosCarritos.js";
import logger from '../helpers/logger.js'
import client from '../helpers/twilioSms.js'
import { twilioConf,adminConf } from "../config/config.js";
import transporter from '../helpers/transportMail.js'

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
        const mailOption = {
            from:'Servidor Node js',
            to: adminConf.email,
            subject: 'Nueva Compra de: ' + req.user.name + ' email: ' + req.user.email,
            text: 'Nueva compra: ' + '\n Usuario: ' + req.user.email + '\n Producto: ' + req.body.nombre + '\n Precio: ' + req.body.precio + '\n Cantidad: ' + req.body.cantidad,
        }
        let toSms = '+54' + req.user.nroTel
        const SMSoptions = {
            body: 'Su pedido fue recibido y se encuentra en proceso',
            from: twilioConf.nroSms,
            to: toSms
        }

        let sandBox = 'whatsapp:' + twilioConf.nroSandbox
        let toWsp = 'whatsapp:+549' + adminConf.nroTel
        const WSPoptions = {
            body: 'Nueva compra: ' + '\n Usuario: ' + req.user.email + '\n Producto: ' + req.body.nombre + '\n Precio: ' + req.body.precio + '\n Cantidad: ' + req.body.cantidad,
            from: sandBox,
            to: toWsp
        }
        
        const info = await transporter.sendMail(mailOption)

        const message = await client.messages.create(SMSoptions)

        const wspMessage = await client.messages.create(WSPoptions)

        logger.info(info)
        logger.info(message)
        logger.info(wspMessage)

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
