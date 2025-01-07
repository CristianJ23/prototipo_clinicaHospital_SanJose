import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";

const buscarHistoriaPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log("Datos recibidos en el backend:", cedula);

        const persona = await PersonaModel.findOne({ where: { numero_documento: cedula } })

        if (!persona) {
            // Si no se encuentra la persona, devolver un mensaje 404
            console.log('No se encontró ninguna persona con esa cédula');
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const paciente = await PacienteModel.findOne({ where: { id_persona: persona.id_persona } });

        const historias = await HistoriaClinicaModel.findAll({ where: { id_paciente: paciente.id_paciente } });

        if (historias.length > 0) {
            res.json(historias);
        } else {
            console.log("No se encontró historias con esa cedula");
            res.status(404).json({ message: "Paciente no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
    }
}


export default buscarHistoriaPorCedula;