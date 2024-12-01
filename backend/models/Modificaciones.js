import db from "../database/db.js";
import { DataTypes } from "sequelize";
import MedicoModel from "./MedicoModel.js"; // Importar el modelo Medico
import HistoriaClinicaModel from "./HistoriaClinicaModel.js"; // Importar el modelo HistoriaClinica

// Definir el modelo Modificaciones
const ModificacionModel = db.define('modificaciones', {
  id_modificacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_historia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detalles: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'Modificaciones', // Nombre exacto de la tabla en la base de datos
  timestamps: false, // Opcional: deshabilitar createdAt y updatedAt
});



export default ModificacionModel;
