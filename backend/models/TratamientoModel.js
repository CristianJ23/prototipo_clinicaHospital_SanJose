import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TratamientoModel = db.define('tratamientos', {
    id_tratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    medicamentos: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    metodoAdministracion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_plan_tratamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Plan_tratamientos', // Nombre de la tabla de los planes de tratamiento
            key: 'id_plan_tratamiento' // Clave primaria de la tabla Plan_tratamientos
        }
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: true, // Esto permite que la columna acepte valores nulos
    }
}, {
    tableName: 'Tratamiento',
    timestamps: false,
});

export default TratamientoModel;
