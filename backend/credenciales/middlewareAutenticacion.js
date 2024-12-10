export const verificarAdministrador = (req, res, next) => {
    const { email, password } = req.body;  // Obtener correo del cuerpo de la solicitud
  
    // Ejemplo de validación de correo para restringir solo administradores
    if (!email || !email.includes('@utpl.com')) {
      return res.status(403).json({ mensaje: 'Acceso restringido: Solo administradores pueden iniciar sesión.' });
    }
  
    // Si pasa la validación, continuar con el siguiente middleware (login)
    next();
  };
  