import nodemailer from "nodemailer";
import { options } from "./options.js";

//Credenciales
const adminEmail = options.gmail.adminEmail;
const adminPass = options.gmail.adminPass;

//configuracion
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: adminEmail,
        pass: adminPass
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
})

export default transporter;