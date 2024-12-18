import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Gestion.css";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";

const Gestion = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [historias, setHistorias] = useState([]);

  // Función para buscar las historias clínicas
  const buscarHistorias = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8000/kriss/buscarHistorias/${cedula}`);
      const result = await response.json();
      if (response.ok) {
        setHistorias(result);
      } else {
        alert("No se encontraron historias para esta cédula.");
      }
    } catch (error) {
      console.error("Error al buscar historias:", error);
    }
  };

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
        <form onSubmit={buscarHistorias}>
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

        <div className="historias-lista">
          {historias.map((historia) => (
            <div
              key={historia.id}
              className="modulo"
              onClick={() => navigate(`/mostrar/${historia.id}`)}
            >
              <h3>{`Historia Clínica - Cédula: ${historia.cedula}`}</h3>
              <p>{`Motivo de Consulta: ${historia.motivoConsulta}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gestion;
