import {productosModel} from '../models/Models.js'

const producto = {};

//------------------------------------------
//functions

producto.getAll = async() => {
    try{
        const getAllProd = await productosModel.find({})
        .sort({ date: "desc" })
        .lean();
        return getAllProd
    }catch(err){
        return err
    }
}

producto.save = async (prod) => {
    try {
        const newProducto = new productosModel(prod)
        await newProducto.save()

        return { 'messaje': 'Producto Agregado' }
    } catch (err) {
        return err
    }
}

producto.getById = async(id) => {
    try{
        const getByIdProd = await productosModel.find({_id:id}).lean()
        return getByIdProd
    }catch(err){
        return err
    }
}

producto.updateById = async(req) => {
    try{
        const getUpdProd = await productosModel.updateOne({_id:req.params.id},{
            $set:{
                "nombre": req.body.nombre,
                "descripcion":  req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
        })
        return{'messaje':'Producto Actualizado'}
    }catch(err){
        return err
    }
}

producto.deleteById = async(id) => {
    try{
        await productosModel.deleteOne({_id:id})
        return {'messaje':'Producto Borrado'}
    }catch(error){
        return(error)
    }
}

export default producto;