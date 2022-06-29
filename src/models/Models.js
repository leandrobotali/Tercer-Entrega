import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import 'dotenv/config'
import logger from '../helpers/logger.js'

await mongoose.connect(process.env.MONGO_URI_STORE_SESSIONS)
.then(db => logger.info('database is connected'))
.catch(err => {
    logger.error(err)
    process.exit(1)
});

const UserSchema = new mongoose.Schema(
  {    
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, trim: true },
    direccion: { type: String, trim: true },
    edad: { type: Number, trim: true },
    nroTel: { type: String, trim: true },
    img: { type: String, default: "/img/default.jpg", trim: true },
    rol: { type: String, default: "user", trim: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

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

const productosModel = mongoose.model('productos', productoSchema)
const carritoModel = mongoose.model('carritos', carritoSchema)
const userModel = mongoose.model("User", UserSchema);

export {carritoModel,userModel,productosModel};