import AreaModel from "./AreaModel.js";
import CredencialesModel from "./CredencialesModel.js";
import EnfermeraModel from "./EnfermeraModel.js";
import EspecialidadModel from "./EspecialidadModel.js";
import HistoriaClinicaModel from "./HistoriaClinicaModel.js";
import MedicoModel from "./MedicoModel.js";
import ModificacionModel from "./Modificaciones.js";
import PacienteModel from "./PacienteModel.js";
import PersonaModel from "./PersonaModel.js";
import PlanTratamientoModel from "./PlanTratamientoModel.js";
import TratamientoModel from "./TratamientoModel.js";
import TratanteModel from "./TratanteModel.js";

const loadAssociations = () => {

// Relación muchos a muchos con Area (una enfermera puede estar en una)
EnfermeraModel.belongsTo(AreaModel, {
    through: 'Enfermera_Area',  // Nombre de la tabla intermedia
    foreignKey: 'id_enfermera',
    otherKey: 'id_area',
    // onDelete: 'CASCADE',  // Opcional: cuando se elimina un area se elimina la enfermera
});

// Relación muchos a muchos con Especialidad (una enfermera puede tener una)
EnfermeraModel.belongsTo(EspecialidadModel, {
    through: 'Enfermera_Especialidad',  // Nombre de la tabla intermedia
    foreignKey: 'id_enfermera',
    otherKey: 'id_especialidad',
    // onDelete: 'CASCADE',  
});

// Relación con Persona (una enfermera pertenece a una persona)
EnfermeraModel.belongsTo(PersonaModel, {
    foreignKey: 'id_persona',
    targetKey: 'id_persona',
    onDelete: 'CASCADE',  // Opcional: cuando se elimina una Persona, también se elimina la Enfermera
});

// Definir la relación con Persona
TratanteModel.belongsTo(PersonaModel, {
    foreignKey: 'id_persona',  // Clave foránea en Tratante
    targetKey: 'id_persona',   // Clave primaria en Persona
    onDelete: 'CASCADE',       // Opcional: eliminar el Tratante cuando se elimine la Persona
  });

  // Relación inversa: Una especialidad puede ser de muchos médicos
EspecialidadModel.hasMany(MedicoModel, {
    foreignKey: 'id_especialidad',  // En el modelo Medico
    sourceKey: 'id_especialidad',
  });

  // Relación inversa: Una especialidad puede ser de muchos médicos
EspecialidadModel.hasMany(EnfermeraModel, {
    foreignKey: 'id_especialidad',  // En el modelo Medico
    sourceKey: 'id_especialidad',
  });

  
// Definir la relación con la tabla Persona
PacienteModel.belongsTo(PersonaModel, {
    foreignKey: 'id_persona',
    targetKey: 'id_persona',
    onDelete: 'CASCADE',  // Opcional: cuando se elimina una Persona, también se elimina el Paciente relacionado
  });
  
  
  PacienteModel.hasMany(HistoriaClinicaModel,{
    foreignKey: 'id_paciente',
    sourceKey: 'id_paciente'
  })

  // Definir las relaciones con otros modelos
HistoriaClinicaModel.belongsTo(PacienteModel, {
    foreignKey: 'id_paciente',
    targetKey: 'id_paciente',
  //   onDelete: 'CASCADE', // Opcional: eliminar la historia clínica cuando se elimine el paciente
  });
  
  HistoriaClinicaModel.belongsTo(MedicoModel, {
    foreignKey: 'id_medico',
    targetKey: 'id_medico',
  //   onDelete: 'CASCADE', // Opcional: eliminar la historia clínica cuando se elimine el médico
  });
  
  // HistoriaClinicaModel.belongsTo(AreaModel, {
  //   foreignKey: 'id_area',
  //   targetKey: 'id_area',
  // //   onDelete: 'CASCADE', // Opcional: eliminar la historia clínica cuando se elimine el área
  // });
  
  // HistoriaClinicaModel.belongsTo(TratamientoModel, {
  //   foreignKey: 'id_tratamiento',
  //   targetKey: 'id_tratamiento',
  // //   onDelete: 'CASCADE', // Opcional: eliminar la historia clínica cuando se elimine el tratamiento
  // });

  // Definir relaciones (si es necesario)
//una modificacion puede estar asociada a varios medicos
MedicoModel.hasMany(ModificacionModel, {
    foreignKey: 'id_medico',
    sourceKey: 'id_medico',
  });
  
  HistoriaClinicaModel.hasMany(ModificacionModel, {
    foreignKey: 'id_historia',
    sourceKey: 'id_historia',
  });

  //un medico puede estar asociado con varias areas
CredencialesModel.belongsTo(PersonaModel,{
    foreignKey: 'id_persona',
    sourceKey: 'id_persona',
})

PersonaModel.hasOne(EnfermeraModel, {
    foreignKey: 'id_persona',
  });
  
  PersonaModel.hasOne(PacienteModel, {
    foreignKey: 'id_persona',
  });

  // Relación uno a muchos (un medico puede tener una especialidad)
MedicoModel.belongsTo(EspecialidadModel, {
    foreignKey: 'id_especialidad',  // Referencia a la especialidad del médico
    targetKey: 'id_especialidad',
    // onDelete: 'CASCADE',  // Eliminar especialidad si se elimina un medico
  });

  //un medico puede estar asociado con varias areas
AreaModel.hasMany(MedicoModel,{
    foreignKey: 'id_area',
    sourceKey: 'id_area',
})

AreaModel.hasMany(EnfermeraModel,{
    foreignKey: 'id_area',
    sourceKey: 'id_area',
})

// Definir la relación con la tabla Persona
MedicoModel.belongsTo(PersonaModel, {
    foreignKey: 'id_persona',  // Relación con 'id_persona' en la tabla Persona
    targetKey: 'id_persona',
    onDelete: 'CASCADE',  // Opcional: cuando se elimina una Persona, también se elimina el Medico
  });
  
  // Definir la relación con la tabla Area
  MedicoModel.belongsTo(AreaModel, {
    foreignKey: 'id_area',    // Relación con 'id_area' en la tabla Area
    targetKey: 'id_area',
  //   onDelete: 'CASCADE',  // Opcional: cuando se elimina un Area, también se elimina el Medico
  });

}

// Relación: Un plan de tratamiento tiene muchos tratamientos
PlanTratamientoModel.hasMany(TratamientoModel, {
  foreignKey: 'id_plan_tratamiento',
  sourceKey: 'id_plan_tratamiento'
});

// Relación: Un historia puede tener muchos planes de tratamientos
HistoriaClinicaModel.hasMany(PlanTratamientoModel, {
  foreignKey: 'id_historia',
  targetKey: 'id_historia'
});

export default loadAssociations;
