import { Op } from "sequelize"; // Importa Op
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";
import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";

const CrearPlanTratamiento = async (req, res) => {
    try {
        const { id_historia, fecha_inicio } = req.body;

        // Obtener el id_paciente usando el id_historia
        const historia = await HistoriaClinicaModel.findOne({
            where: { id_historia },
            attributes: ['id_paciente'], // Solo necesitamos el id_paciente
        });

        if (!historia) {
            return res.status(404).json({ message: "Historia clínica no encontrada" });
        }

        const { id_paciente } = historia;

        // Crear el nuevo plan de tratamiento
        const newPlan = await PlanTratamientoModel.create({
            id_historia,
            fecha_inicio,
            estado: 'ACTIVO',
        });

        // Obtener todas las historias clínicas del mismo paciente
        const historiasPaciente = await HistoriaClinicaModel.findAll({
            where: { id_paciente },
            attributes: ['id_historia'],
        });

        // Extraer los IDs de las historias
        const idsHistoriasPaciente = historiasPaciente.map(h => h.id_historia);

        // Actualizar los planes de tratamiento de las historias del paciente (excepto el nuevo plan)
        await PlanTratamientoModel.update(
            {
                estado: "TERMINADO",
                fecha_fin: new Date(),
            },
            {
                where: {
                    id_historia: idsHistoriasPaciente, // Historias del paciente
                    id_plan_tratamiento: { [Op.ne]: newPlan.id_plan_tratamiento }, // Excluir el nuevo plan
                },
            }
        );

        res.status(201).json({ id_plan_tratamiento: newPlan.id_plan_tratamiento });
    } catch (error) {
        console.error("Error al crear el plan de tratamiento:", error);
        res.status(500).json({ message: "Error al crear el plan de tratamiento", error: error.message });
    }
};

export default CrearPlanTratamiento;
