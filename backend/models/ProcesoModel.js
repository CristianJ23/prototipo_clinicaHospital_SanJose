// Import the database connection
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PlanTratamientosModel from "./PlanTratamientoModel.js"; // Import Plan_tratamientos model
import EnfermeraModel from "./EnfermeraModel.js";             // Import Enfermera model

// Define the Proceso model
const ProcesoModel = db.define('Proceso', {
  id_proceso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_plan_tratamiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanTratamientosModel,
      key: 'id_plan_tratamiento',
    },
  },
  id_enfermera: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EnfermeraModel,
      key: 'id_enfermera',
    },
  },
  fecha_proceso: {
    type: DataTypes.DATEONLY, // Stores only the date (YYYY-MM-DD)
    allowNull: false,
  },
  hora_proceso: {
    type: DataTypes.TIME, // Stores only the time (HH:MM:SS)
    allowNull: false,
  },
  medicamento: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  metodo_suministracion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  observacion: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field
  },
}, {
  tableName: 'Proceso', // Exact name of the table in the database
  timestamps: false,    // Disable createdAt and updatedAt if not needed
});

export default ProcesoModel;
