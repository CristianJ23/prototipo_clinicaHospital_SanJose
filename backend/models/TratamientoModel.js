import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TratamientoModel = db.define('tratamientos',{
    id_tratamiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    medicamentos:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    metodoAdministracion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_historia:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{
    tableName: 'Tratamiento',
    timestamps: false,
})

export default TratamientoModel;