import client from './twilioSms.js'
import { twilioConf,adminConf } from "../config/config.js";
import transporter from './transportMail.js'
import logger from './logger.js'

export const envioMailSmsWsp = async (req) => {
    const mailOption = {
        from:'Servidor Node js',
        to: adminConf.email,
        subject: 'Nueva Compra de: ' + req.user.name + ' email: ' + req.user.email,
        text: 'Nueva compra: ' + '\n Usuario: ' + req.user.email + '\n Producto: ' + req.body.nombre + '\n Precio: ' + req.body.precio + '\n Cantidad: ' + req.body.cantidad,
    }
    let toSms = '+54' + req.user.nroTel
    const SMSoptions = {
        body: 'Su pedido fue recibido y se encuentra en proceso',
        from: twilioConf.nroSms,
        to: toSms
    }
    
    let sandBox = 'whatsapp:' + twilioConf.nroSandbox
    let toWsp = 'whatsapp:+549' + adminConf.nroTel
    const WSPoptions = {
        body: 'Nueva compra: ' + '\n Usuario: ' + req.user.email + '\n Producto: ' + req.body.nombre + '\n Precio: ' + req.body.precio + '\n Cantidad: ' + req.body.cantidad,
        from: sandBox,
        to: toWsp
    }
    
    const info = await transporter.sendMail(mailOption)
    
    const message = await client.messages.create(SMSoptions)
    
    const wspMessage = await client.messages.create(WSPoptions)
    
    logger.info(info)
    logger.info(message)
    logger.info(wspMessage)  
}
