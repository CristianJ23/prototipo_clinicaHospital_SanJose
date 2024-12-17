// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PacienteModel from './PacienteModel.js';       // Importar el modelo de Paciente
import MedicoModel from './MedicoModel.js';           // Importar el modelo de Medico
import AreaModel from './AreaModel.js';               // Importar el modelo de Area
import TratamientoModel from './TratamientoModel.js'; // Importar el modelo de Tratamiento

// Definir el modelo HistoriaClinica
const HistoriaClinicaModel = db.define('historia_clinica', {
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
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacion_medica: {
    type: DataTypes.TEXT,
    allowNull: true,  // Puede ser opcional
  },
}, {
  tableName: 'HistoriaClinica', // Nombre exacto de la tabla en la base de datos
  timestamps: false,            // Opcional: deshabilitar createdAt y updatedAt si no se desean
});



export default HistoriaClinicaModel;
