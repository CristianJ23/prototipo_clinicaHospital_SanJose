// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from './PersonaModel.js'; // Importar el modelo de Persona

// Definir el modelo Tratante
const TratanteModel = db.define('tratantes', {
  id_tratante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Tratante',  // Nombre de la tabla en la base de datos
  timestamps: false,      // Opcional: si no deseas que se añadan las fechas de creación y actualización
});



export default TratanteModel;
