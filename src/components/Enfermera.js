import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../css/enfermera.css";

// Variable global para almacenar el ID del plan de tratamiento
let idPlanTratamientoGlobal = "";

const Enfermera = () => {
    const navigate = useNavigate();

    // Estados iniciales
    const estadoInicialProceso = {
        medicamento: "",
        metodo_suministracion: "",
        observacion: "",
        id_plan_tratamiento: "",
        hora_suministro: "",
    };

    const [mensaje, setMensaje] = useState("");
    const [persona, setPersona] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [tratamientos, setTratamientos] = useState([]);
    const [procesos, setProcesos] = useState([]);
    const [nuevoProceso, setNuevoProceso] = useState(estadoInicialProceso);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Agregar proceso
    const agregarProceso = () => {
        if (!nuevoProceso.medicamento || !nuevoProceso.metodo_suministracion || !idPlanTratamientoGlobal) {
            alert("Por favor complete todos los campos obligatorios.");
            return;
        }

        const fecha = new Date();
        const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
        const horaFormateada = `${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}:${fecha.getSeconds().toString().padStart(2, '0')}`;

        const nuevo = {
            ...nuevoProceso,
            id_plan_tratamiento: idPlanTratamientoGlobal,
            fecha_proceso: fechaFormateada,
            hora_proceso: horaFormateada,
        };

        // Actualizar procesos
        setProcesos((prevProcesos) => [...prevProcesos, nuevo]);

        // Restablecer formulario
        setNuevoProceso({ ...estadoInicialProceso });
        setMostrarConfirmacion(false);
    };

    // Enviar procesos al backend
    const enviarProcesos = async () => {
        try {
            // Verifica que hay procesos para enviar
            if (procesos.length === 0) {
                alert("No hay procesos para enviar.");
                return;
            }

            // Enviar solo el array de procesos
            const response = await axios.post(
                "http://localhost:8000/kriss/Porecesos_Creacion",
                procesos,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            // Imprimir la respuesta del backend
            console.log("Respuesta del backend:", response.data);

            if (response.status === 200) {
                alert("Procesos enviados correctamente.");
                setProcesos([]);  // Limpiar los procesos después de enviarlos
            } else {
                alert("Hubo un problema al enviar los procesos.");
            }
        } catch (error) {
            console.error("Error al enviar los procesos:", error.message);
            alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
        }
    };

    // Buscar persona por cédula
    const buscarPersonaPorCedula = async (cedula) => {
        try {
            const [personaRes, pacienteRes, tratamientosRes] = await Promise.all([
                axios.get(`http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`),
                axios.get(`http://localhost:8000/kriss/buscarPacientePorCedula/${cedula}`),
                axios.get(`http://localhost:8000/kriss/planTratamientoPorCedula/${cedula}`),
            ]);

            if (pacienteRes.data) {
                setPersona(personaRes.data);
                setPaciente(pacienteRes.data);
                setTratamientos(tratamientosRes.data || []);

                if (tratamientosRes.data && tratamientosRes.data.length > 0) {
                    const ultimoTratamiento = tratamientosRes.data[tratamientosRes.data.length - 1];
                    idPlanTratamientoGlobal = ultimoTratamiento.planTratamiento.id_plan_tratamiento;
                }

                setMensaje("");
            } else {
                setMensaje("Persona no encontrada.");
                limpiarDatos();
            }
        } catch (error) {
            setMensaje("Error al buscar la persona.");
            limpiarDatos();
        }
    };

    const limpiarDatos = () => {
        setPersona(null);
        setPaciente(null);
        setTratamientos([]);
        setNuevoProceso(estadoInicialProceso);
        idPlanTratamientoGlobal = "";
    };

    const debouncedBuscarPersonaPorCedula = debounce((cedula) => {
        if (cedula) buscarPersonaPorCedula(cedula);
    }, 500);

    // Manejar cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "cedula") {
            debouncedBuscarPersonaPorCedula(value);
        }
    };

    const handleProcesoChange = (e) => {
        const { name, value } = e.target;
        setNuevoProceso((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const eliminarProceso = (index) => {
        setProcesos(procesos.filter((_, i) => i !== index));
    };

    const exportarPDF = () => {
        const doc = new jsPDF();

        // Título: Procesos de Suministración
        doc.setFontSize(18);
        doc.text("Procesos de Suministración", 10, 10);

        // Plan de Tratamiento con tabla de medicamentos
        doc.setFontSize(12);
        if (tratamientos.length > 0) {
            doc.text("Plan de Tratamiento", 10, 20);

            // Crear la tabla de tratamientos
            doc.autoTable({
                startY: 30,
                head: [["Medicamento", "Método de Administración", "Duración"]],
                body: tratamientos
                    .filter((plan) => plan.planTratamiento.estado === "ACTIVO")
                    .flatMap((plan) =>
                        plan.tratamientos.map((tratamiento) => [
                            tratamiento.medicamentos,
                            tratamiento.metodoAdministracion,
                            tratamiento.duracion,
                        ])
                    ),
                theme: "grid",
                margin: { top: 10 },
                styles: {
                    cellPadding: 5,
                    fontSize: 10,
                    valign: 'middle',
                    halign: 'center',
                },
            });
        } else {
            doc.text("No se encontraron tratamientos para este paciente.", 10, 20);
        }

        // Título: Procesos Realizados
        const procesosData = procesos.map((proceso) => [
            proceso.fecha_proceso,
            proceso.hora_proceso,
            proceso.medicamento,
            proceso.metodo_suministracion,
            proceso.observacion,
            proceso.hora_suministro,
        ]);

        // Crear la tabla de procesos
        doc.setFontSize(18);
        doc.text("Procesos Realizados", 10, doc.lastAutoTable.finalY + 20);

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 30,
            head: ["Fecha", "Hora", "Medicamento", "Método de Suministración", "Observación", "Hora de Suministro"],
            body: procesosData,
            theme: "grid",
            margin: { top: 10 },
            styles: {
                cellPadding: 5,
                fontSize: 10,
                valign: 'middle',
                halign: 'center',
            },
        });

        // Guardar el PDF
        doc.save("procesos.pdf");
    };

    const confirmarHoraSuministro = () => {
        if (!nuevoProceso.hora_suministro) {
            alert("Por favor ingrese la hora de suministro.");
            return;
        }
        setMostrarConfirmacion(true);
    };

    return (
        <div className="container-enfermera">
            {/* Sección de datos de la persona */}
            <div className="form-section-enfermera">
                <h1 className="title-enfermera">Administración de Tratamientos</h1>
                <h2 className="subtitle-enfermera">Datos de la Persona</h2>
                <label className="input-label-enfermera">
                    Cédula:
                    <input type="text" name="cedula" className="input-field-enfermera" onChange={handleInputChange} />
                </label>
                <label className="input-label-enfermera">
                    Nombres:
                    <input
                        type="text"
                        name="nombres"
                        className="input-field-enfermera"
                        value={persona ? persona.primer_nombre + " " + persona.segundo_nombre : ""}
                        readOnly
                    />
                </label>
                <label className="input-label-enfermera">
                    Apellidos:
                    <input
                        type="text"
                        name="apellidos"
                        className="input-field-enfermera"
                        value={persona ? persona.primer_apellido + " " + persona.segundo_apellido : ""}
                        readOnly
                    />
                </label>
            </div>

            {/* Sección de tratamientos */}
            <div className="treatment-section-enfermera">
                <h2 className="subtitle-enfermera">Plan de Tratamiento</h2>
                <div className="treatment-list-enfermera">
                    {tratamientos.length > 0 ? (
                        <table className="treatment-table-enfermera">
                            <thead>
                                <tr>
                                    <th>Medicamento</th>
                                    <th>Método de Administración</th>
                                    <th>Duración</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tratamientos
                                    .filter((plan) => plan.planTratamiento.estado === "ACTIVO")
                                    .map((plan) =>
                                        plan.tratamientos.map((tratamiento) => (
                                            <tr key={tratamiento.id_tratamiento}>
                                                <td>{tratamiento.medicamentos}</td>
                                                <td>{tratamiento.metodoAdministracion}</td>
                                                <td>{tratamiento.duracion ? `${tratamiento.duracion} días` : "No especificado"}</td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron tratamientos para este paciente.</p>
                    )}
                </div>

                {/* Tabla para creación de procesos */}
                <h2 className="subtitle-enfermera">Crear Proceso</h2>
                <table className="process-table-enfermera">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Medicamento</th>
                            <th>Método</th>
                            <th>Observación</th>
                            <th>Hora de Suministro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procesos.map((proceso, index) => (
                            <tr key={index}>
                                <td>{proceso.fecha_proceso}</td>
                                <td>{proceso.hora_proceso}</td>
                                <td>{proceso.medicamento}</td>
                                <td>{proceso.metodo_suministracion}</td>
                                <td>{proceso.observacion}</td>
                                <td>{proceso.hora_suministro}</td>
                                <td>
                                    <button onClick={() => eliminarProceso(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2">Automático</td>
                            <td>
                                <input
                                    type="text"
                                    name="medicamento"
                                    value={nuevoProceso.medicamento}
                                    onChange={handleProcesoChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="metodo_suministracion"
                                    value={nuevoProceso.metodo_suministracion}
                                    onChange={handleProcesoChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="observacion"
                                    value={nuevoProceso.observacion}
                                    onChange={handleProcesoChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="time"
                                    name="hora_suministro"
                                    value={nuevoProceso.hora_suministro}
                                    onChange={(e) => {
                                        const hora = e.target.value; // Obtiene el valor en formato HH:MM
                                        const horaConSegundos = `${hora}:00`; // Convierte a HH:MM:SS
                                        handleProcesoChange({ target: { name: e.target.name, value: horaConSegundos } });
                                    }}
                                />
                            </td>
                            <td>
                                <button onClick={confirmarHoraSuministro}>Agregar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {mostrarConfirmacion && (
                    <div className="confirmation-modal">
                        <p>¿Está seguro de que esta es la hora de administración? Acepta cualquier responsabilidad.</p>
                        <button onClick={agregarProceso}>Sí, confirmar</button>
                        <button onClick={() => setMostrarConfirmacion(false)}>Cancelar</button>
                    </div>
                )}
                <button onClick={exportarPDF} className="export-btn-enfermera">Exportar a PDF</button>
                <button onClick={enviarProcesos} className="send-btn-enfermera">Enviar Procesos</button>
            </div>

            <button className="back-btn-enfermera" onClick={() => navigate("/inicio")}>Volver</button>
        </div>
    );
};

export default Enfermera;