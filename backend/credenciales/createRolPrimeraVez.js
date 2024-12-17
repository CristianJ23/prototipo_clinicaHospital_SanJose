import db from "../database/db.js";
import CredencialesModel from "../models/CredencialesModel.js";
import PersonaModel from "../models/PersonaModel.js";
import router from "../routes/routes.js";
import { crearCredencialesAll } from "../credenciales/createCredencialesAll.js"

//funcion para crear una rol si no existe una persona
const CreateRolPrimeraVez = async (req, res) => {
    try {
        const persona = req.body;
        console.log("persona:", persona.nombres)

        const personaCreada = await PersonaModel.create({
            primer_apellido: persona.primer_apellido,
            segundo_apellido: persona.segundo_apellido,
            primer_nombre: persona.primer_nombre,
            segundo_nombre: persona.segundo_nombre,
            tipo_documento: persona.tipo_documento,
            numero_documento: persona.numero_documento,
            estado_civil: persona.estado_civil,
            sexo: persona.sexo === "masculino" ? 'M' : 'F',
            celular: persona.celular,
            correo_electronico: persona.correo_electronico,
            fecha_nacimiento: persona.fecha_nacimiento,
            lugar_nacimiento: persona.lugar_nacimiento,
            nacionalidad: persona.nacionalidad,
        });


        console.log("Persona creada:", personaCreada); // Verifica si personaCreada tiene un id válido
        console.log("Persona creada con ID:", personaCreada.id_persona); // Asegúrate de que el ID es válido

        const idPersona = personaCreada.id_persona; // O el campo que contenga el ID de la persona
        const correo = persona.correo_electronico;
        const contrasena = persona.contrasena; // Contraseña proporcionada en el body de la solicitud
        let rol = "";
        if (persona.rol === "administrador") {
            rol = "1"
        }else if(persona.rol === "medico"){
            rol = "2"
        }else if(persona.rol === "enfermera"){
            rol = "3"
        }else if(persona.rol === "tratante"){
            rol = "4"
        }

        crearCredencialesAll(idPersona, correo, contrasena, rol);

        res.status(200).json({
            message: "Datos recibidos correctamente",
            // data: persona,
        });

    } catch (error) {
        console.error("Error al recibir los datos:", error);
        res.status(500).json({ error: "Error al procesar los datos" });
    }
}

export default CreateRolPrimeraVez;