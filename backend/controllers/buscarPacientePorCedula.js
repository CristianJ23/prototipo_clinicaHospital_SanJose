import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";

// Función para buscar un paciente por su número de cédula
const buscarPacientePorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    console.log("Datos recibidos en el backend:", cedula);

    // Buscar la persona por la cédula
    const persona = await PersonaModel.findOne({ where: { numero_documento: cedula } });
    // console.log(persona);

    if (!persona) {
      // Si no se encuentra la persona, devolver un mensaje 404
      console.log('No se encontró ninguna persona con esa cédula');
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    const id_persona = persona.id_persona;

    // Buscar el paciente relacionado con esa persona
    const paciente = await PacienteModel.findOne({ where: { id_persona } });

    if (paciente) {
      res.json(paciente);  // Devuelve los datos del paciente
    } else {
      console.log("No se encontró un paciente con ese id de persona");
      res.status(404).json({ message: "Paciente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar el paciente", error: error.message });
  }
}

export default buscarPacientePorCedula;
