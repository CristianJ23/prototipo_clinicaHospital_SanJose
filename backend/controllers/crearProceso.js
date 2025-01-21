import ProcesoModel from "../models/ProcesoModel.js";

const CrearProceso = async (req, res) => {
    try {
        const id_enfermera = req.session.person?.id_persona || 1; // Usar ID 1 si no se detecta el ID de la enfermera
        const procesos = req.body; // Datos enviados desde el frontend (array de procesos)

        if (!Array.isArray(procesos) || procesos.length === 0) {
            return res.status(400).json({ message: "El cuerpo de la solicitud debe ser un array de procesos." });
        }

        // Insertar todos los procesos en la base de datos
        const resultados = [];
        for (const input of procesos) {
            const procesoData = {
                id_plan_tratamiento: input.id_plan_tratamiento,
                id_enfermera: id_enfermera,
                fecha_proceso: input.fecha_proceso,
                hora_proceso: input.hora_proceso,
                medicamento: input.medicamento,
                metodo_suministracion: input.metodo_suministracion,
                observacion: input.observacion || "", // Campo opcional
            };

            const nuevoProceso = await ProcesoModel.create(procesoData);
            resultados.push({
                id_proceso: nuevoProceso.id_proceso,
            });
        }

        res.status(200).json({
            message: "Procesos creados correctamente.",
            resultados,
        });
    } catch (e) {
        console.error("Error al crear los procesos", e);
        res.status(500).json({
            message: "Error al crear los procesos.",
            error: e.message,
        });
    }
};

export default CrearProceso;
