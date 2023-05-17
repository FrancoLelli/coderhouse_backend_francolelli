import twilio from 'twilio'
import {options} from './options.js'

//credenciales
const twilioAccount = options.twilio.twilioId
const twilioToken = options.twilio.twilioToken

//twlio Phone
export const twilioPhone = options.twilio.twilioPhone

export const twilioClient = twilio(twilioAccount, twilioToken)