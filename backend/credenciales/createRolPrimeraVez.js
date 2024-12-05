import db from "../database/db.js";
import CredencialesModel from "../models/CredencialesModel.js";
import PersonaModel from "../models/PersonaModel.js";
import router from "../routes/routes.js";
import {crearCredencialesAll} from "../credenciales/createCredencialesAll.js"

//funcion para crear una rol si no existe una persona
const CreateRolPrimeraVez = async (req, res) => {
    try {
        const persona = req.body;
        console.log("persona:", persona.nombres)

        const personaCreada = await PersonaModel.create({
            nombres: persona.nombres,
            apellidos: persona.apellidos,
            cedula: persona.cedula,
            celular: persona.celular,
            sexo: persona.sexo,
            fecha_nacimiento: persona.fecha_nacimiento,
            correo_electronico: persona.correo_electronico,
            edad: persona.edad,
        });


        console.log("Persona creada:", personaCreada); // Verifica si personaCreada tiene un id válido
        console.log("Persona creada con ID:", personaCreada.id_persona); // Asegúrate de que el ID es válido

        const idPersona = personaCreada.id_persona; // O el campo que contenga el ID de la persona
        const correo = persona.correo_electronico;
        const contrasena = persona.contrasena; // Contraseña proporcionada en el body de la solicitud
        const rol = persona.rol;

        crearCredencialesAll(idPersona, correo, contrasena, rol);

        res.status(200).json({
            message: "Datos recibidos correctamente",
            // data: pacienteData,
        });

    } catch (error) {
        console.error("Error al recibir los datos:", error);
        res.status(500).json({ error: "Error al procesar los datos" });
    }
}

export default CreateRolPrimeraVez;