import users from '../daos/DaosAuth.js';
import logger from '../helpers/logger.js'
import { adminConf } from "../config/config.js";
import transporter from '../helpers/transportMail.js'

export const registro = async (req) => {
    try {
      let errors = [];
      const { name, email, password, confirm_password, direccion, edad, cod_pais,cod_area, nro_tel } = req.body;
      if (password !== confirm_password)errors.push({ text: "Passwords no coinciden." });
      if (password.length < 4) errors.push({ text: "Passwords deben tener como minimo 4 caracteres." })  
      if (!direccion) errors.push({ text: "Falta el campo Direccion." })
      if (!edad) errors.push({ text: "Falta el campo Edad." })
      if (!cod_area) errors.push({ text: "Falta el codigo de ciudad." })
      if (!nro_tel) errors.push({ text: "Falta el numero de telefono." })
      
      const userFound = await users.find(email);
      if (userFound) errors.push({ text: "El email ya esta en uso." })
      if (errors.length > 0) return errors

      let nroTel = cod_area + nro_tel

      let userNew = { name: name, email: email, password: password, direccion: direccion, edad: edad, nroTel: nroTel}

      await users.save(userNew)
  
      const mailOption = {
        from:'Servidor Node js',
        to: adminConf.email,
        subject: 'Nuevo Registro',
        text: 'nuevo usuario:\n nombre: ' + name + '\n email: ' + email + '\n direccion: ' + direccion + '\n edad: ' + edad + '\n numero de telefono: ' + nroTel,
      }
  
      const info = await transporter.sendMail(mailOption)
  
      return true   
    } catch (error) {
      logger.error(error)
      return error
    }
  };

  export const actualizarImg = async (req) => {
    const file = req.file
      if (!file) {
        return false        
      }
      try {
        await users.updateImg(req)
        return await users.findById(req.user.id)
      } catch (error) {
        logger.error(error)
        return error
      }
  }