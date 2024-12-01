import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";

const CreatePaciente = async (req, res) => {
    try {
      const pacienteData = req.body;
      console.log("Datos recibidos en el backend:", pacienteData);

      const personaCreada = await PersonaModel.create({
        nombres:pacienteData.nombres,
        apellidos: pacienteData.apellidos,
        cedula: pacienteData.cedula,
        celular: pacienteData.celular,
        sexo: pacienteData.sexo,
        fecha_nacimiento: pacienteData.fecha_nacimiento,
        correo_electronico: pacienteData.correo_electronico,
        edad: pacienteData.edad,
      });

      console.log("Persona creada:", personaCreada); // Verifica si personaCreada tiene un id válido

      console.log("Persona creada con ID:", personaCreada.id_persona); // Asegúrate de que el ID es válido

          // Crear el paciente, asumiendo que 'PacienteModel' tiene una relación con 'PersonaModel'
    const paciente = await PacienteModel.create({
        id_persona: personaCreada.id_persona, // Suponiendo que PacienteModel tiene un campo 'personaId' que es una FK
        contacto_de_emergencia: pacienteData.contacto_de_emergencia,
        alergias: pacienteData.alergias,
        medicamentos_reaccion: pacienteData.medicamentos_reaccion,
        enfermedades_hereditarias: pacienteData.enfermedades_hereditarias,
      });

  
      res.status(200).json({
        message: "Datos recibidos correctamente",
        data: pacienteData,
      });
    } catch (error) {
      console.error("Error al recibir los datos:", error);
      res.status(500).json({ error: "Error al procesar los datos" });
    }
  };
  

export default CreatePaciente;
