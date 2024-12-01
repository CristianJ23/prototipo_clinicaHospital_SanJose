// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from './PersonaModel.js'; // Importar el modelo de Persona
import AreaModel from "./AreaModel.js";
import EspecialidadModel from "./EspecialidadModel.js";

// Definir el modelo Paciente
const EnfermeraModel = db.define('enfermera', {
    id_enfermera: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  tableName: 'Enfermera', // Nombre exacto de la tabla en la base de datos
  timestamps: false,    // Opcional: deshabilitar createdAt y updatedAt
});


export default EnfermeraModel;
