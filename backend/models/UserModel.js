//abstracciones de tablas de db
//nombre modelo en singular y mayuscula
//tablas en plural y minusculas

//importar la conexion a la db
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const BlogModel = db.define('users', {
  id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nombre: {type:DataTypes.STRING},
    apellido: {type:DataTypes.STRING},
    correo: {type:DataTypes.STRING},
    contraseña: {type:DataTypes.STRING},
    nombreRol: {type:DataTypes.STRING},
    Roles_idRoles: {type:DataTypes.INTEGER},
}, {
  tableName: 'Paciente',  // Asegúrate de que el nombre de la tabla sea 'usuarios'
  timestamps: false        // Opcional: Si no tienes campos de timestamps como createdAt/updatedAt
});


export default BlogModel