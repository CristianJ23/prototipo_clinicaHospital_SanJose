import { crearCredencialesAll } from "../credenciales/createCredencialesAll.js"
import PersonaModel from "../models/PersonaModel.js";
import CredencialModel from "../models/CredencialesModel.js";
import MedicoModel from "../models/MedicoModel.js";
import AreaModel from "../models/AreaModel.js";
import EnfermeraModel from "../models/EnfermeraModel.js";
import EspecialidadModel from "../models/EspecialidadModel.js";
import TratanteModel from "../models/TratanteModel.js";

//funcion para crear una rol si no existe una persona
const CreateRolNoPrimeraVez = async (req, res) => {
    try {
        const persona = req.body;

        console.log("datos de payload", persona);


        const id_persona = persona.id_persona; // O el campo que contenga el ID de la persona
        const correo = persona.email;
        const contrasena = persona.password; // Contraseña proporcionada en el body de la solicitud
        const rol = persona.role;
        const area = persona.area || "";
        const especialidad = persona.especialidad  || "";

        console.log(id_persona)
        console.log(correo)
        console.log(contrasena)

        const credencial = await CredencialModel.findOne({
            where: {
                id_persona: id_persona,
            }
        })

        const newArea = await AreaModel.findOne({
            where: {
                nombre_area: area
            }
        })

        const newEspecialidad = await EspecialidadModel.findOne({
            where: {
                nombre_especialidad: especialidad
            }
        })

        /**añadir los datos a las tablas medicos y enfermeras si existen especialidades */
        if (rol == "medico" || rol == "enfermera" || rol == "tratante") {
            if (rol === "medico") {
                await MedicoModel.create({
                    id_persona: id_persona,
                    id_area: newArea.id_area,
                    id_especialidad: newEspecialidad.id_especialidad,
                });
            } else if (rol === "enfermera") {
                await EnfermeraModel.create({
                    id_persona: id_persona,
                    id_area: newArea.id_area,
                    id_especialidad: newEspecialidad.id_especialidad,
                });
            } else if (rol === "tratante") {
                await TratanteModel.create({
                    id_persona: id_persona,
                });
            }


            // console.log("correo: " + credencial.correo_electronico);

            if (!credencial) {
                crearCredencialesAll(id_persona, correo, contrasena, rol);
            } else {
                console.log("El usuario ya tiene un rol asignado");
                return res.status(409).json({
                    error: "La persona ya tiene un rol asignado.",
                })
            };


            res.status(200).json({
                message: "Datos recibidos correctamente",
                // data: pacienteData,
            });
        }

    } catch (error) {
        console.error("Error al recibir los datos:", error);
        res.status(500).json({ error: "Error al procesar los datos" });
    }
}

export default CreateRolNoPrimeraVez;