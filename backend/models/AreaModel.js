import db from "../database/db.js";
import { DataTypes } from "sequelize";
import MedicoModel from "./MedicoModel.js";
import EnfermeraModel from "./EnfermeraModel.js";

const AreaModel = db.define('areas',{
    id_area:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_area:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    ubicacion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    tableName: 'Area',
    timestamps: false,
})

export default AreaModel;