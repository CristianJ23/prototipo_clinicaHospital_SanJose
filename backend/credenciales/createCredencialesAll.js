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
export async function crearCredencialesAll(idPersona, correo, contrasena, rol) {
    try {
        function changeRol(){
            switch (rol) {
                case "admin":
                    return 1;
                case "medico":
                    return 2;
                case "enfermera":
                    return 3;
                case "tratante":
                    return 4;
                default:
                    return 0;
            }
        }

        const newRol = changeRol();

        // Encriptar la contraseña
        const contrasenaEncriptada = await encriptarContrasena(contrasena);

        // Crear la consulta SQL para insertar el administrador en la tabla Credenciales
        const query = `
      INSERT INTO Credenciales (id_persona, correo_electronico, contrasena, rol)
      VALUES (?, ?, ?, ?)`;

        console.log("Ejecutando consulta con los valores:", [idPersona, correo, contrasenaEncriptada, newRol]);

        // Ejecutar la consulta para insertar el administrador utilizando Sequelize
        const [results] = await db.query(query, {
            replacements: [idPersona, correo, contrasenaEncriptada, newRol], // Reemplazar los valores en el query
            type: db.QueryTypes.INSERT // Asegurarte de que se trata de una inserción
        });
        console.log(`rol creado con ID de credencial: ${results.insertId}`);
    } catch (error) {
        console.error('Error al crear el rol:', error);
    }

}