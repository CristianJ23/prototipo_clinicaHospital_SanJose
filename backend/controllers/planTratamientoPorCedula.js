import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";
import TratamientoModel from "../models/TratamientoModel.js";

const planTratamientoPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;

        const persona = await PersonaModel.findOne({ where: { numero_documento: cedula } });

        if (!persona) {
            // If the person is not found, return a 404 message
            console.log('No se encontró ninguna persona con esa cédula');
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const id_persona = persona.id_persona;

        // Find the patient associated with that person
        const paciente = await PacienteModel.findOne({ where: { id_persona } });

        if (!paciente) {
            console.log("No se encontró un paciente con ese id de persona");
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        const historia = await HistoriaClinicaModel.findOne({ where: { id_paciente: paciente.id_paciente } });

        if (!historia) {
            console.log("No se encontró una historia clínica para el paciente");
            return res.status(404).json({ message: "Historia clínica no encontrada" });
        }

        // Fetch all treatment plans related to this clinical history
        const planTratamientos = await PlanTratamientoModel.findAll({ where: { id_historia: historia.id_historia } });

        if (planTratamientos.length === 0) {
            console.log("No se encontró un plan de tratamiento para la historia clínica");
            return res.status(404).json({ message: "Plan de tratamiento no encontrado" });
        }

        // For each treatment plan, fetch the treatments
        const tratamientos = [];
        for (const plan of planTratamientos) {
            const planTratamientoTratamientos = await TratamientoModel.findAll({ where: { id_plan_tratamiento: plan.id_plan_tratamiento } });
            if (planTratamientoTratamientos.length > 0) {
                tratamientos.push({ planTratamiento: plan, tratamientos: planTratamientoTratamientos });
            }
        }
        

        if (tratamientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron tratamientos para este paciente" });
        }

        // Return the list of treatments for each treatment plan
        res.json(tratamientos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
    }
};

export default planTratamientoPorCedula;
