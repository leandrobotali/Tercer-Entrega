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

carritos.agregarProdaCarr = async(req) => {
    try {
        const getCarrId = await carritoModel.find({user_id:req.user.id, idProd:req.params.id_prod})
        .lean();
        if(getCarrId.length == 0){
            const newCarrito = new carritoModel({
                "user_id": req.user.id,
                "idProd": req.params.id_prod,
                "nombreProd": req.body.nombre,
                "descripcion": req.body.descripcion,
                "imagen": req.body.imagen,
                "precioProd": req.body.precioProd,
                "cantidad": 1,
            })
            await newCarrito.save()
            return {'messaje':'Carrito agregado'}
        }else{
            await carritoModel.updateOne({user_id:req.user.id, idProd:req.params.id_prod},{
            $set:{
                   "cantidad": getCarrId[0].cantidad + 1
                }
            })
            return{'messaje':'Carrito Actualizado'}
        }
    } catch (err) {
        return(err)
    }
}

carritos.deleteByIdProd = async(req) => {
    try {
        const getDelProd = await carritoModel.deleteOne({user_id:req.user.id, idProd:req.params.id_prod})
        return{ 'messaje': 'Producto Quitado de carrito' }
    } catch (err) {
        return(err)
    }
}

export default carritos;