import express from "express";
import injectModel from "../controllers/middleware.js";
import CrearPaciente from "../controllers/createPaciente.js";

// Creación de contenedor de rutas para exportar al final del script
const router = express.Router();

// Ruta para crear un paciente (sin depender del middleware injectModel)
router.post('/crearPaciente', CrearPaciente);

// Middleware para inyectar el modelo solo en rutas que usan :model
router.use("/:model", injectModel);

// Rutas genéricas para manejar modelos
router.get("/:model", async (req, res) => {
  try {
    const records = await req.model.findAll(); // Usa el modelo inyectado
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:model/:id", async (req, res) => {
  try {
    const record = await req.model.findByPk(req.params.id); // Usa el modelo inyectado
    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:model", async (req, res) => {
  try {
    const newRecord = await req.model.create(req.body); // Usa el modelo inyectado
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:model/:id", async (req, res) => {
  try {
    const record = await req.model.findByPk(req.params.id); // Usa el modelo inyectado
    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    await record.update(req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:model/:id", async (req, res) => {
  try {
    const record = await req.model.findByPk(req.params.id); // Usa el modelo inyectado
    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    await record.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
