import User from "../models/User.js";
import {adminConf} from '../config/config.js'

export const createAdminUser = async () => {
  const userFound = await User.findOne({email: adminConf.email});

  if (userFound) return;

  const newUser = new User({
    email: adminConf.email,
    name: adminConf.name,
    direccion: adminConf.direccion,
    edad: adminConf.edad,
    nroTel: adminConf.nroTel,
    img: adminConf.img,
    rol: adminConf.rol
});

  newUser.password = await newUser.encryptPassword(adminConf.password);

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};
