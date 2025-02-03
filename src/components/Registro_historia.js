import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/registroHistoria.css";
import debounce from 'lodash.debounce';
import axios from "axios";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import gestion from "../img2/gestion.png";
import home from "../img2/home.png";


const RegistroHistoria = ({ onCancel }) => {
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [persona, setpersona] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();  // Hook para navegación programática
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    id_paciente: "",
    /**datos de la clinica */
    /**los datos de la institucion se llenan con un json guardado */
    institucionSistema: "",
    establecimientoSalud: "",
    /**datos historia clinica */
    motivoConsulta: "",
    antecedentesPatologicosPersonales: "",
    constantesVitales: {
      presionArterial: "",
      peso: "",
      talla: "",
      imc: "",
      perimetroAbdominal: "",
      glucosaCapilar: "",
      hemoglobinaCapilar: "",
      pulsioximetria: "",
    },
    examenFisico: {
      seleccionados: [],
      observacion: "",
    },
    revisionOrganosYSystems: {
      seleccionados: [],
      observacion: "",
    },
    tratamiento: {
      medicamentos: "",
      metodoAdministracion: "",
      duracion: "", // Nuevo campo para la duración
      medicamentosSeleccionados: []
    }
  });


  const medicamentos = [
    {
      categoria: "tabletas",
      medicamentos: [
        { nombre: "Paracetamol", dosis: "500 mg" },
        { nombre: "Ibuprofeno", dosis: "400 mg" },
        { nombre: "Amoxicilina", dosis: "500 mg" },
        { nombre: "Metformina", dosis: "850 mg" },
        { nombre: "Losartán", dosis: "50 mg" },
        { nombre: "Atenolol", dosis: "50 mg" },
        { nombre: "Loratadina", dosis: "10 mg" },
        { nombre: "Simvastatina", dosis: "20 mg" },
        { nombre: "Omeprazol", dosis: "20 mg" },
        { nombre: "Clonazepam", dosis: "0.5 mg" }
      ]
    },
    {
      categoria: "inyecciones",
      medicamentos: [
        { nombre: "Ceftriaxona", dosis: "1 g" },
        { nombre: "Penicilina G", dosis: "1.5 millón U" },
        { nombre: "Metotrexato", dosis: "25 mg" },
        { nombre: "Ketorolaco", dosis: "30 mg" },
        { nombre: "Adrenalina", dosis: "1 mg" },
        { nombre: "Fentanilo", dosis: "100 mcg" },
        { nombre: "Insulina Rápida", dosis: "100 U/ml" },
        { nombre: "Tramadol", dosis: "50 mg" },
        { nombre: "Vitamina B12", dosis: "1,000 mcg" },
        { nombre: "Cloruro de sodio", dosis: "0.9%" }
      ]
    },
    {
      categoria: "jarabes",
      medicamentos: [
        { nombre: "Dextrometorfano", dosis: "15 mg/5 ml" },
        { nombre: "Amoxicilina", dosis: "125 mg/5 ml" },
        { nombre: "Ibuprofeno", dosis: "100 mg/5 ml" },
        { nombre: "Clorfenamina", dosis: "2 mg/5 ml" },
        { nombre: "Salbutamol", dosis: "2 mg/5 ml" },
        { nombre: "Mucosolvan", dosis: "30 mg/5 ml" },
        { nombre: "Ambroxol", dosis: "15 mg/5 ml" },
        { nombre: "Loratadina", dosis: "5 mg/5 ml" },
        { nombre: "Domperidona", dosis: "10 mg/5 ml" }
      ]
    }
  ];
  const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState([]); // Medicamentos seleccionados

  // Función para manejar el autocompletado de medicamentos
  const handleMedicamentoChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, tratamiento: { ...formData.tratamiento, medicamentos: value } });

    if (value === "") {
      setOpcionesFiltradas([]); // Si el campo está vacío, no mostrar sugerencias
    } else {
      // Filtrar medicamentos que coincidan con la entrada
      const opciones = medicamentos.flatMap((categoria) =>
        categoria.medicamentos.filter((medicamento) =>
          medicamento.nombre.toLowerCase().includes(value.toLowerCase())
        )
      );
      setOpcionesFiltradas(opciones);
    }
  };

  // Función para agregar un medicamento a la lista de medicamentos seleccionados
  const agregarMedicamento = () => {
    const medicamentoExistente = medicamentosSeleccionados.some(
      (medicamento) => medicamento.nombre.toLowerCase() === formData.tratamiento.medicamentos.toLowerCase()
    );
  
    if (!medicamentoExistente && formData.tratamiento.medicamentos !== "") {
      const medicamento = obtenerMedicamentoPorNombre(formData.tratamiento.medicamentos);
      if (medicamento) {
        const nuevoMedicamento = {
          ...medicamento,
          metodoAdministracion: formData.tratamiento.metodoAdministracion,
          duracion: formData.tratamiento.duracion, // Se añade duración
        };
        
        setMedicamentosSeleccionados([...medicamentosSeleccionados, nuevoMedicamento]);
        setFormData({
          ...formData,
          tratamiento: {
            medicamentos: "",
            metodoAdministracion: "",
            duracion: "", // Limpiar campo después de agregar
          },
        });
      } else {
        alert("Medicamento no encontrado");
      }
    } else {
      alert("Este medicamento ya ha sido agregado o el campo está vacío.");
    }
  };

  // Función para obtener medicamento por nombre
  const obtenerMedicamentoPorNombre = (nombre) => {
    for (let categoria of medicamentos) {
      const medicamento = categoria.medicamentos.find(
        (med) => med.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (medicamento) {
        return medicamento;
      }
    }
    return null; // Si no encuentra el medicamento
  };

  // Función para eliminar un medicamento de la lista de seleccionados
  const eliminarMedicamento = (medicamento) => {
    setMedicamentosSeleccionados(
      medicamentosSeleccionados.filter((item) => item.nombre !== medicamento.nombre)
    );
  };

  const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);
  const [tratamientoId, setTratamientoId] = useState(null); // Para almacenar el ID del tratamiento

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Si el campo es "cedula", llamar a la búsqueda con debounce
    if (name === 'cedula') {
      debouncedBuscarpersonaPorCedula(value); // Llamada al debounced function
    }
  };

  const handleNestedChange = (section, name, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    });
  };

  const handleCheckboxChange = (section, value) => {
    const currentSelection = formData[section].seleccionados;
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value];

    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        seleccionados: newSelection,
      },
    });
  };

  /*********************************************************** */
  /* codigo para recibir los datos del persona deacuerdo a su numero de cedula */
  const buscarpersonaPorCedula = async (cedula) => {
    try {
      const response = await axios.get(`http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`);
      const pacienteNew = await axios.get(`http://localhost:8000/kriss/buscarPacientePorCedula/${cedula}`);

      if ( pacienteNew.data) {
        setpersona(response.data);
        setPaciente(pacienteNew.data);
        setMensaje("");

      } else {
        setMensaje("Persona no encontrada.");
        setpersona(null);
        setPaciente(null);
      }
    } catch (error) {
      setMensaje("Error al buscar la persona.");
      setpersona(null);
      setPaciente(null);
    }
  };

  // useEffect(() => {
  //   if (persona) {
  //     console.log("persona : ", persona.primer_apellido); // Imprime el persona cuando se actualiza el estado
  //   }
  // }, [persona]); // Solo se ejecuta cuando persona cambia

  // Usar debounce para evitar múltiples peticiones rápidas al backend
  const debouncedBuscarpersonaPorCedula = debounce((cedula) => {
    if (cedula) {
      buscarpersonaPorCedula(cedula); // Llamada al backend solo después del debounce
    }
  }, 500); // El tiempo de espera de 500 ms entre llamadas

  /*fin codigo para busqueda por cedula*/


 /*CODIGP DE ENVIO DE LA HISTORIA*/
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // ID de la historia clínica
    let historiaClinicaId = null;
    let planTratamientoId = null; // Variable para almacenar el ID del plan de tratamiento

    const updatedFormData = {
      ...formData,
      id_paciente: paciente.id_paciente,
    };

    console.log("id del paciene", paciente.id_paciente);
    console.log(updatedFormData);

    // 1. Crear la Historia Clínica (primero se necesita para obtener su ID)
    const historiaResponse = await fetch("http://localhost:8000/kriss/crear_historia_clinica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',  // Asegura que se envíen cookies
      body: JSON.stringify({
        ...updatedFormData,
        tratamiento: undefined, // No incluir el tratamiento aún
      }),
    });

    if (!historiaResponse.ok) {
      throw new Error("Error al crear historia clínica");
    }
    const historiaResult = await historiaResponse.json();
    historiaClinicaId = historiaResult.id_historia; // Asegúrate de recibir este campo del backend

    // 2. Crear el Plan de Tratamiento
    const planTratamientoData = {
      id_historia: historiaResult.id_historia, // Cambiar 'historiaClinicaId' por 'id_historia'
      fecha_inicio: new Date().toISOString(), // Fecha de inicio actual (del sistema)
      fecha_fin: null, // Fecha de fin como null
      estado: 'ACTIVO', // O 'TERMINADO' dependiendo de lo que sea apropiado
    };

    const planTratamientoResponse = await fetch("http://localhost:8000/kriss/crear_plan_tratamiento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(planTratamientoData),
    });

    if (!planTratamientoResponse.ok) {
      throw new Error("Error al crear el plan de tratamiento");
    }
    const planTratamientoResult = await planTratamientoResponse.json();
    planTratamientoId = planTratamientoResult.id_plan_tratamiento; // ID del plan de tratamiento creado

    // 3. Crear Tratamientos asociados a la historia
    for (const medicamento of medicamentosSeleccionados) {
      const tratamientoData = {
        medicamentos: medicamento.nombre,
        metodoAdministracion: medicamento.metodoAdministracion,
        duracion: medicamento.duracion, // Nuevo campo
        id_plan_tratamiento: planTratamientoId,
      };

      const tratamientoResponse = await fetch("http://localhost:8000/kriss/tratamiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tratamientoData),
      });

      if (!tratamientoResponse.ok) {
        throw new Error("Error al guardar tratamiento: " + medicamento.nombre);
      }
    }

    console.log("Historia clínica y tratamientos guardados con éxito.");
    alert("Historia clínica y tratamientos registrados exitosamente.");

    // Reiniciar el formulario
    setFormData({
      ...formData,
      tratamiento: { medicamentos: [], metodoAdministracion: "", duracion: "" },
    });
    setMedicamentosSeleccionados([]);

  } catch (error) {
    console.error("Error en el proceso:", error);
    alert("Ocurrió un error al guardar los datos.");
  }
};

  const examenesFisicos = [
    "cabeza",
    "cuello",
    "torax",
    "abdomen",
    "axtremidades",
    "piel",
    "sistema_linfatico",
    "sistema_nervioso",
    "fisico_cardiovascular",
    "fisico_respiratorio",
  ];

  const organosYSistemas = [
    "organos_sentidos",
    "respiratorio",
    "cardiovascular",
    "digestivo",
    "urinario",
    "musculo_esqueletico",
    "endocrino",
    "nervioso",
  ];

  /*funcion para enviar datos asociados a la hisotria clinica */
  const datosAsociados = async (cedula) => {
    try {
      formData.id_persona = persona.id_persona;

    } catch (error) { }
  }

  return (
    <div className="registro-historia">
      {/* Contenedor para el menú */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <div className="modulo" onClick={() => navigate("/crear-paciente")}>
          <img src={crearPacienteImg} alt="Registro de Paciente" />
          <p>Registro de Paciente</p>
        </div>
        <div className="modulo" onClick={() => navigate("/gestion-historias")}>
          <img src={gestionHistoriasImg} alt="Registro de Historia" />
          <p>Registro de Historia</p>
        </div>
        <div className="modulo" onClick={() => navigate("/gestion")}>
          <img src={gestion} alt="Gestión Historias" />
          <p>Gestión de Historias</p>
        </div>
        <div className="modulo" onClick={() => navigate("/vista-medico")}>
          <img src={home} alt="Home" />
          <p>Home</p>
        </div>
      </div>

      <div className="form-container">
        <h1>Registro de Historia Clínica</h1>
        <form onSubmit={handleSubmit}>
          <h2>Datos del persona</h2>
          <label>
            Cédula:
            <input type="text" name="cedula" value={formData.cedula} onChange={handleInputChange} />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores */}

          <label>
            Nombres:
            <input
              type="text"
              name="nombres"
              value={persona ? persona.primer_nombre + " " + persona.segundo_nombre : ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos"
              value={persona ? persona.primer_apellido + " " + persona.segundo_apellido : ""}
              onChange={handleInputChange} />
          </label>
          <label>
            Institución del Sistema:
            <input type="text" name="institucionSistema" value={formData.institucionSistema} onChange={handleInputChange} />
          </label>
          <label>
            Establecimiento de Salud:
            <input type="text" name="establecimientoSalud" value={formData.establecimientoSalud} onChange={handleInputChange} />
          </label>


          <h2>Motivo de Consulta</h2>
          <label>
            Tipo de Motivo de Consulta:
            <input type="text" name="motivoConsulta" value={formData.motivoConsulta} onChange={handleInputChange} />
          </label>

          <h2>Antecedentes Patológicos Personales</h2>
          <textarea
            name="antecedentesPatologicosPersonales"
            value={formData.antecedentesPatologicosPersonales}
            onChange={handleInputChange}
          ></textarea>

          <h2>Constantes Vitales</h2>
          {/* <label>
            Hora:
            <input
              type="text"
              name="hora"
              value={formData.constantesVitales.hora}
              onChange={(e) => handleNestedChange("constantesVitales", "hora", e.target.value)}
            />
          </label> */}
          <label>
            Presión Arterial:
            <input
              type="text"
              name="presionArterial"
              value={formData.constantesVitales.presionArterial}
              onChange={(e) => handleNestedChange("constantesVitales", "presionArterial", e.target.value)}
            />
          </label>
          <label>
            Peso:
            <input
              type="text"
              name="peso"
              value={formData.constantesVitales.peso}
              onChange={(e) => handleNestedChange("constantesVitales", "peso", e.target.value)}
            />
          </label>
          <label>
            Talla:
            <input
              type="text"
              name="talla"
              value={formData.constantesVitales.talla}
              onChange={(e) => handleNestedChange("constantesVitales", "talla", e.target.value)}
            />
          </label>
          <label>
            IMC:
            <input
              type="text"
              name="imc"
              value={formData.constantesVitales.imc}
              onChange={(e) => handleNestedChange("constantesVitales", "imc", e.target.value)}
            />
          </label>
          <label>
            Perímetro Abdominal:
            <input
              type="text"
              name="perimetroAbdominal"
              value={formData.constantesVitales.perimetroAbdominal}
              onChange={(e) => handleNestedChange("constantesVitales", "perimetroAbdominal", e.target.value)}
            />
          </label>
          <label>
            Glucosa Capilar:
            <input
              type="text"
              name="glucosaCapilar"
              value={formData.constantesVitales.glucosaCapilar}
              onChange={(e) => handleNestedChange("constantesVitales", "glucosaCapilar", e.target.value)}
            />
          </label>
          <label>
            Hemoglobina Capilar:
            <input
              type="text"
              name="hemoglobinaCapilar"
              value={formData.constantesVitales.hemoglobinaCapilar}
              onChange={(e) => handleNestedChange("constantesVitales", "hemoglobinaCapilar", e.target.value)}
            />
          </label>
          <label>
            Pulsioximetría:
            <input
              type="text"
              name="pulsioximetria"
              value={formData.constantesVitales.pulsioximetria}
              onChange={(e) => handleNestedChange("constantesVitales", "pulsioximetria", e.target.value)}
            />
          </label>

          <h2>Examen Físico</h2>
          {examenesFisicos.map((examen) => (
            <label key={examen}>
              <input
                type="checkbox"
                checked={formData.examenFisico.seleccionados.includes(examen)}
                onChange={() => handleCheckboxChange("examenFisico", examen)}
              />
              {examen}
            </label>
          ))}
          <label>
            Observación:
            <textarea
              name="observacion"
              value={formData.examenFisico.observacion}
              onChange={(e) => handleNestedChange("examenFisico", "observacion", e.target.value)}
            ></textarea>
          </label>

          <h2>Revisión de Órganos y Sistemas</h2>
          {organosYSistemas.map((organo) => (
            <label key={organo}>
              <input
                type="checkbox"
                checked={formData.revisionOrganosYSystems.seleccionados.includes(organo)}
                onChange={() => handleCheckboxChange("revisionOrganosYSystems", organo)}
              />
              {organo}
            </label>
          ))}
          <label>
            Observación:
            <textarea
              name="observacion"
              value={formData.revisionOrganosYSystems.observacion}
              onChange={(e) => handleNestedChange("revisionOrganosYSystems", "observacion", e.target.value)}
            ></textarea>
          </label>
          <h2>Tratamiento</h2>
          <label>
            Medicamentos:
            <input
              type="text"
              name="medicamentos"
              value={formData.tratamiento.medicamentos}
              onChange={handleMedicamentoChange}
              placeholder="Buscar medicamento"
            />
            {opcionesFiltradas.length > 0 && (
              <div className="sugerencias-lista">
                {opcionesFiltradas.map((medicamento) => (
                  <div
                    key={medicamento.nombre}
                    className="sugerencia-item"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        tratamiento: { ...formData.tratamiento, medicamentos: medicamento.nombre },
                      });
                      setOpcionesFiltradas([]); // Limpiar las sugerencias después de seleccionar
                    }}
                  >
                    {medicamento.nombre} ({medicamento.dosis})
                  </div>
                ))}
              </div>
            )}

            
          </label>
          <label>
            Método de Administración:
            <input
              type="text"
              name="metodoAdministracion"
              value={formData.tratamiento.metodoAdministracion}
              onChange={(e) => handleNestedChange("tratamiento", "metodoAdministracion", e.target.value)}
              placeholder="Método de administración"
            />
            
          </label>
          <label>
  Duración del tratamiento (días):
  <input
    type="number"
    name="duracion"
    value={formData.tratamiento.duracion}
    onChange={(e) => handleNestedChange("tratamiento", "duracion", e.target.value)}
    placeholder="Ingrese la duración en días"
  />
</label>
<button type="button" onClick={agregarMedicamento}>Agregar</button>
          <div className="medicamentos-seleccionados">
  <h3>Plan de tratamiento</h3>
  <div className="medicamentos-lista">
    {medicamentosSeleccionados.map((medicamento) => (
      <div key={medicamento.nombre} className="medicamento-item">
        <span>
          {medicamento.nombre} ({medicamento.dosis}) - Método: {medicamento.metodoAdministracion} - 
          Duración: {medicamento.duracion} días
        </span>
        <button type="button" onClick={() => eliminarMedicamento(medicamento)}>
          Eliminar
        </button>
      </div>
    ))}
  </div>
</div>

          <h2></h2>
          <div className="form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => navigate("/vista-medico")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroHistoria;