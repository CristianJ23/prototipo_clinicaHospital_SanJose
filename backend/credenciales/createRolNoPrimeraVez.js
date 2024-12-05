import {crearCredencialesAll} from "../credenciales/createCredencialesAll.js"

//funcion para crear una rol si no existe una persona
const CreateRolNoPrimeraVez = async (req, res) => {
    try {
        const persona = req.body;


        const idPersona = persona.id_persona; // O el campo que contenga el ID de la persona
        const correo = persona.email;
        const contrasena = persona.password; // Contraseña proporcionada en el body de la solicitud
        const rol = persona.role;

        console.log(persona.idPersona)
        console.log(correo)
        console.log(contrasena)

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

export default CreateRolNoPrimeraVez;