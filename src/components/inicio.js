import React, { useState } from "react";
import "../css/inicio.css";
import CrearPaciente from "../components/Crear_paciente";

// Importar las imágenes
import crearPacienteImg from "../img2/usuario.png";
import gestionHistoriasImg from "../img2/historia.png";
import tratamientosImg from "../img2/tratamiento.png";

const Inicio = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="inicio-container">
      {!showForm ? (
        <>
          <h1>¡Bienvenido a la Clínica San José!</h1>
          <p>
            Elija una acción según sus necesidades haciendo clic en la opción
            correspondiente para continuar.
          </p>
          <div className="modulos-container">
            <div
              className="modulo"
              onClick={() => setShowForm(true)} // Muestra el formulario
            >
              <img src={crearPacienteImg} alt="Crear Paciente" />
              <p>Crear Paciente</p>
            </div>
            <div className="modulo">
              <img src={gestionHistoriasImg} alt="Gestión Historias" />
              <p>Gestión de Historias</p>
            </div>
            <div className="modulo">
              <img src={tratamientosImg} alt="Tratamientos" />
              <p>Tratamientos</p>
            </div>
          </div>
        </>
      ) : (
        <CrearPaciente onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Inicio;
