import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/registroHistoria.css";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";
import debounce from 'lodash.debounce';
import axios from "axios";

const RegistroHistoria = ({ onCancel }) => {
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();  // Hook para navegación programática
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    institucionSistema: "",
    establecimientoSalud: "",
    motivoConsulta: "",
    antecedentesPatologicosPersonales: "",
    constantesVitales: {
      hora: "",
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
      medicamentos: [],  // Ahora es un array de objetos
    },
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
          metodoAdministracion: formData.tratamiento.metodoAdministracion,  // Asociar el método
        };
        setMedicamentosSeleccionados([...medicamentosSeleccionados, nuevoMedicamento]);
        setFormData({
          ...formData,
          tratamiento: {
            ...formData.tratamiento,
            medicamentos: "",
            metodoAdministracion: "",
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
      debouncedBuscarPacientePorCedula(value); // Llamada al debounced function
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
  /* codigo para recibir los datos del paciente deacuerdo a su numero de cedula */
  const buscarPacientePorCedula = async (cedula) => {
    try {
      const response = await axios.get(`http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`);

      if (response.data) {
        setPaciente(response.data);
        setMensaje("");

      } else {
        setMensaje("Persona no encontrada.");
        setPaciente(null);
      }
    } catch (error) {
      setMensaje("Error al buscar la persona.");
      setPaciente(null);
    }
  };

  // useEffect(() => {
  //   if (paciente) {
  //     console.log("paciente : ", paciente.primer_apellido); // Imprime el paciente cuando se actualiza el estado
  //   }
  // }, [paciente]); // Solo se ejecuta cuando paciente cambia

  // Usar debounce para evitar múltiples peticiones rápidas al backend
  const debouncedBuscarPacientePorCedula = debounce((cedula) => {
    if (cedula) {
      buscarPacientePorCedula(cedula); // Llamada al backend solo después del debounce
    }
  }, 500); // El tiempo de espera de 500 ms entre llamadas

  /*fin codigo para busqueda por cedula*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Primero, enviar el tratamiento
      const tratamientoResponse = await fetch("http://localhost:8000/kriss/crearTratamiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.tratamiento),
      });

      if (!tratamientoResponse.ok) {
        throw new Error("Error al crear tratamiento");
      }
      const tratamientoResult = await tratamientoResponse.json();
      const tratamientoId = tratamientoResult.id;

      // Luego, crear la historia clínica con el ID del tratamiento
      const historiaConTratamiento = {
        ...formData,
        tratamientoId, // Agregar el ID del tratamiento a la historia clínica
      };

      const historiaResponse = await fetch("http://localhost:8000/kriss/crearHistoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historiaConTratamiento),
      });

      if (!historiaResponse.ok) {
        throw new Error("Error al crear historia clínica");
      }

      const historiaResult = await historiaResponse.json();
      console.log("Historia clínica guardada con éxito:", historiaResult);

    } catch (error) {
      console.error("Error en el proceso:", error);
    }
  };


  const examenesFisicos = [
    "Cabeza",
    "Cuello",
    "Tórax",
    "Abdomen",
    "Extremidades",
    "Piel",
    "Sistema Linfático",
    "Sistema Nervioso",
    "Cardiovascular",
    "Respiratorio",
  ];

  const organosYSistemas = [
    "Órganos de los Sentidos",
    "Respiratorio",
    "Cardiovascular",
    "Digestivo",
    "Urinario",
    "Músculo Esquelético",
    "Endocrino",
    "Nervioso",
  ];

  return (
    <div className="registro-historia">
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
        <div className="modulo" onClick={() => navigate("/tratamientos")}>
          <img src={tratamientosImg} alt="Tratamiento" />
          <p>Tratamiento</p>
        </div>
      </div>

      <div className="form-container">
        <h1>Registro de Historia Clínica</h1>
        <form onSubmit={handleSubmit}>
          <h2>Datos del Paciente</h2>
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
              value={paciente ? paciente.primer_nombre + " " + paciente.segundo_nombre : ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos"
              value={paciente ? paciente.primer_apellido + " " + paciente.segundo_apellido: ""}
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
          <label>
            Hora:
            <input
              type="text"
              name="hora"
              value={formData.constantesVitales.hora}
              onChange={(e) => handleNestedChange("constantesVitales", "hora", e.target.value)}
            />
          </label>
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

            <button type="button" onClick={agregarMedicamento}>Agregar</button>
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
          <div className="medicamentos-seleccionados">
            <h3>Plan de tratamiento</h3>
            <div className="medicamentos-lista">
              {medicamentosSeleccionados.map((medicamento) => (
                <div key={medicamento.nombre} className="medicamento-item">
                  <span>
                    {medicamento.nombre} ({medicamento.dosis}) - Método: {medicamento.metodoAdministracion}
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
