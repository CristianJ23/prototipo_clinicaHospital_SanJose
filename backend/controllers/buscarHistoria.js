import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";
import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";

// Función para buscar un paciente y sus historias clínicas por su número de cédula
const buscarHistoria = async (req, res) => {
  try {
    const { cedula } = req.params;
    console.log("Datos recibidos en el backend:", cedula);

    // Buscar la persona por la cédula
    const persona = await PersonaModel.findOne({ where: { numero_documento: cedula } });

    if (!persona) {
      console.log("No se encontró ninguna persona con esa cédula");
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    const id_persona = persona.id_persona;

    // Buscar el paciente relacionado con esa persona
    const paciente = await PacienteModel.findOne({ where: { id_persona } });

    if (!paciente) {
      console.log("No se encontró un paciente con ese id de persona");
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const id_paciente = paciente.id_paciente;

    // Buscar las historias clínicas relacionadas al paciente
    const historiasClinicas = await HistoriaClinicaModel.findAll({ where: { id_paciente } });

    if (historiasClinicas.length === 0) {
      console.log("No se encontraron historias clínicas para el paciente");
      return res.status(404).json({ message: "Historias clínicas no encontradas" });
    }

    // Respuesta con los datos del paciente y sus historias clínicas
    res.json({
      persona,
      paciente,
      historiasClinicas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar el paciente y sus historias clínicas", error: error.message });
  }
};

export default buscarHistoria;
