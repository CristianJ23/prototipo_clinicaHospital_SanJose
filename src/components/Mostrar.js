import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Mostrar.css";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import gestion from "../img2/gestion.png";
import home from "../img2/home.png";

// Función para guardar la modificación
const guardarModificacion = async (detalles, idHistoria) => {
  try {
    const response = await fetch("http://localhost:8000/api/getMedicoId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const idMedico = data.id_medico; // ID del médico

    const responseModificacion = await fetch("http://localhost:8000/api/guardarModificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_historia: idHistoria,
        id_medico: idMedico,
        detalles: detalles,
      }),
    });
    const dataModificacion = await responseModificacion.json();
    console.log("Modificación guardada:", dataModificacion);
  } catch (error) {
    console.error("Error al guardar la modificación:", error);
  }
};

// Componente principal Mostrar
const Mostrar = () => {
  const navigate = useNavigate();
  const { idPaciente, idHistoria } = useParams(); // Obtener idPaciente y idHistoria
  const [formData, setFormData] = useState({
    motivoConsulta: "",
    antecedentesPatologicosPersonales: "",
    examenFisico: {
      seleccionados: [],
      observacion: "",
    },
    revisionOrganosYSystems: {
      seleccionados: [],
      observacion: "",
    },
    tratamiento: {
      medicamentos: [],
    },
    constantesVitales: {
      presionArterial: "",
      peso: "",
      talla: "",
      imc: "",
      perimetroAbdominal: "",
      glucosaCapilar: "",
      hemoglobinaCapilar: "",
      pulsioximetria: "",
    },
  });
  const [cargando, setCargando] = useState(true);

  // Efecto para cargar datos desde la API
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/kriss/buscarTratamientosPorHistoria/${idHistoria}`);
        if (response.ok) {
          const data = await response.json();
          const { historia, tratamientos } = data;

          const groupedTratamientos = tratamientos.reduce((acc, plan) => {
            if (!acc[plan.planTratamiento.id_plan_tratamiento]) {
              acc[plan.planTratamiento.id_plan_tratamiento] = {
                planTratamiento: plan.planTratamiento,
                medicamentos: plan.tratamientos,
              };
            } else {
              acc[plan.planTratamiento.id_plan_tratamiento].medicamentos.push(...plan.tratamientos);
            }
            return acc;
          }, {});

          const tratamientosOrdenados = Object.values(groupedTratamientos).map((plan, index) => ({
            ...plan,
            numero: index + 1,
          }));

          setFormData({
            motivoConsulta: historia.motivoConsulta,
            antecedentesPatologicosPersonales: historia.antecedentesPatologicosPersonales,
            examenFisico: {
              seleccionados: [
                historia.cabeza && "Cabeza",
                historia.torax && "Tórax",
              ].filter(Boolean),
              observacion: historia.observacion_fisica || "No especificado",
            },
            revisionOrganosYSystems: {
              seleccionados: [
                historia.organos_sentidos && "Órganos de los Sentidos",
                historia.respiratorio && "Respiratorio",
                historia.cardio_vacular && "Cardiovascular",
              ].filter(Boolean),
              observacion: historia.observacion_organos || "No especificado",
            },
            tratamiento: {
              medicamentos: tratamientosOrdenados,
            },
            constantesVitales: {
              presionArterial: historia.presionArterial,
              peso: historia.peso,
              talla: historia.talla,
              imc: historia.imc,
              perimetroAbdominal: historia.perimetroAbdominal,
              glucosaCapilar: historia.glucosaCapilar,
              hemoglobinaCapilar: historia.hemoglobinaCapilar,
              pulsioximetria: historia.pulsioximetria,
            },
          });
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
  }, [idHistoria]);

  // Función para actualizar los datos
  const handleUpdate = () => {
    const detalles = "El médico actualizó la historia clínica.";
    guardarModificacion(detalles, idHistoria); // Usando idHistoria
  };

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="mostrar">
      {/* Contenedor del menú */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <nav>
          <div className="modulo" onClick={() => navigate(`/crear-paciente`)}>
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

      {/* Contenedor principal de la información */}
      <div className="form-container">
        <h2>Detalles de la Historia Clínica</h2>

        <div className="motivo-antecedentes">
          <p><strong>Motivo de consulta:</strong> {formData.motivoConsulta || "No especificado"}</p>
          <p><strong>Antecedentes patológicos:</strong> {formData.antecedentesPatologicosPersonales || "No especificado"}</p>
        </div>

        <h2>Exámenes Físicos</h2>
        {formData.examenFisico.seleccionados.length > 0 ? (
          <div>
            {formData.examenFisico.seleccionados.map((examen, index) => (
              <div key={index} className="examen">
                <p>{examen}</p>
              </div>
            ))}
            <p><strong>Observación:</strong> {formData.examenFisico.observacion}</p>
          </div>
        ) : (
          <p>No se realizaron exámenes físicos o no hay exámenes seleccionados.</p>
        )}

        <h2>Revisión de Órganos y Sistemas</h2>
        {formData.revisionOrganosYSystems.seleccionados.length > 0 ? (
          <div>
            {formData.revisionOrganosYSystems.seleccionados.map((sistema, index) => (
              <div key={index} className="examen">
                <p>{sistema}</p>
              </div>
            ))}
            <p><strong>Observación:</strong> {formData.revisionOrganosYSystems.observacion}</p>
          </div>
        ) : (
          <p>No se realizó revisión de órganos o sistemas o no hay exámenes seleccionados.</p>
        )}

        <h2>Constantes Vitales</h2>
        <table>
          <thead>
            <tr>
              <th>Constante</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formData.constantesVitales).map(([constante, valor], index) => (
              <tr key={index}>
                <td>{constante.replace(/([A-Z])/g, ' $1').toUpperCase()}</td>
                <td>{valor || "No especificado"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Planes de Tratamiento</h2>
        {formData.tratamiento.medicamentos.length > 0 ? (
          formData.tratamiento.medicamentos.map((plan, index) => (
            <div key={index} className="plan-tratamiento">
              <h3>Plan de Tratamiento #{plan.numero}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Prescripción</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.medicamentos.map((medicamento, idx) => (
                    <tr key={idx}>
                      <td>{medicamento.medicamentos}</td>
                      <td>{medicamento.metodoAdministracion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No hay medicamentos o prescripciones registradas para esta historia clínica.</p>
        )}

        <div className="acciones">
          <button onClick={() => navigate(`/agregar/${idPaciente}/${idHistoria}`)}>Agregar Nuevo Tratamiento</button>
        </div>

        <div className="acciones">
          <button onClick={() => navigate("/gestion")}>Regresar</button>
        </div>
      </div>
    </div>
  );
};

export default Mostrar;
