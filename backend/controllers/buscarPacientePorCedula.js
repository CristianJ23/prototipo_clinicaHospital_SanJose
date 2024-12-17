import { AssociationError } from "sequelize";
import PacienteModel from "../models/PacienteModel.js";


//funcion para buscar un paciente por su numero de cedula
const buscarPeacientePoCedula = async (rep, res) => {
    try {
        const { cedula } = req.params;

        console.log(cedula);

        const persona = await PersonaModel.findOne({ where: { cedula } });

        if (!persona) {
            // Si no se encuentra la persona, devolver un mensaje 404
            console.log('No se encontró ninguna persona con esa cédula');
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const persona_id = persona.persona_id;

        const paciente = await PacienteModel.findOne({ where: { persona_id } });


        // opcion para devolver solo algunos datos
        // const paciente = await PacienteModel.findOne({
        //     where: { persona_id },
        //     attributes: ["paciente_id", "tipo_bono", "seguro_salud", "direccion"], // Ejemplo
        // });

        if (paciente) {
            res.json(
                paciente
            )
        }else{
            console.log("no se encontro un paciente con ese id de person");
            res.status(404).json({ message:"paciente no encontrado"})
        }

    } catch(error) { 
        console.error(error);
        res.status(500).json({ message:"error al buscar el paciente", error: error.message})
    }
}

export default buscarPeacientePoCedula;