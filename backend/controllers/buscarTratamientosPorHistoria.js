import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";
import TratamientoModel from "../models/TratamientoModel.js";

const buscarTratamientosPorHistoria = async (req, res) => {
    try {
        const { ID } = req.params;
        
        // Obtener la historia clínica
        const historia = await HistoriaClinicaModel.findOne({ where: { id_historia: ID } });

        if (!historia) {
            console.log("No se encontró una historia clínica para el paciente");
            return res.status(404).json({ message: "Historia clínica no encontrada" });
        }

        // Obtener los planes de tratamiento relacionados con esta historia clínica
        const planTratamientos = await PlanTratamientoModel.findAll({ where: { id_historia: historia.id_historia } });

        if (planTratamientos.length === 0) {
            console.log("No se encontró un plan de tratamiento para la historia clínica");
            return res.status(404).json({ message: "Plan de tratamiento no encontrado" });
        }

        // Obtener los tratamientos relacionados con cada plan de tratamiento
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

        // Devuelve tanto la historia clínica como los planes de tratamiento con sus tratamientos
        res.json({
            historia,        // Incluye la historia clínica
            tratamientos     // Incluye los tratamientos asociados
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
    }
};

export default buscarTratamientosPorHistoria;

