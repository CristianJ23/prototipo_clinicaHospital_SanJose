import CredencialesModel from "../models/CredencialesModel.js";
import PersonaModel from "../models/PersonaModel.js";

//funcion  par encontrar la credencial por la cedula
const bucarCedencialPorCedula = async (req, res) => {
    try {
        const { numero_documento } = req.params;
        console.log(numero_documento);

        const persona = await PersonaModel.findOne({ where: { numero_documento } });

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
            console.log(credencial.id_credencial);
            res.json({
                id_credencial: credencial.id_credencial, 
                correo_electronico: credencial.correo_electronico, 
                rol: credencial.rol,
                estado: credencial.estado,
            });
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