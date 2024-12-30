import bcrypt from 'bcrypt';
import db from '../database/db.js'; // Asegúrate de importar correctamente la configuración de Sequelize

// Función para encriptar la contraseña
async function encriptarContrasena(contrasena) {
  try {
    const saltRounds = 10;
    console.log("Iniciando la encriptación...");
    const passwordHash = await bcrypt.hash(contrasena, saltRounds);
    console.log("Contraseña encriptada:", passwordHash);
    return passwordHash;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw error;
  }
}

// Función para insertar un administrador en la base de datos
export async function crearAdministrador(idPersona, correo, contrasena) {
  try {
    // Encriptar la contraseña
    const contrasenaEncriptada = await encriptarContrasena(contrasena);

    // Crear la consulta SQL para insertar el administrador en la tabla Credenciales
    const query = `
      INSERT INTO Credenciales (id_persona, correo_electronico, contrasena, rol)
      VALUES (?, ?, ?, '1')`;  // '1' para el rol de administrador

    console.log("Ejecutando consulta con los valores:", [idPersona, correo, contrasenaEncriptada]);

    // Ejecutar la consulta para insertar l administrador utilizando Sequelize
    const [results] = await db.query(query, {
      replacements: [idPersona, correo, contrasenaEncriptada], // Reemplazar los valores en el query
      type: db.QueryTypes.INSERT // Asegurarte de que se trata de una inserción
    });
    console.log(`Administrador creado con ID de credencial: ${results.insertId}`);
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
}

// Verifica la conexión antes de realizar cualquier operación
async function verificarConexion() {
  try {
    await db.authenticate(); // Verifica que la conexión a la base de datos esté activa
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1); // Si no se puede conectar, termina el proceso
  }
}

// Tomar los argumentos de la línea de comandos
// const args = process.argv.slice(2);
// console.log("Argumentos recibidos:", args);

// // Verificar que se hayan proporcionado todos los argumentos necesarios
// if (args.length < 3) {
//   console.log('Por favor, ingresa el ID de la persona, el correo y la contraseña como argumentos.');
//   process.exit(1);
// }

// const idPersona = args[0];    // ID de la persona
// const correo = args[1];       // Correo electrónico del administrador
// const contrasena = args[2];   // Contraseña en texto plano


const idPersona = "1";   
const correo = "kriss@utpl.com";
const contrasena = "123";

// Verificar la conexión a la base de datos y luego crear el administrador
verificarConexion()
  .then(() => crearAdministrador(idPersona, correo, contrasena))
  .catch((error) => console.error('Error en la conexión:', error));
