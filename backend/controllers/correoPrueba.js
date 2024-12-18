import 'dotenv/config'; // Importa las variables de entorno
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "6d08ed97a2467a",
      pass: "468d972e7ddd9f"
    }
  });

const mailOptions = {
    from: 'tu_correo@ejemplo.com',
    to: 'usuario@ejemplo.com',
    subject: 'Prueba de Mailtrap',
    text: 'Este es un correo de prueba enviado con Mailtrap.',
    html: '<p>Este es un <strong>correo de prueba</strong> enviado con Mailtrap.</p>',
};

async function sendTestEmail() {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito:', info.messageId);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

sendTestEmail();
