import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import TratamientoModel from "../models/TratamientoModel.js"

const buscarTratamientosPorHistoria = async (req, res) => {
    try {
        const { historia } = req.params;
        console.log(historia)

        const uniqueHistoria = await HistoriaClinicaModel.findOne({ where: { id_historia: historia } })
        const tratamientos = await TratamientoModel.findAll({ where: { id_historia: historia } });

        if (tratamientos.length > 0) {
            // Respond with both the HistoriaClinica and Tratamientos in a single object
            res.json({
                historia: uniqueHistoria,
                tratamientos: tratamientos,
            });
        } else {
            console.log("No se encontró taratamientos para el paciente");
            res.status(404).json({ message: "Paciente no encontrado" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar los tratamientos", error: error.message });
    }
}

export default buscarTratamientosPorHistoria;