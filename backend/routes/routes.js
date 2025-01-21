import express from "express";
import injectModel from "../controllers/middleware.js";
import CrearPaciente from "../controllers/createPaciente.js";
import { login } from "../credenciales/sesiones.js";
import { verificarAdministrador } from "../credenciales/middlewareAutenticacion.js";
import BuscarPersona from "../credenciales/cedulaSearch.js";
import CreateRolPrimeraVez from "../credenciales/createRolPrimeraVez.js";
import CreateRolNoPrimeraVez from "../credenciales/createRolNoPrimeraVez.js";
import bucarCedencialPorCedula from "../credenciales/buscarCredencialPorCedula.js";
import actualizarRol from '../credenciales/actualizarRol.js';
import buscarPacientePorCedula from "../controllers/buscarPacientePorCedula.js";
import eliminarRol from "../controllers/eliminarRol.js";
import { requestPasswordReset } from "../controllers/requestPasswordreset.js";
import ResetPassword from "../controllers/ResetPassword.js";
import CrearHistoriaClinica from "../controllers/crearHistoriaClinica.js";
import buscarHistoria from "../controllers/buscarHistoria.js";
import buscarHistoriaPorCedula from "../controllers/buscarHistoriasPorCedula.js";
import buscarTratamientosPorHistoria from "../controllers/buscarTratamientosPorHistoria.js";
import getAllPersonal from "../controllers/getAllPersonal.js";
import CrearPlanTratamiento from "../controllers/CrearPlanTratamiento.js";
import changeEstadoPlan from "../controllers/changeEstadoPlan.js";
import planTratamientoPorCedula from "../controllers/planTratamientoPorCedula.js";
import borrar from "../controllers/borrar.js";

// Creación de contenedor de rutas para exportar al final del script
const router = express.Router();

router.get("/borrar/:id_historia", borrar )


//ruta para buscar el plan de tratamiento segun la cedula
router.get("/planTratamientoPorCedula/:cedula", planTratamientoPorCedula)

//ruta para cambiar el estado del plan de tratamientos
router.put("/change-estado-plan-tratamientos/:id_plan_tratamiento", changeEstadoPlan);

//ruta para obtener todos los empleados
router.get('/getAllPersonal', getAllPersonal)

//ruta para actualizar rol
router.post('/actializarRol/', actualizarRol)

//ruata para buscar trataminetos para la historia
router.get('/buscarTratamientosPorHistoria/:historia', buscarTratamientosPorHistoria)

//ruta para buscar historiales clinicos por numero de cedula
router.get("/buscarHistoriaPorCedula/:cedula", buscarHistoriaPorCedula)

//ruta para crear el historial de un paciente
router.post("/crear_historia_clinica", CrearHistoriaClinica)

//ruta para crear el historial de un paciente
router.post("/crear_plan_tratamiento", CrearPlanTratamiento)

// Ruta para solicitar restablecimiento de contraseña
router.post('/request-password-reset', requestPasswordReset);
router.post("/reset-password/", ResetPassword);

//ruta para eliminar credencial
router.post('/deleteRol/:idCredencial', eliminarRol)

//buscar paciente por numero de cedula
router.get("/buscarPacientePorCedula/:cedula", buscarPacientePorCedula)

//buscar historia por numero de cedula
router.get("/buscarHistoria/:cedula", buscarHistoria)

//ruta par abucar un a credencial por el numero de cedula
router.get('/buscarCredencialPorCedula/:numero_documento', bucarCedencialPorCedula)

// Ruta para crear un paciente (sin depender del middleware injectModel)
router.post('/crearPaciente', CrearPaciente);

//ruta para buscar persona por cedula
router.get('/buscarPersonaPorCedula/:cedula', BuscarPersona);

//ruta crear un rol si no existe en personas
router.post('/createRolPrimeraVez', CreateRolPrimeraVez);

//ruta crear un rol si existe en personas
router.post('/createRolNoPrimeraVez', CreateRolNoPrimeraVez);

// ruta par iniciar sesion
router.post('/login', verificarAdministrador, login)
// router.post('/login', login)

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
    console.log("error:", error.message)
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
