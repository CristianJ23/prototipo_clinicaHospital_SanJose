import PersonaModel from "../models/PersonaModel.js";
import PacienteModel from "../models/PacienteModel.js";

const CreatePaciente = async (req, res) => {
  try {
    const pacienteData = req.body;
    console.log("Datos recibidos en el backend:", pacienteData);

    const personaCreada = await PersonaModel.create({
      primer_apellido: pacienteData.primer_apellido,
      segundo_apellido: pacienteData.segundo_apellido,
      primer_nombre: pacienteData.primer_nombre,
      segundo_nombre: pacienteData.segundo_nombre,
      tipo_documento: pacienteData.tipo_documento,
      numero_documento: pacienteData.numero_documento,
      estado_civil: pacienteData.estado_civil,
      sexo: pacienteData.sexo === "masculino" ? 'M' : 'F',
      celular: pacienteData.celular,
      correo_electronico: pacienteData.correo_electronico,
      fecha_nacimiento: pacienteData.fecha_nacimiento,
      lugar_nacimiento: pacienteData.lugar_nacimiento,
      nacionalidad: pacienteData.nacionalidad,
    });

    console.log("Persona creada con ID:", personaCreada.id_persona);

    const paciente = await PacienteModel.create({
      id_persona: personaCreada.id_persona,
      contacto_emergencia_cedula: pacienteData.contacto_emergencia_cedula,
      contacto_emergencia_nombre: pacienteData.contacto_emergencia_nombre,
      contacto_emergencia_apellido: pacienteData.contacto_emergencia_apellido,
      contacto_emergencia_telefono: pacienteData.contacto_emergencia_telefono,
      contacto_emergencia_direccion: pacienteData.contacto_emergencia_direccion,
      contacto_emergencia_relacion: pacienteData.contacto_emergencia_relacion,
      alergias: pacienteData.alergias,
      medicamentos_reaccion: pacienteData.medicamentos_reaccion,
      enfermedades_hereditarias: pacienteData.enfermedades_hereditarias,
      autoidentificacion_etnica: pacienteData.autoidentificacion_etnica,
      nacionalidad_etnica: pacienteData.nacionalidad_etnica,
      pueblos: pacienteData.pueblos,
      nivel_educacion: pacienteData.nivel_educacion,
      estado_nivel_educacion: pacienteData.estado_nivel_educacion,
      ocupacion: pacienteData.ocupacion,
      tipo_empresa: pacienteData.tipo_empresa,
      seguro_salud: pacienteData.seguro_salud,
      tipo_bono: pacienteData.tipo_bono,
      provincia: pacienteData.provincia,
      canton: pacienteData.canton,
      parroquia: pacienteData.parroquia,
      barrio: pacienteData.barrio,
      calle_principal: pacienteData.calle_principal,
      calle_secundaria: pacienteData.calle_secundaria,
      referencia: pacienteData.referencia,
      condicion_edad: pacienteData.condicion_edad
    });

    res.status(200).json({
      message: "Paciente creado correctamente",
      paciente: paciente,
    });
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    res.status(500).json({ error: "Error al procesar los datos" });
  }
};

export default CreatePaciente;