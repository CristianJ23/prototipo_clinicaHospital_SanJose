import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Mostrar.css";

const Mostrar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [historia, setHistoria] = useState(null);
  const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState([]);
  
  // Obtener los detalles de la historia clínica
  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const response = await fetch(`http://localhost:8000/kriss/buscarHistoriaPorCedula/${id}`);
        const result = await response.json();
        setHistoria(result);
        setMedicamentosSeleccionados(result.tratamiento.medicamentos || []);
      } catch (error) {
        console.error("Error al obtener la historia clínica:", error);
      }
    };
    fetchHistoria();
  }, [id]);

  // Función para modificar el tratamiento
  const modificarTratamiento = async () => {
    try {
      const response = await fetch(`http://localhost:8000/kriss/actualizarTratamiento/${historia.tratamientoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...historia.tratamiento,
          medicamentos: medicamentosSeleccionados,
        }),
      });

      if (response.ok) {
        alert("Tratamiento actualizado");
      } else {
        alert("Error al actualizar tratamiento");
      }
    } catch (error) {
      console.error("Error al modificar tratamiento:", error);
    }
  };

  // Función para agregar un medicamento al tratamiento
  const agregarMedicamento = (medicamento) => {
    setMedicamentosSeleccionados([...medicamentosSeleccionados, medicamento]);
  };

  // Función para eliminar un medicamento del tratamiento
  const eliminarMedicamento = (medicamento) => {
    setMedicamentosSeleccionados(
      medicamentosSeleccionados.filter((item) => item.nombre !== medicamento.nombre)
    );
  };

  if (!historia) return <div>Cargando...</div>;

  return (
    <div className="mostrar">
      <h1>Detalles de la Historia Clínica</h1>
      <div className="detalle">
        <p><strong>Cédula:</strong> {historia.cedula}</p>
        <p><strong>Motivo de Consulta:</strong> {historia.motivoConsulta}</p>
        <p><strong>Antecedentes Patológicos:</strong> {historia.antecedentesPatologicosPersonales}</p>
        <h2>Tratamiento</h2>
        <ul>
          {medicamentosSeleccionados.map((medicamento, index) => (
            <li key={index}>
              {medicamento.nombre} - {medicamento.dosis}
              <button onClick={() => eliminarMedicamento(medicamento)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <button onClick={modificarTratamiento}>Modificar Tratamiento</button>
      </div>

      <div className="acciones">
        <button onClick={() => navigate("/gestion")}>Cancelar</button>
      </div>
    </div>
  );
};

export default Mostrar;
