import nodemailer from 'nodemailer'
import {adminConf} from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: adminConf.email,
        pass: 'fprzxddcpjryrgrk'
    }
})

export default transporter