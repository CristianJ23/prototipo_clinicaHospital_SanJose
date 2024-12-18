import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CredencialesModel from '../models/CredencialesModel.js';

const SECRET_KEY = 'clave_secreta'; // Asegúrate de que esta clave esté configurada correctamente.

export const ResetPassword = async (req, res) => {
    const { token } = req.body;  // Capturamos el token desde el cuerpo de la solicitud
    const { newPassword } = req.body;
    // console.log(req.body);

    // Validar que la nueva contraseña cumpla con los requisitos mínimos
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, SECRET_KEY);  // Verificamos el token recibido

        // Buscar el usuario por ID
        const user = await CredencialesModel.findOne({ where: { id_credencial: decoded.id } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashedPassword);
        // Actualizar la contraseña en la base de datos
        user.password = hashedPassword;

        const [updatedCredencial] = await CredencialesModel.update({ contrasena: hashedPassword }, { where: { id_credencial: decoded.id } });

        if (updatedCredencial === 0) {
            return res.status(404).json({ message: "no se realizaron cambios." });
        }

        res.json({ message: 'Contraseña restablecida con éxito' });

    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);

        // Diferenciar el error si el token es inválido
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

export default ResetPassword;
