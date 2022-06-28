import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre:{ type: String, required: true},
  descripcion:{type: String,required: true},
  codigo:{type: Number,required: true},
  foto:{type: String,required: true},
  precio:{type: Number,required: true},
  stock:{type: Number,required: true}
},{
  timestamps:true
});

const productosModel = mongoose.model('productos', productoSchema)

export default productosModel;
