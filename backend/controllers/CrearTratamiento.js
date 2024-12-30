import axios from "axios";
import TratamientoModel from "../models/TratamientoModel.js";

const CrearTratamiento = async (req, res) => {
    try {
        const tratamiento = req.body;  // Obtener los datos del cuerpo de la solicitud
        console.log(tratamiento);

        const newTratamiento = await TratamientoModel.create(tratamiento);

        console.log("id del tratamiento: ", newTratamiento.id_tratamiento);
        
        /**envio de la respuesta a el front con el id del tratamiento */
        res.status(201).json({ id: newTratamiento.id_tratamiento });


    } catch (e) {
        console.error("Error al crear tratamiento:", e);
        res.status(500).json({ message: "Error al crear tratamiento", error: e.message });
    }
}

export default CrearTratamiento;