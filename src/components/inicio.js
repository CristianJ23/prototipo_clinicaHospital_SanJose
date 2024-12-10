import React, { useState } from "react";
import "../css/inicio.css";
import Vista_medico from "../components/inicio_medico";
import Tratamientos from "./tratamientos";
import CrearPaciente from "./Crear_paciente";
import CreateRols from "./crearRoles/createRols";
import { useNavigate } from 'react-router-dom';



// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";
import crearUsuarioImg from "../img2/usuario.png";
import headerImage from "../img2/image.png";

const Inicio = () => {
  const [activeForm, setActiveForm] = useState(null); // Estado para controlar qué formulario mostrar
  const navigate = useNavigate();

  // Renderizar el formulario según el estado activo
  // const renderForm = () => {
  //   switch (activeForm) {
  //     case "crearPaciente":
  //       return <Vista_medico onCancel={() => setActiveForm(null)} />;
  //     case "tratamiento":
  //       return <Tratamientos onCancel={() => setActiveForm(null)} />;
  //     case "tratante":
  //       return <CrearPaciente onCancel={() => setActiveForm(null)} />;
  //     case "createRols":
  //       return <CreateRols onCancel={() => setActiveForm(null)} />;
  //   }
  // };

  return (
    <div className="inicio-container">
      {/* {!activeForm ? ( */}
      <>
        <nav className="navbar">
          <ul className="nav-items">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#Vista medico">Vista Medico</a></li>
            <li><a href="#tratamiento">Vista enfermera</a></li>
            <li><a href="#tratante">Vista tratante</a></li>
            <li><a href="#crear-usuario">Crear Usuario</a></li>
            <li><a href="#crear-roles">Crear roles</a></li>
          </ul>
        </nav>

        <div className="header">
          <img src={headerImage} alt="Header" className="header-image" />
        </div>
        <div className="modulos-container">
          <div
            className="modulo"
            // onClick={() => setActiveForm("crearPaciente")}
            onClick={() => navigate('/inicio_medico')} // Redirige a la página 'crear-paciente'
          >
            <img src={crearPacienteImg} alt="Crear Paciente" />
            <p>Vista Medico</p>
          </div>
          <div
            className="modulo"
            // onClick={() => setActiveForm("tratamiento")}
            onClick={() => navigate('/tratamiento')} // Redirige a la página 'crear-paciente'
          >
            <img src={gestionHistoriasImg} alt="Gestión Historias" />
            <p>Vista Enfermera</p>
          </div>
          <div className="modulo"
            onClick={() => navigate('/tratamiento')} // Redirige a la página 'crear-paciente'
          >
            <img src={tratamientosImg} alt="tratamiento" />
            <p>Tratamientos</p>
          </div>
          <div className="modulo"
            // onClick={() => setActiveForm("tratante")}
            onClick={() => navigate('/crear_paciente')} // Redirige a la página 'tratamiento'
          >
            <img src={crearUsuarioImg} alt="Crear Usuario" />
            <p>Crear Usuario</p>
          </div>

          {/* crear roles */}
          <div className="modulo"
            onClick={() => navigate('/crear_rol')} // Redirige a la página 'tratamiento'
          >
            <img src={crearUsuarioImg} alt="Crear Usuario" />
            <p>Crear Roles</p>
          </div>


        </div>
      </>
      {/* ) : (
        renderForm()
      )} */}
    </div>
  );
};

export default Inicio;
