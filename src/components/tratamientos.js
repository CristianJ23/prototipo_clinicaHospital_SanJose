import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Tratamientos.css';
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";

const Tratamientos = ({ onCancel }) => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState("");
  const [paciente, setPaciente] = useState({
    cedula: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    medico_nombre: "",
    medico_apellido: "",
    alergias: "", // Añadir alergias
    tratamiento: {
      medicamentos: "",  // Medicamentos
      suministracion: "",  // Suministración
    },
  });
  const [editando, setEditando] = useState(false);
  const [tratamientoModificado, setTratamientoModificado] = useState({
    medicamentos: "",
    suministracion: "",
  });
  const navigate = useNavigate();

  // Manejar la búsqueda de un paciente
  const handleBuscarPaciente = async () => {
    if (!cedulaBusqueda.trim()) {
      alert("Por favor, ingrese una cédula válida.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/paciente/${cedulaBusqueda}`);
      if (response.ok) {
        const data = await response.json();
        setPaciente(data);
        setTratamientoModificado({
          medicamentos: data.tratamiento.medicamentos,
          suministracion: data.tratamiento.suministracion,
        });
      } else {
        alert("No se encontró ningún paciente con la cédula proporcionada.");
        setPaciente({
          cedula: "",
          primer_nombre: "",
          segundo_nombre: "",
          primer_apellido: "",
          segundo_apellido: "",
          medico_nombre: "",
          medico_apellido: "",
          alergias: "",
          tratamiento: {
            medicamentos: "",
            suministracion: "",
          },
        });
      }
    } catch (error) {
      console.error("Error al buscar el paciente:", error);
    }
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch('http://localhost:8000/modificarTratamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_medico: paciente.id_medico,
          id_historia: paciente.id_historia,
          tratamiento: tratamientoModificado,
        }),
      });

      if (response.ok) {
        alert("Modificación guardada con éxito");
        setEditando(false);
      } else {
        alert("Error al guardar la modificación");
      }
    } catch (error) {
      console.error("Error al guardar la modificación:", error);
    }
  };

  const handleVolver = () => {
    navigate('/inicio_medico');
  };

  return (
    <div className="tratamientos">
      <div className="main-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <div className="modulo"  onClick={() => navigate("/crear-paciente")}>
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

        <div className="content-container">
          <div className="busqueda-container">
            <h1>Historia Clínica de Paciente</h1>
            <label>Cédula del Paciente:</label>
            <input
              type="text"
              value={cedulaBusqueda}
              onChange={(e) => setCedulaBusqueda(e.target.value)}
            />
            <button onClick={handleBuscarPaciente} className="btn btn-buscar">
              Buscar
            </button>
          </div>

          <div className="formulario">
            <div className="campo">
              <label>Cédula:</label>
              <input type="text" value={paciente.cedula} disabled />
            </div>
            <div className="campo">
              <label>Primer Nombre:</label>
              <input type="text" value={paciente.primer_nombre} disabled />
            </div>
            <div className="campo">
              <label>Segundo Nombre:</label>
              <input type="text" value={paciente.segundo_nombre} disabled />
            </div>
            <div className="campo">
              <label>Primer Apellido:</label>
              <input type="text" value={paciente.primer_apellido} disabled />
            </div>
            <div className="campo">
              <label>Segundo Apellido:</label>
              <input type="text" value={paciente.segundo_apellido} disabled />
            </div>
            <div className="campo">
              <label>Médico Responsable:</label>
              <input type="text" value={`${paciente.medico_nombre} ${paciente.medico_apellido}`} disabled />
            </div>
            <div className="campo">
              <label>Alergias:</label>
              <input type="text" value={paciente.alergias} disabled />
            </div>
            <div className="campo">
              <label>Medicamentos:</label>
              <textarea
                value={editando ? tratamientoModificado.medicamentos : paciente.tratamiento.medicamentos}
                disabled={!editando}
                onChange={(e) => setTratamientoModificado({ ...tratamientoModificado, medicamentos: e.target.value })}
              />
            </div>
            <div className="campo">
              <label>Suministración:</label>
              <textarea
                value={editando ? tratamientoModificado.suministracion : paciente.tratamiento.suministracion}
                disabled={!editando}
                onChange={(e) => setTratamientoModificado({ ...tratamientoModificado, suministracion: e.target.value })}
              />
            </div>

            <div className="boton-container">
              {editando ? (
                <>
                  <button onClick={handleGuardar} className="btn btn-guardar">
                    Guardar
                  </button>
                  <button onClick={() => setEditando(false)} className="btn btn-cancelar">
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEditar} className="btn btn-editar">
                    Modificar
                  </button>
                  <button onClick={handleVolver} className="btn btn-volver">
                    Volver
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tratamientos;
