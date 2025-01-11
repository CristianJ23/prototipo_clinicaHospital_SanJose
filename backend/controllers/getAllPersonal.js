import { where } from "sequelize";
import EnfermeraModel from "../models/EnfermeraModel.js";
import MedicoModel from "../models/MedicoModel.js";
import PersonaModel from "../models/PersonaModel.js";
import TratanteModel from "../models/TratanteModel.js";
import { Op } from "sequelize"; // Importing Op for operators

const getAllPersonal = async (req, res) => {
    try {
        // Fetching data from all models
        const medicos = await MedicoModel.findAll();
        const enfermeras = await EnfermeraModel.findAll();
        const tratantes = await TratanteModel.findAll();

        const allPersonasIds = [
            ...medicos.map((medico) => medico.id_persona),
            ...enfermeras.map((enfermera) => enfermera.id_persona),
            ...tratantes.map((tratante) => tratante.id_persona),
        ];

        console.log(allPersonasIds);

        // Fetching corresponding Persona data for all IDs
        const personal = await PersonaModel.findAll({
            where: {
                id_persona: {
                    [Op.in]: allPersonasIds, // Using Op.in to match any of the IDs
                },
            },
        });


        // Sending the combined data as a response
        res.json(personal);
    } catch (error) {
        console.error("Error fetching personnel:", error);
        res.status(500).json({ message: "Error fetching personnel" });
    }
};

export default getAllPersonal;
