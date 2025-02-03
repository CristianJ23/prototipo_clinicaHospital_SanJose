import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Gestion.css";
import axios from "axios";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import gestion from "../img2/gestion.png";
import home from "../img2/home.png";

const Gestion = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [historias, setHistorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [maxHistorias, setMaxHistorias] = useState(10);
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroMes, setFiltroMes] = useState("");

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const buscarHistoria = async (cedula) => {
    try {
      const response = await axios.get(`http://localhost:8000/kriss/buscarHistoria/${cedula}`);
      if (response.data) {
        setPaciente(response.data.paciente);
        setHistorias(response.data.historiasClinicas);
        setMensaje(response.data.historiasClinicas.length === 0
          ? "No se encontraron historias clínicas para este paciente."
          : "");
      } else {
        setMensaje("No se encontraron datos para esta cédula.");
        setPaciente(null);
        setHistorias([]);
      }
    } catch (error) {
      console.error("Error al buscar la información:", error);
      setMensaje("Hubo un error al realizar la búsqueda. Por favor, inténtelo de nuevo.");
      setPaciente(null);
      setHistorias([]);
    }
  };

  const filtrarHistorias = (historias) => {
    return historias.filter((historia) => {
      const fecha = new Date(historia.fecha_creacion);
      const anio = fecha.getFullYear().toString();
      const mes = (fecha.getMonth() + 1).toString();
      return (
        (filtroAnio === "" || anio === filtroAnio) &&
        (filtroMes === "" || mes === filtroMes)
      );
    });
  };

  const historiasFiltradas = filtrarHistorias(historias)
    .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
    .slice(0, maxHistorias);

  return (
    <div className="gestion">
      {/* Contenedor del menú */}
      <div className="menu-container">
        <aside className="sidebar">
          <h2 className="sidebar-title">Menú</h2>
          <nav>
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
          </nav>
        </aside>
      </div>

      {/* Contenedor principal */}
      <div className="main-content-container">
        <main className="content">
          <h1>Gestión de Historias Clínicas</h1>

          {/* Contenedor de búsqueda */}
          <div className="search-container">
            <section className="busqueda-container">
              <h2>Buscar Paciente</h2>
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
            </section>

            {/* Filtros adicionales */}
            <section className="filtros-container">
              <h2>Filtros</h2>
              <label>
                Máximo de historias a mostrar:
                <input
                  type="range"
                  value={maxHistorias}
                  onChange={(e) => setMaxHistorias(e.target.value)}
                  min="1"
                  max="20"
                />
                <span>{maxHistorias}</span>
              </label>
              <label>
                Año:
                <input
                  type="text"
                  value={filtroAnio}
                  onChange={(e) => setFiltroAnio(e.target.value)}
                  placeholder="Ingrese el año"
                />
              </label>
              <label>
                Mes:
                <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
                  <option value="">Todos</option>
                  {meses.map((mes, index) => (
                    <option key={index} value={index + 1}>{mes}</option>
                  ))}
                </select>
              </label>
            </section>

            {/* Mensaje informativo */}
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </div>

          {/* Contenedor de historias */}
          <div className="historias-container">
            {paciente && (
              <section className="paciente-info">
                <h2>Historias Encontradas:</h2>
                <div className="historias-grid">
                  {historiasFiltradas.map((historia) => (
                    <div
                      key={historia.id}
                      className="modulo historia"
                      onClick={() => navigate(`/mostrar/${paciente.id_paciente}/${historia.id_historia}`)}
                    >
                      <h3>{`Número de historia: ${historia.id_historia}`}</h3>
                      <p>{`Fecha de Creación: ${historia.fecha_creacion}`}</p>
                      <p>{`Antecedentes: ${historia.antecedentesPatologicosPersonales}`}</p>
                      <p>{`Motivo de Consulta: ${historia.motivoConsulta}`}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gestion;
