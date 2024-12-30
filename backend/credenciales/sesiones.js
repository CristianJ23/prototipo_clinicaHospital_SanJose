import bcrypt from 'bcrypt';
import db from '../database/db.js';  // Conexión a la base de datos
import HistoriaClinicaModel from '../models/HistoriaClinicaModel.js';
import MedicoModel from '../models/MedicoModel.js';
import EnfermeraModel from '../models/EnfermeraModel.js';
import TratanteModel from '../models/TratanteModel.js';
import PersonaModel from '../models/PersonaModel.js';



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
    console.log('rol', credencial.rol)

    /*verificar si el rol tiene es estado activo para permitir el ingreso */
    if (credencial.estado == "inactivo") {
      console.log("rol inactivo");
      return res.status(409).json({ mensaje: 'rol inactivo' });
    }



    // Comparar la contraseña ingresada con la contraseña encriptada
    const esValida = await bcrypt.compare(password, credencial.contrasena);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Mapeo de roles
    const rolesPermitidos = {
      '1': 'admin',
      '2': 'medico',
      '3': 'enfermera',
      '4': 'tratante',
    };

    // console.log("credencial para verificar: " ,credencial.rol);
    const rolNombre = rolesPermitidos[credencial.rol];
    // console.log("verificar el nombre: " ,rolNombre);

    // Validar si el usuario tiene el rol 
    if (!rolNombre) {
      return res.status(403).json({ mensaje: 'Acceso denegado: Rol no permitido' });
    }

    async function buscarMedico() {
      const medico = await MedicoModel.findOne({ where: { id_persona: credencial.id_persona } });
      return medico;
    }

    async function buscarEnfermera() {
      const enfermera = await EnfermeraModel.findOne({ where: { id_persona: credencial.id_persona } });
      return enfermera;
    }

    async function buscarTratante() {
      const tratante = await TratanteModel.findOne({ where: { id_persona: credencial.id_persona } });
      return tratante;
    }

    async function buscarAdmin(){
      const admin = await PersonaModel.findOne({ where:{id_persona: credencial.id_persona}})
      return admin;
    }


    async function buscarRolEnTablas(rolNombre, idPersona) {
      switch (rolNombre) {
        case "medico":
          return await buscarMedico(idPersona);
        case "enfermera":
          return await buscarEnfermera(idPersona);
        case "tratante":
          return await buscarTratante(idPersona);
          case "admin":
            return await buscarAdmin(idPersona);
        default:
          console.log("No hay coincidencias con los roles");
          return null;
      }
    }

    const rol = await buscarRolEnTablas(rolNombre, credencial.id_persona);



    // Guardar el ID de la credencial en la sesión
    req.session.usuarioId = credencial.id_credencial;
    req.session.email = credencial.email_electronico;
    req.session.rol = credencial.rol;
    req.session.person = rol;
    
    // console.log(req.session.person);

    // console.log('rol', rolNombre)


    // Devolver el rol en la respuesta si todo está bien
    return res.status(200).json({
      success: true,
      role: rolNombre,
      // role: credencial.rol,  // Enviamos el rol como parte de la respuesta
      mensaje: 'Inicio de sesión exitoso',
    });
  } catch (error) {
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
