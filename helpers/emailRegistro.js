import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = await transport.sendMail({
        from: "Paw Manager - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Confirma tu cuenta en Paw Manager",
        text: "Confirma tu cuenta en Paw Manager",
        html: `<p>Hola ${nombre}, comprueba tu cuenta en Paw Manager.</p>
            <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a> </p>
            
            <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>`,
    });

    console.log("Mensaje enviado: %s", info.messageId);

}

export default emailRegistro;
