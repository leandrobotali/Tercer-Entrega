import {carritoModel} from '../models/Models.js'

const carritos = {};

//---------------------------------------
//Functions

carritos.getCarrito = async(id) =>{
    try {
        const getCarrId = await carritoModel.find({user_id:id})
        .sort({ date: "desc" })
        .lean();
        return getCarrId
    } catch (err) {
        return error
    }
}

carritos.find = async(req) => {
    try {
        return await carritoModel.find({user_id:req.user.id, idProd:req.params.id_prod})
        .lean();
    } catch (err) {
        return error
    }
}

carritos.agregarProdaCarr = async(carr) => {
    try {
        const newCarrito = new carritoModel(carr)
        await newCarrito.save()
        return { 'messaje': 'Carrito agregado' }
    } catch (err) {
        return (err)
    }
}

carritos.update = async(req) => {
    try {
        await carritoModel.updateOne({ user_id: req.user.id, idProd: req.params.id_prod }, {
            $inc: {
                cantidad: 1
            }
        })
        return{'messaje':'Carrito Actualizado'}
    } catch (err) {
        return (err)
    }
}

carritos.deleteByIdProd = async(req) => {
    try {
        await carritoModel.deleteOne({user_id:req.user.id, idProd:req.params.id_prod})
        return{ 'messaje': 'Producto Quitado de carrito' }
    } catch (err) {
        return(err)
    }
}

export default carritos;