import TratamientoModel from "../models/TratamientoModel.js";
import EspecialidadModel from "../models/EspecialidadModel.js";
import AreaModel from "../models/AreaModel.js";
import PersonaModel from "../models/PersonaModel.js";
import EnfermeraModel from "../models/EnfermeraModel.js";
import MedicoModel from "../models/MedicoModel.js";
import TratanteModel from "../models/TratanteModel.js";
import PacienteModel from "../models/PacienteModel.js";
import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import ModificacionModel from "../models/Modificaciones.js";
import PlanTratamientoModel from "../models/PlanTratamientoModel.js";

const models = {
    PlanTratamiento: PlanTratamientoModel,
    tratamiento: TratamientoModel,
    especialidades: EspecialidadModel,
    persona: PersonaModel,
    enfermera: EnfermeraModel,
    medico: MedicoModel,
    tratante: TratanteModel,
    paciente: PacienteModel,
    historiaClinica: HistoriaClinicaModel,
    modificaciones: ModificacionModel,
    area: AreaModel,
}

const injectModel = (req, res, next) => {
    const modelName = req.params.model; // Obtener el nombre del modelo de la URL
    const model = models[modelName];   // Buscar el modelo en el objeto models

    // Si no es una ruta que requiera un modelo, continuar sin hacer nada
    if (!modelName || !model) {
      return res.status(400).json({ message: `El modelo '${modelName}' no es válido.` });
    }    

    req.model = model; // Inyectar el modelo en el objeto req
    next();            // Continuar con el siguiente middleware o controlador
  };


export default injectModel;

  