import ModificacionModel from "../models/Modificaciones.js";

const guardarModificacion = async (req, res) => {
    try {
      
      const id_medico = req.session.person.id_persona;
  
      const input = req.body;
      input.id_medico = id_medico;
  
      // Verificar que se reciban los datos necesarios en el cuerpo de la solicitud
      const { id_historia, detalles } = input;
  
      if (!id_historia || !detalles) {
        return res.status(400).json({ message: "Faltan datos necesarios" });
      }
  
      // Crear la nueva modificación en la base de datos
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
