// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PacienteModel from './PacienteModel.js';       // Importar el modelo de Paciente
import MedicoModel from './MedicoModel.js';           // Importar el modelo de Medico

// Definir el modelo HistoriaClinica
const HistoriaClinicaModel = db.define('HistoriaClinica', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PacienteModel,
      key: 'id_paciente',
    },
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MedicoModel,
      key: 'id_medico',
    },
  },
  // id_area: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: AreaModel,
  //     key: 'id_area',
  //   },
  // },
  motivoConsulta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  antecedentesPatologicosPersonales: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Constantes vitales
  presionArterial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  peso: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  talla: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  imc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  perimetroAbdominal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  glucosaCapilar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hemoglobinaCapilar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pulsioximetria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Examen físico
  cabeza: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cuello: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  torax: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  abdomen: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  extremidades: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  piel: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sistema_linfatico: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sistema_nervioso: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  fisico_cardiovascular: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  fisico_respiratorio: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  observacion_fisica: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Órganos y sistemas
  organos_sentidos: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  digestivo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  urinario: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  musculo_esqueletico: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  endocrino: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  nervioso: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  observacion_organos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'HistoriaClinica', // Nombre exacto de la tabla en la base de datos
  timestamps: false,            // Deshabilitar createdAt y updatedAt si no se desean
});

export default HistoriaClinicaModel;
