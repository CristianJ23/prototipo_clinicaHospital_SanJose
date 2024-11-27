import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Rutas para usuarios
router.get("/", getUsers); // Obtener todos los usuarios
router.get("/:id", getUserById); // Obtener un usuario por ID
router.post("/", createUser); // Crear un nuevo usuario
router.put("/:id", updateUser); // Actualizar un usuario por ID
router.delete("/:id", deleteUser); // Eliminar un usuario por ID

export default router;
