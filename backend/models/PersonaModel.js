import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Definir el modelo Persona
const PersonaModel = db.define('personas', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  primer_apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  segundo_apellido: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  primer_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  segundo_nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tipo_documento: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numero_documento: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  estado_civil: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  lugar_nacimiento: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  nacionalidad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  tableName: 'Persona', // Nombre exacto de la tabla en la base de datos
  timestamps: false,    // Deshabilitar createdAt y updatedAt si no son necesarios
});

export default PersonaModel;
