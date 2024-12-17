import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TratamientoModel = db.define('tratamientos',{
    id_tratamiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    medicamentos_prescritos:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    indicaciones_administracion:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_historia:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
},
{
    tableName: 'Tratamiento',
    timestamps: false,
})

export default TratamientoModel;