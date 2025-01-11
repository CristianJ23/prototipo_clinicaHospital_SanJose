import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Gestion.css";
import axios from "axios";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";
import PersonalTable from "./PersonalTable";


const Gestion = () => {
  
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [persona, setPersona] = useState(null); // Para almacenar la persona encontrada
  const [paciente, setPaciente] = useState(null); // Para almacenar el paciente encontrado
  const [historias, setHistorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Función para buscar la persona, paciente y sus historias clínicas con una sola API
  const buscarHistoria = async (cedula) => {
    try {
      // Llamada a la API que busca la persona, el paciente y las historias clínicas
      const response = await axios.get(`http://localhost:8000/kriss/buscarHistoria/${cedula}`);

      if (response.data) {
        setPersona(response.data.persona);
        setPaciente(response.data.paciente);
        setHistorias(response.data.historiasClinicas);
        setMensaje(""); // Limpiar el mensaje de error

        if (response.data.historiasClinicas.length === 0) {
          setMensaje("No se encontraron historias clínicas para este paciente.");
        }
      } else {
        setMensaje("No se encontraron datos para esta cédula.");
        setPersona(null);
        setPaciente(null);
        setHistorias([]);
      }
    } catch (error) {
      console.error("Error al buscar la información:", error);
      setMensaje("Hubo un error al realizar la búsqueda. Por favor, inténtelo de nuevo.");
      setPersona(null);
      setPaciente(null);
      setHistorias([]);
    }
  };

  /**informacion para la tabla */
  const columns = [
    {
        Header: 'ID Historia',
        accessorKey: 'id_historia', // Esta es la clave que viene del backend
    },
    {
        Header: 'Motivo de Consulta',
        accessorKey: 'motivoConsulta',
    },
    {
        Header: 'motivo consulta',
        accessorKey: 'motivoConsulta',
    },
    {
        Header: 'Fecha',
        accessorKey: 'fecha_creacion',
    },
    // Añadir más columnas según sea necesario
];

  

  return (
    <div className="gestion">
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
        <div className="modulo" onClick={() => navigate("/tratamientos")}>
          <img src={tratamientosImg} alt="Tratamiento" />
          <p>Tratamiento</p>
        </div>
      </div>

      {/* Contenedor para el contenido */}
      <div className="content">
        <h1>Gestión de Historias Clínicas</h1>
        <form onSubmit={(e) => { e.preventDefault(); buscarHistoria(cedula); }}>
          <label>
            Cédula:
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese la cédula"
            />
          </label>
          <button type="submit">Buscar</button>
        </form>

        {/* Mensaje de error o informativo */}
        {mensaje && <p className="mensaje">{mensaje}</p>}

        {/* Mostrar la persona y el paciente encontrados */}
        {persona && (
          <div className="persona-info">
            <h2>Persona Encontrada:</h2>
            <p><strong>Nombre:</strong> {persona.nombre} {persona.apellido}</p>
            <p><strong>Cédula:</strong> {persona.numero_documento}</p>
          </div>
        )}

        {paciente && (
          <div className="paciente-info">
            <h2>Historias Encontradas:</h2>
          </div>
        )}

                {/* Mostrar las historias clínicas en la tabla */}
                <PersonalTable data={historias} columns={columns} />
      </div>

        {/* Lista de historias clínicas */}
        {/* <div className="historias-lista">
          {historias.map((historia) => (
            <div
              key={historia.id}
              className="modulo"
              onClick={() => navigate(`/mostrar/${historia.id_historia}`)}
            >
              <h3>{`Numero de historia: ${historia.id_historia}`}</h3>
              <p>{`Antecedentes: ${historia.antecedentesPatologicosPersonales}`}</p>
              <p>{`Motivo de Consulta: ${historia.motivoConsulta}`}</p>
            </div>
          ))}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Gestion;
