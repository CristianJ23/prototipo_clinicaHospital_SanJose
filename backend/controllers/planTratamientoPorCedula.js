import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";
import TratamientoModel from "../models/TratamientoModel.js";

const planTratamientoPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;

        // Buscar persona por cédula
        const persona = await PersonaModel.findOne({ where: { numero_documento: cedula } });

        if (!persona) {
            console.log('No se encontró ninguna persona con esa cédula');
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const id_persona = persona.id_persona;

        // Buscar paciente asociado a la persona
        const paciente = await PacienteModel.findOne({ where: { id_persona } });

        if (!paciente) {
            console.log("No se encontró un paciente con ese id de persona");
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Buscar historia clínica asociada al paciente
        const historia = await HistoriaClinicaModel.findOne({ where: { id_paciente: paciente.id_paciente } });

        if (!historia) {
            console.log("No se encontró una historia clínica para el paciente");
            return res.status(404).json({ message: "Historia clínica no encontrada" });
        }

        // Filtrar planes de tratamiento que están en estado ACTIVO
        const planTratamientos = await PlanTratamientoModel.findAll({
            where: {
                id_historia: historia.id_historia,
                estado: "ACTIVO", // Filtro adicional
            },
        });

        if (planTratamientos.length === 0) {
            console.log("No se encontró un plan de tratamiento activo para la historia clínica");
            return res.status(404).json({ message: "No se encontraron planes de tratamiento activos" });
        }

        // Obtener tratamientos relacionados con cada plan de tratamiento activo
        const tratamientos = [];
        for (const plan of planTratamientos) {
            const planTratamientoTratamientos = await TratamientoModel.findAll({
                where: { id_plan_tratamiento: plan.id_plan_tratamiento },
            });
            if (planTratamientoTratamientos.length > 0) {
                tratamientos.push({ planTratamiento: plan, tratamientos: planTratamientoTratamientos });
            }
        }

        if (tratamientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron tratamientos para los planes de tratamiento activos" });
        }

        // Retornar los tratamientos junto con sus planes
        res.json(tratamientos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
    }
};

export default planTratamientoPorCedula;
