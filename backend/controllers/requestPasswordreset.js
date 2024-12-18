import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import CredencialesModel from '../models/CredencialesModel.js';

const SECRET_KEY = 'clave_secreta';
const RESET_TOKEN_EXPIRATION = '1h';

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        console.log(email);
        // Buscar el usuario por correo
        const user = await CredencialesModel.findOne({ where: { correo_electronico: email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        console.log(user.id_credencial);

        // Generar un token de recuperación
        const token = jwt.sign({ id: user.id_credencial }, SECRET_KEY, { expiresIn: RESET_TOKEN_EXPIRATION });

        // Crear el enlace con el token de recuperación
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Configurar el transporte de correo
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "6d08ed97a2467a",
                pass: "468d972e7ddd9f"
            }
        });

        // Configuración del correo
        const mailOptions = {
            from: 'no-reply@tuapp.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                   <a href="${resetLink}">Restablecer Contraseña</a>`,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};
