import PlanTratamientoModel from "../models/PlanTratamientoModel.js";

const CrearPlanTratamiento = async (req, res) => {
    try {
        const planTratamiento = req.body;  // Obtener los datos del cuerpo de la solicitud
        console.log(planTratamiento);

        // Crear el nuevo plan de tratamiento
        const newPlan = await PlanTratamientoModel.create(planTratamiento);

        console.log("id del plan de tratamiento: ", newPlan.id_plan_tratamiento);
        
        // Enviar la respuesta al front con el id del plan de tratamiento
        res.status(201).json({ id_plan_tratamiento: newPlan.id_plan_tratamiento });

    } catch (e) {
        console.error("Error al crear plan de tratamiento:", e);
        res.status(500).json({ message: "Error al crear plan de tratamiento", error: e.message });
    }
}

export default CrearPlanTratamiento;
