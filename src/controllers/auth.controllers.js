import passport from "passport";
import logger from '../helpers/logger.js'
import { registro, actualizarImg } from "../servicios/servAuth.js";

export const renderSignUpForm = (req, res, next) => res.render("auth/signup");

export const singup = async (req, res, next) => {
  try {
    let user = await registro(req)
    if(user == true){
      req.flash("success_msg", "Estas Registrado");
      logger.info("Usuario Registrado")
      res.redirect("/auth/signin"); 
    }else {
      let errors = user
      const { name, email, password, confirm_password, direccion, edad, cod_area, nro_tel } = req.body;
      res.render("auth/signup", {errors, name, email, password, confirm_password, direccion, edad, cod_area, nro_tel});
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
}  

export const renderSigninForm = (req, res,next) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/productos",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const uploadImg = async (req, res, next) => {
  try {
    let user = await actualizarImg(req)
    if (user == false) {
      logger.error('no se seleccion imagen')
      res.render("auth/perfil",{email: req.user.email, name: req.user.name, edad: req.user.edad, direccion: req.user.direccion, nroTel: req.user.nroTel, img: req.user.img, error:"debe seleccionar un archivo"}) 
    } else {
      res.render("auth/perfil", {email: user.email, name: user.name, edad: user.edad, direccion: user.direccion, nroTel: user.nroTel, img: user.img});
      logger.info('usuario ' + req.user.email + ' cambio su foto de perfil ')
    }
  } catch (error) {
    logger.error(error)
    next(error)
  }
}

export const perfil = async (req, res, next) => {
  res.render("auth/perfil", {email: req.user.email, name: req.user.name, edad: req.user.edad, direccion: req.user.direccion, nroTel: req.user.nroTel, img: req.user.img});
}

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Hasta Luego.");
    res.redirect("/auth/signin");
  });
};
