import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PlanTratamientoModel = db.define('Plan_tratamientos', {
    id_plan_tratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_historia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'HistoriaClinica', // Nombre de la tabla de historias clínicas
            key: 'id_historia' // Clave primaria de la tabla HistoriaClinica
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('ACTIVO', 'TERMINADO'),
        allowNull: false
    }
}, {
    tableName: 'Plan_tratamientos',
    timestamps: false,
});

export default PlanTratamientoModel;
