import ModificacionModel from "../models/Modificaciones.js";

const guardarModificacion = async (req, res) => {
  try {
    console.log("Datos recibidos en guardarModificacion:", req.body); // Verificar datos del cliente

    // Obtener el id_medico de la sesión o asignar 1 como valor predeterminado
    const id_medico = req.session?.person?.id_persona || 1;

    const { id_historia, detalles } = req.body;
    if (!id_historia || !detalles) {
      return res.status(400).json({ message: "Faltan datos necesarios: id_historia o detalles" });
    }

    // Crear la modificación
    const nuevaModificacion = await ModificacionModel.create({
      id_historia,
      id_medico,
      detalles,
    });

    res.status(201).json({
      message: "Modificación guardada exitosamente",
      nuevaModificacion,
    });
  } catch (error) {
    console.error("Error al guardar la modificación:", error);
    res.status(500).json({
      message: "Error al guardar la modificación",
      error: error.message,
    });
  }
};

export default guardarModificacion;
