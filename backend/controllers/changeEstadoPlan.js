import PlanTratamientoModel from "../models/PlanTratamientoModel.js";

const changeEstadoPlan = async (req, res) => {
    try {
        // Obtener el ID del plan de tratamiento desde los parámetros de la solicitud
        const { id_plan_tratamiento } = req.params;

        // Obtener el nuevo estado desde el cuerpo de la solicitud
        const { estado } = req.body;

        // Validar si el estado es 'ACTIVO' o 'INACTIVO'
        if (estado !== 'ACTIVO' && estado !== 'INACTIVO') {
            return res.status(400).json({ message: "El estado debe ser 'ACTIVO' o 'INACTIVO'" });
        }

        // Buscar el plan de tratamiento por su ID
        const planTratamiento = await PlanTratamientoModel.findByPk(id_plan_tratamiento);

        if (!planTratamiento) {
            return res.status(404).json({ message: "Plan de tratamiento no encontrado" });
        }

        // Actualizar el estado del plan de tratamiento
        planTratamiento.estado = estado;
        await planTratamiento.save();

        // Responder con un mensaje de éxito
        res.status(200).json({ message: `Estado del plan de tratamiento cambiado a ${estado}`, plan: planTratamiento });
    } catch (e) {
        console.error("Error al cambiar el estado del plan:", e);
        res.status(500).json({ message: "Error al cambiar el estado del plan", error: e.message });
    }
}

export default changeEstadoPlan;
