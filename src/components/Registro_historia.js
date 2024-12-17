import React, { useState, useEffect } from "react";
import "../css/registroHistoria.css";

import Vista_medico from "../components/inicio_medico";
// import CrearHistoria from "../components/inicio_enfermera";
import Tratamiento from "../components/tratamientos";
import Paci from "../img2/paciente_p.jpg";
// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";
import debounce from 'lodash.debounce';
import axios from "axios";



const RegistroHistoria = ({ onCancel }) => {
  // const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    institucionSistema: "",
    unicodigo: "",
    establecimientoSalud: "",
    numeroHistoriaUnica: "",
    numeroArchivo: "",
    numeroHoja: "",
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
      medicamentos: "",
      metodoAdministracion: "",
    },
    datosProfesional: {
      fechaAtencion: "",
      horaAtencion: "",
      nombresApellidosProfesional: "",
      numeroDocumentoProfesional: "",
      firma: "",
      sello: "",
    },
  });

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



  const handleSubmitTratamiento = async (e) => {
    e.preventDefault();
    try {
      // Enviar el tratamiento a la API
      const response = await fetch("http://localhost:8000/kriss/crearTratamiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.tratamiento),
      });
      const result = await response.json();
      setTratamientoId(result.id); // Asumimos que la API retorna el ID del tratamiento
    } catch (error) {
      console.error("Error al crear tratamiento:", error);
    }
  };

  const handleSubmitHistoria = async (e) => {
    e.preventDefault();
    try {
      // Enviar la historia clínica a la API, incluyendo el ID del tratamiento
      const historiaConTratamiento = {
        ...formData,
        tratamientoId, // Agregar el ID del tratamiento a la historia clínica
      };
      const response = await fetch("http://localhost:8000/kriss/crearHistoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historiaConTratamiento),
      });
      const result = await response.json();
      console.log("Historia clínica guardada con éxito:", result);
    } catch (error) {
      console.error("Error al crear historia clínica:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <a href="#" className="modulo">
          <img src={crearPacienteImg} alt="Registro de Paciente" />
          <p>Registro de Paciente</p>
        </a>
        {/* <a href={CrearHistoria} className="modulo">
          <img src={gestionHistoriasImg} alt="Registro de Historia" />
          <p>Registro de Historia</p>
        </a> */}
        <a href={Tratamiento} className="modulo">
          <img src={tratamientosImg} alt="Tratamiento" />
          <p>Tratamiento</p>
        </a>
      </div>

      <div className="form-container">
        <h1>Registro de Historia Clínica</h1>
        <form onSubmit={handleSubmit}>
          <h2>Datos del Paciente</h2>
          <label>
            Cédula:
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores */}

          <label>
          Nombres:
          <input
            type="text"
            name="nombres"
            value={paciente ? paciente.primer_nombre : ""}
            onChange={handleInputChange}
          />
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos" 
            value={paciente ? paciente.primer_apellido : ""} 
            onChange={handleInputChange} />
          </label>
          <label>
            Institución del Sistema:
            <input type="text" name="institucionSistema" value={formData.institucionSistema} onChange={handleInputChange} />
          </label>
          <label>
            Unicódigo:
            <input type="text" name="unicodigo" value={formData.unicodigo} onChange={handleInputChange} />
          </label>
          <label>
            Establecimiento de Salud:
            <input type="text" name="establecimientoSalud" value={formData.establecimientoSalud} onChange={handleInputChange} />
          </label>
          <label>
            Número de Historia Clínica:
            <input type="text" name="numeroHistoriaUnica" value={formData.numeroHistoriaUnica} onChange={handleInputChange} />
          </label>
          <label>
            Número de Archivo:
            <input type="text" name="numeroArchivo" value={formData.numeroArchivo} onChange={handleInputChange} />
          </label>
          <label>
            Número de Hoja:
            <input type="text" name="numeroHoja" value={formData.numeroHoja} onChange={handleInputChange} />
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
              onChange={(e) => handleNestedChange("tratamiento", "medicamentos", e.target.value)}
            />
          </label>
          <label>
            Método de Administración:
            <input
              type="text"
              name="metodoAdministracion"
              value={formData.tratamiento.metodoAdministracion}
              onChange={(e) => handleNestedChange("tratamiento", "metodoAdministracion", e.target.value)}
            />
          </label>

          <h2>Datos del Profesional Responsable</h2>
          <label>
            Fecha de la Atención:
            <input
              type="date"
              name="fechaAtencion"
              value={formData.datosProfesional.fechaAtencion}
              onChange={(e) => handleNestedChange("datosProfesional", "fechaAtencion", e.target.value)}
            />
          </label>
          <label>
            Hora de la Atención:
            <input
              type="time"
              name="horaAtencion"
              value={formData.datosProfesional.horaAtencion}
              onChange={(e) => handleNestedChange("datosProfesional", "horaAtencion", e.target.value)}
            />
          </label>
          <label>
            Nombres y Apellidos del Profesional:
            <input
              type="text"
              name="nombresApellidosProfesional"
              value={formData.datosProfesional.nombresApellidosProfesional}
              onChange={(e) => handleNestedChange("datosProfesional", "nombresApellidosProfesional", e.target.value)}
            />
          </label>
          <label>
            Número de Documento de Identificación:
            <input
              type="text"
              name="numeroDocumentoProfesional"
              value={formData.datosProfesional.numeroDocumentoProfesional}
              onChange={(e) => handleNestedChange("datosProfesional", "numeroDocumentoProfesional", e.target.value)}
            />
          </label>
          <label>
            Firma:
            <input
              type="text"
              name="firma"
              value={formData.datosProfesional.firma}
              onChange={(e) => handleNestedChange("datosProfesional", "firma", e.target.value)}
            />
          </label>
          <label>
            Sello:
            <input
              type="text"
              name="sello"
              value={formData.datosProfesional.sello}
              onChange={(e) => handleNestedChange("datosProfesional", "sello", e.target.value)}
            />
          </label>

          <div className="form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroHistoria;
