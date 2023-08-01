import nodemailer from "nodemailer";

import { config } from "../config/config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: config.email.account,
        pass: config.email.password
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

export const sendRecoveryPassword = async(userMail, token) => {

    const PORT = config.server.port;

    const resetLink = `http://localhost:${PORT}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: config.email.account,
        to: userMail,
        subject: "Reset Password",
        html: `
        <div>
        <h1>Has solicitado reestablecer la constraseña</h1>
        <p>Has click <a href="${resetLink}">AQUI</a> para setear una contraseña nueva.</p>
        </div>
        `
    });

};