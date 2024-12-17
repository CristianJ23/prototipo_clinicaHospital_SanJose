// Importar la conexión a la base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PersonaModel from './PersonaModel.js'; // Importar el modelo de Persona

// Definir el modelo Paciente
const PacienteModel = db.define('pacientes', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_admision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Asigna la fecha actual por defecto
    allowNull: false,
  },
  admisionista: {
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser NULL dependiendo de si se conoce el admisionista
  },
  condicion_edad: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  autoidentificacion_etnica: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  nacionalidad_etnica: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  pueblos: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  nivel_educacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  estado_nivel_educacion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ocupacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tipo_empresa: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  seguro_salud: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tipo_bono: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  provincia: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  canton: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  parroquia: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  barrio: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  calle_principal: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  calle_secundaria: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  referencia: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  contacto_emergencia_cedula: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  contacto_emergencia_nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  contacto_emergencia_apellido: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  contacto_emergencia_telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  contacto_emergencia_direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contacto_emergencia_relacion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'Paciente', // Nombre exacto de la tabla en la base de datos
  timestamps: false,     // Deshabilitar createdAt y updatedAt si no son necesarios
});

// Definir las relaciones entre tablas
PacienteModel.belongsTo(PersonaModel, { foreignKey: 'id_persona', targetKey: 'id_persona' });

export default PacienteModel;
