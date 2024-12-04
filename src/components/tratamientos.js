import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paci from "../img2/paciente_p.jpg";
import '../css/Tratamientos.css';

const Tratamientos = ({onCancel}) => {
  const [paciente, setPaciente] = useState(null);
  const [editando, setEditando] = useState(false);
  const [tratamientoModificado, setTratamientoModificado] = useState('');
  const navigate = useNavigate();

  const pacienteEstructura = {
    cedula: '',
    nombre: '',
    edad: '',
    sexo: '',
    enfermedadActual: '',
    tratamiento: ''
  };

  useEffect(() => {
    const obtenerPaciente = async (cedula) => {
      try {
        const response = await fetch(`http://localhost:8000/paciente/${cedula}`);
        const data = await response.json();
        setPaciente(data);
      } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
      }
    };

    obtenerPaciente('1234567890');
  }, []);

  const handleEditar = () => {
    setEditando(true);
    setTratamientoModificado(paciente.tratamiento);
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch('http://localhost:8000/modificarTratamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_medico: 1,
          id_historia: paciente.id_historia,
          tratamiento: tratamientoModificado,
          detalles: 'Detalles adicionales sobre el tratamiento',
        }),
      });

      if (response.ok) {
        alert('Modificación guardada con éxito');
        setEditando(false);
      } else {
        alert('Error al guardar la modificación');
      }
    } catch (error) {
      console.error('Error al guardar la modificación:', error);
    }
  };

  const handleVolver = () => {
    navigate('/inicio_medico'); // Aquí se hace la navegación correcta
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Historia Clínica de Paciente</h1>
        <div className="imagen-container">
          <img
            src={Paci}
            alt="Imagen de Historia Clínica"
            className="imagen-grande"
          />
        </div>
      </div>

      <div className="formulario">
        <div className="campo">
          <label>Cédula:</label>
          <input type="text" value={paciente ? paciente.cedula : pacienteEstructura.cedula} disabled />
        </div>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" value={paciente ? paciente.nombre : pacienteEstructura.nombre} disabled />
        </div>
        <div className="campo">
          <label>Edad:</label>
          <input type="number" value={paciente ? paciente.edad : pacienteEstructura.edad} disabled />
        </div>
        <div className="campo">
          <label>Sexo:</label>
          <input type="text" value={paciente ? paciente.sexo : pacienteEstructura.sexo} disabled />
        </div>
        <div className="campo">
          <label>Enfermedad Actual:</label>
          <input type="text" value={paciente ? paciente.enfermedadActual : pacienteEstructura.enfermedadActual} disabled />
        </div>
        <div className="campo">
          <label>Tratamiento:</label>
          <input
            type="text"
            value={tratamientoModificado || (paciente ? paciente.tratamiento : pacienteEstructura.tratamiento)}
            disabled={!editando}
            onChange={(e) => setTratamientoModificado(e.target.value)}
          />
        </div>

        <div className="boton-container">
          {editando ? (
            <>
              <button onClick={handleGuardar} className="btn btn-guardar">
                Guardar
              </button>
              <button type="button" onClick={onCancel} className="btn btn-volver-cancelar">
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEditar} className="btn btn-editar">
                Modificar
              </button>
              {/* El botón Volver está debajo de Modificar */}
              <button onClick={handleVolver} className="btn btn-volver">
                Volver
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tratamientos;
