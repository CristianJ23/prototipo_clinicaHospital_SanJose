import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";
import TratamientoModel from "../models/TratamientoModel.js";

const borrar = async (req, res) => {
    try {
        const { id_historia } = req.params; // ID de la historia clínica que llega como parámetro

        // Buscar la historia clínica por id
        const historia = await HistoriaClinicaModel.findOne({ where: { id_historia } });

        if (!historia) {
            console.log("No se encontró una historia clínica con ese id");
            return res.status(404).json({ message: "Historia clínica no encontrada" });
        }

        // Obtener todos los planes de tratamiento relacionados con esa historia clínica
        const planTratamientos = await PlanTratamientoModel.findAll({ where: { id_historia } });

        if (planTratamientos.length === 0) {
            console.log("No se encontró un plan de tratamiento para esta historia clínica");
            return res.status(404).json({ message: "Plan de tratamiento no encontrado" });
        }

        // Obtener los tratamientos asociados a cada plan de tratamiento
        const tratamientos = [];
        for (const plan of planTratamientos) {
            // Cambiar la consulta a utilizar id_plan_tratamiento en lugar de id_historia
            const planTratamientoTratamientos = await TratamientoModel.findAll({ where: { id_plan_tratamiento: plan.id_plan_tratamiento } });
            if (planTratamientoTratamientos.length > 0) {
                tratamientos.push({ planTratamiento: plan, tratamientos: planTratamientoTratamientos });
            }
        }

        if (tratamientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron tratamientos para esta historia clínica" });
        }

        // Retornar los tratamientos para cada plan de tratamiento
        res.json(tratamientos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar los tratamientos", error: error.message });
    }
};

export default borrar;
