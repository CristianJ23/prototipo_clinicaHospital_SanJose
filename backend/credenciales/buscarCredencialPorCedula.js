import CredencialesModel from "../models/CredencialesModel.js";
import PersonaModel from "../models/PersonaModel.js";

//funcion  par encontrar la credencial por la cedula
const bucarCedencialPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log(cedula);

        const persona = await PersonaModel.findOne({ where: { cedula } });

        if (!persona) {
            // Si no se encuentra la persona, devolver un mensaje 404
            console.log('No se encontró ninguna persona con esa cédula');
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const credencial = await CredencialesModel.findOne({
            where: { id_persona: persona.id_persona },
        });

        // if (!credencial) {
        //     // Si no se encuentra la persona, devolver un mensaje 404
        //     console.log('No se encontró ninguna credencial con ese id_persona');
        //     return res.status(404).json({ message: 'credencial no encontrada' });
        // }


        // console.log("credencial encontrada: ", credencial.id_credencial)

        if (credencial) {
            res.json({
                id_credencial: credencial.id_credencial, 
                correo_electronico: credencial.correo_electronico, 
                rol: credencial.rol});
        } else {
            console.log('No se encontró ninguna credencial con esa cédula');
            res.status(404).json({ message: 'credencial no encontrada' });
        }

    } catch (error) {
        console.error('Error al buscar cédula:', error);
        res.status(500).json({ message: 'Error al buscar cédula', error: error.message });
    }

}

export default bucarCedencialPorCedula;