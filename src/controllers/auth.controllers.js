import User from "../models/User.js";
import passport from "passport";
import logger from '../helpers/logger.js'
import { adminConf } from "../config/config.js";
import transporter from '../helpers/transportMail.js'

export const renderSignUpForm = (req, res, next) => res.render("auth/signup");

export const singup = async (req, res, next) => {
  try {
    let errors = [];
    const { name, email, password, confirm_password, direccion, edad, cod_pais,cod_area, nro_tel } = req.body;
    if (password !== confirm_password)errors.push({ text: "Passwords no coinciden." });
    if (password.length < 4) errors.push({ text: "Passwords deben tener como minimo 4 caracteres." })  
    if (!direccion) errors.push({ text: "Falta el campo Direccion." })
    if (!edad) errors.push({ text: "Falta el campo Edad." })
    if (!cod_pais) errors.push({ text: "Falta el codigo del pais." })
    if (!cod_area) errors.push({ text: "Falta el codigo de ciudad." })
    if (!nro_tel) errors.push({ text: "Falta el numero de telefono." })
    if (errors.length > 0) {
      logger.error(errors)
      return res.render("auth/signup", {
        errors,
        name,
        email,
        password,
        confirm_password,
        direccion,
        edad,
        cod_pais,
        cod_area,
        nro_tel,
      });
    }
  
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      req.flash("error_msg", "El Email ya esta en uso.");
      return res.redirect("/auth/signup");
    }
    let nroTel = parseInt(cod_pais + cod_area + nro_tel)
    
    const newUser = new User({ name, email, password, direccion, edad, nroTel });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "Estas Registrado.");
    logger.info('usuario ' + email + ' registrado ')

    const mailOption = {
      from:'Servidor Node js',
      to: adminConf.email,
      subject: 'Nuevo Registro',
      text: 'nuevo usuario:\n nombre: ' + name + '\n email: ' + email + '\n direccion: ' + direccion + '\n edad: ' + edad + '\n numero de telefono: ' + nroTel,
    }

    const info = await transporter.sendMail(mailOption)

    logger.info(info)
    res.redirect("/auth/signin");    
  } catch (error) {
    logger.error(error)
    next(error)
  }
};

export const renderSigninForm = (req, res,next) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/productos",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const uploadImg = async (req, res, next) => {
  const file = req.file
    if (!file) {
      logger.error('no se seleccion imagen')
        return res.render("auth/perfil",{
          email: req.user.email,
          name: req.user.name,
          edad: req.user.edad,
          direccion: req.user.direccion,
          nroTel: req.user.nroTel, 
          img: req.user.img, 
          error:"debe seleccionar un archivo"
        })        
    }
    try {
      await User.updateOne({_id:req.user.id},{
        $set:{
            "img": "/img/" + req.file.filename
        }
      })
      const getByIduser = await User.find({_id:req.user.id})
      res.render("auth/perfil", {
        email: getByIduser[0].email,
        name: getByIduser[0].name,
        edad: getByIduser[0].edad,
        direccion: getByIduser[0].direccion,
        nroTel: getByIduser[0].nroTel, 
        img: getByIduser[0].img
      });
      logger.info('usuario ' + req.user.email + ' cambio su foto de perfil ')
    } catch (error) {
      logger.error(error)
      next(error)
    }
}

export const perfil = async (req, res, next) => {
  res.render("auth/perfil", {
    email: req.user.email,
    name: req.user.name,
    edad: req.user.edad,
    direccion: req.user.direccion,
    nroTel: req.user.nroTel, 
    img: req.user.img,
  });
}

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Hasta Luego.");
    res.redirect("/auth/signin");
  });
};
