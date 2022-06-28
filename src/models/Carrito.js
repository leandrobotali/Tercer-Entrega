import mongoose from 'mongoose'

const Mixed = mongoose.Schema.Types.Mixed

const carritoSchema = new mongoose.Schema({
    user_id: {type: Mixed,required: true},
    idProd: {type: Mixed,required: true},
    nombreProd: {type: String,required: true},
    descripcion: {type: String,required: true},
    imagen: {type: String,required: true},
    precioProd: {type: Number,required: true},
    cantidad: {type: Number,required: true}
},{
    timestamps:true
})

const carritoModel = mongoose.model('carritos', carritoSchema)

export default carritoModel;