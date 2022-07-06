import carritos from "../daos/DaosCarritos.js";
import logger from '../helpers/logger.js'
import {envioMailSmsWsp} from '../helpers/envio.js'

export const Carrito = async (id) => {
    try {
        return await carritos.getCarrito(id)
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const Comprar = async (req) => {
    try {
        envioMailSmsWsp(req)
        await carritos.deleteByIdProd(req)
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const agregarProd = async (req, res, next) => {
    try {
        let carr = await carritos.find(req)
        if(carr.length == 0){
            let newCarr= {
                "user_id": req.user.id,
                "idProd": req.params.id_prod,
                "nombreProd": req.body.nombre,
                "descripcion": req.body.descripcion,
                "imagen": req.body.imagen,
                "precioProd": req.body.precioProd,
                "cantidad": 1,
            }
            await carritos.agregarProdaCarr(newCarr)
        }else{
            await carritos.update(req)
        }
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteProd = async (req, res, next) => {
    try {
        await carritos.deleteByIdProd(req)
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}