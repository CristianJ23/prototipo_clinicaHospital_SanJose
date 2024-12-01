import db from "../database/db.js";
import { DataTypes } from "sequelize";
import MedicoModel from "./MedicoModel.js";
import EnfermeraModel from "./EnfermeraModel.js";

const EspecialidadModel = db.define('especialidades',{
    id_especialidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_especialidad:{
        type: DataTypes.TEXT,
        allowNull: false
},
},{
    tableName: 'Especialidades',
    timestamps: false,
})

export default EspecialidadModel;