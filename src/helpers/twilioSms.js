import twilio from 'twilio'
import { twilioConf } from '../config/config.js'

const client = twilio(twilioConf.SSID,twilioConf.token)

export default client