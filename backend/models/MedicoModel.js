// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from './PersonaModel.js'; // Importar el modelo de Persona
import AreaModel from "./AreaModel.js"; // Importar el modelo de Area
import EspecialidadModel from "./EspecialidadModel.js"; // Importar el modelo de Especialidad

// Definir el modelo Medico
const MedicoModel = db.define('medicos', {
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Esto se asume si es necesario
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Medico',   // Nombre exacto de la tabla en la base de datos
  timestamps: false,     // Deshabilitar createdAt y updatedAt
});



export default MedicoModel;
