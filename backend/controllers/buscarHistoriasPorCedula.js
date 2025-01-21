import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";
import PacienteModel from "../models/PacienteModel.js";
import PersonaModel from "../models/PersonaModel.js";

const buscarPersonaPorCedula = async (cedula) => {
    try {
      const response = await axios.get(`http://localhost:8000/kriss/Pacientes_Cedula/${cedula}`);
      if (response.data) {
        // Obtener la historia clínica del paciente
        const historia = response.data.historia;
        // Obtener el último tratamiento activo
        const tratamientoActivo = historia.tratamientos.filter((tratamiento) => tratamiento.planTratamiento.estado === "ACTIVO");
        if (tratamientoActivo.length > 0) {
          const idPlanTratamiento = tratamientoActivo[tratamientoActivo.length - 1].planTratamiento.id_plan_tratamiento;
          setNuevoProceso(prevState => ({
            ...prevState,
            id_plan_tratamiento: idPlanTratamiento, // Asignar el id_plan_tratamiento
          }));
        }
      }
    } catch (error) {
      console.error("Error al buscar persona por cédula:", error);
    }
  };
  

export default buscarPersonaPorCedula;