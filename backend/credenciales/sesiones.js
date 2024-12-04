import bcrypt from 'bcrypt';
import db from '../database/db.js';  // Conexión a la base de datos



// Lógica para el inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;  // Recibimos email y contraseña

  console.log('email recibido:', email);  // Verifica que el email esté llegando correctamente

  try {
    // Buscar la credencial en la base de datos
    const query = `SELECT * FROM Credenciales WHERE correo_electronico = ?`;
    const [resultados] = await db.query(query, { replacements: [email] });

    if (resultados.length === 0) {
      return res.status(401).json({ mensaje: 'email no encontrado' });
    }

    const credencial = resultados[0];  // Tomamos el primer resultado

    console.log('Contraseña del usuario:', password);

    console.log('Contraseña almacenada:', credencial.contrasena);


    // Comparar la contraseña ingresada con la contraseña encriptada
    const esValida = await bcrypt.compare(password, credencial.contrasena);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Validar si el usuario tiene el rol de administrador
    if (credencial.rol !== '1') {
      return res.status(403).json({ mensaje: 'Acceso denegado: No es un administrador' });
    }

    // Guardar el ID de la credencial en la sesión
    req.session.usuarioId = credencial.id_credencial;
    req.session.email = credencial.email_electronico;
    req.session.rol = credencial.rol;

    // Devolver el rol en la respuesta si todo está bien
    return res.status(200).json({
      success: true,
      role: credencial.rol,  // Enviamos el rol como parte de la respuesta
      mensaje: 'Inicio de sesión exitoso',
    });  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Lógica para cerrar sesión
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    }
    res.status(200).json({ mensaje: 'Sesión cerrada con éxito' });
  });
};
