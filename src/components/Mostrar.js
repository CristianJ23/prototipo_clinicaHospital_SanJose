import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Mostrar.css";

const Mostrar = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID de la historia clínica
  const [historia, setHistoria] = useState(null);
  const [tratamientos, setTratamientos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState("");
  const [cargando, setCargando] = useState(true);

  // Obtener los detalles de la historia clínica y tratamientos asociados
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/kriss/buscarTratamientosPorHistoria/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          const { tratamientos, historia } = data; // Estructura recibida del backend
          setHistoria(historia);
          setTratamientos(tratamientos);
        } else {
          console.error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [id]);

  // Función para agregar un nuevo tratamiento
  const agregarTratamiento = async () => {
    if (!nuevoMedicamento.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8000/kriss/tratamiento/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre: nuevoMedicamento.trim() }),
        }
      );

      if (response.ok) {
        const nuevoTratamiento = await response.json();
        setTratamientos([...tratamientos, nuevoTratamiento]);
        setNuevoMedicamento("");
      } else {
        alert("Error al agregar el tratamiento.");
      }
    } catch (error) {
      console.error("Error al agregar el tratamiento:", error);
    }
  };

  // Función para modificar un tratamiento
  const modificarTratamiento = (tratamiento) => {
    navigate(`/modificar-tratamiento/${tratamiento.id}`);
  };

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="mostrar">
      <h1>Detalles de la Historia Clínica</h1>
      {historia ? (
        <div className="detalle">
          {Object.entries(historia).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value !== null ? value : "No especificado"}
            </p>
          ))}
        </div>
      ) : (
        <p>No se encontraron detalles para esta historia clínica.</p>
      )}

      <h2>Tratamientos</h2>
      {tratamientos.length > 0 ? (
        <ul>
          {tratamientos.map((tratamiento) => (
            <li key={tratamiento.id_tratamiento}>
              {Object.entries(tratamiento).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value !== null ? value : "No especificado"}
                </p>
              ))}
              <button onClick={() => modificarTratamiento(tratamiento)}>
                Modificar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tratamientos registrados para esta historia clínica.</p>
      )}

      <div className="nuevo-tratamiento">
        <h3>Agregar Nuevo Tratamiento</h3>
        <input
          type="text"
          value={nuevoMedicamento}
          onChange={(e) => setNuevoMedicamento(e.target.value)}
          placeholder="Nombre del medicamento"
        />
        <button onClick={agregarTratamiento}>Agregar</button>
      </div>

      <div className="acciones">
        <button onClick={() => navigate("/gestion")}>Regresar</button>
      </div>
    </div>
  );
};

export default Mostrar;
