import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from "./PersonaModel.js";

const CredencialesModel = db.define(
  "credenciales",
  {
    id_credencial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING(100), // Limitar a 100 caracteres como en tu base de datos
      allowNull: false,
      unique: true, // Evitar correos duplicados
      validate: {
        isEmail: true, // Validación para garantizar que sea un correo válido
      },
    },
    contrasena: {
      type: DataTypes.STRING(255), // Limitar a 255 caracteres como en tu base de datos
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("1", "2", "3"), // Valores de ENUM en tu base de datos
      allowNull: false,
      comment: "1 = Médico, 2 = Enfermera, 3 = Tratante", // Documentar los valores
    },
    estado: {
      type: DataTypes.STRING(10),
    },
  },
  {
    tableName: "credenciales",
    timestamps: false,
  }
);

export default CredencialesModel;
