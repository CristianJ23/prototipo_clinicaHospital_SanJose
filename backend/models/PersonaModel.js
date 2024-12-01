// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Definir el modelo Persona
const PersonaModel = db.define('personas', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Persona', // Nombre exacto de la tabla en la base de datos
  timestamps: false,    // Opcional: deshabilitar createdAt y updatedAt
});



export default PersonaModel;
