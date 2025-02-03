// Import the database connection
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PacienteModel from './PacienteModel.js';       // Import Paciente model
import MedicoModel from './MedicoModel.js';           // Import Medico model

// Define the HistoriaClinica model
const HistoriaClinicaModel = db.define('HistoriaClinica', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivoConsulta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  antecedentesPatologicosPersonales: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Vital signs
  presionArterial: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  peso: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  talla: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  imc: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  perimetroAbdominal: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  glucosaCapilar: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hemoglobinaCapilar: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pulsioximetria: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // Physical exam
  cabeza: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  cuello: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  torax: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  abdomen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  extremidades: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  piel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  sistema_linfatico: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  sistema_nervioso: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  fisico_cardiovascular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  fisico_respiratorio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  observacion_fisica: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Organs and systems
  organos_sentidos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  respiratorio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  cardiovascular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  digestivo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  urinario: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  musculo_esqueletico: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  endocrino: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  nervioso: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  observacion_organos: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Asigna la fecha actual por defecto
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), // 🔹 Nuevo campo para el estado
    defaultValue: 'ACTIVO',
    allowNull: false,
  }
}, {
  tableName: 'HistoriaClinica', // Exact name of the table in the database
  timestamps: false,            // Disable createdAt and updatedAt if not needed
});

// Export the model
export default HistoriaClinicaModel;
