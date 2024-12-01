// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from './PersonaModel.js'; // Importar el modelo de Persona
import TratanteModel from "./TratanteModel.js";
import HistoriaClinicaModel from "./HistoriaClinicaModel.js";

// Definir el modelo Paciente
const PacienteModel = db.define('pacientes', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Agregar autoIncrement
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contacto_de_emergencia: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  alergias: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  medicamentos_reaccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  enfermedades_hereditarias: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Paciente', // Nombre exacto de la tabla en la base de datos
  timestamps: false,    // Opcional: deshabilitar createdAt y updatedAt
});



export default PacienteModel;
