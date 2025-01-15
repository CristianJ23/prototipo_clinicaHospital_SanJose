import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonalTable from "./PersonalTable";
import "../css/exportacion.css"
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";


const Exportacion = () => {
    // Función para buscar la persona, paciente y sus historias clínicas con una sola API
        const navigate = useNavigate();  // Hook para navegación programática

    const [mensaje, setMensaje] = useState("");
    const [historias, setHistorias] = useState([]);
    const [historiasConId, setHistoriasConId] = useState([]);
    const [cedula, setCedula] = useState("");
    const [id_historia, setIdHistoria] = useState("");
    const [persona, setPersona] = useState(null); // Para almacenar la persona encontrada
    const [paciente, setPaciente] = useState(null); // Para almacenar el paciente encontrado
    const [previewUrl, setPreviewUrl] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null); // Aquí guardamos el PDF generado


    const buscarHistoria = async () => {
        try {
            // Llamada a la API que busca la persona, el paciente y las historias clínicas
            const response = await axios.get(`http://localhost:8000/kriss/buscarHistoria/${cedula}`);

            if (response.data) {
                setPersona(response.data.persona);
                setPaciente(response.data.paciente);
                setHistorias(response.data.historiasClinicas);
                setMensaje(""); // Limpiar el mensaje de error

                if (response.data.historiasClinicas.length === 0) {
                    setMensaje("No se encontraron historias clínicas para este paciente.");
                }
            } else {
                setMensaje("No se encontraron datos para esta cédula.");
                setPersona(null);
                setPaciente(null);
                setHistorias([]);
            }
        } catch (error) {
            console.error("Error al buscar la información:", error);
            setMensaje("Hubo un error al realizar la búsqueda. Por favor, inténtelo de nuevo.");
            setPersona(null);
            setPaciente(null);
            setHistorias([]);
        }
    };


    const buscarHistoriaPorId = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/kriss/historiaClinica/${id_historia}`);
            if (response.data) {
                setHistoriasConId([response.data]);
                // console.log("historia con id encontrada", response.data);
                setMensaje(response.data.length === 0
                    ? "No se encontró ninguna historia con este ID."
                    : "");
            } else {
                setMensaje("No se encontró ninguna historia con este ID.");
                setHistoriasConId([]);
            }
        } catch (error) {
            console.error("Error al buscar la información por ID:", error);
            setMensaje("Hubo un error al realizar la búsqueda por ID.");
        }
    };

    // UseEffect para hacer la búsqueda cuando id_historia cambia
    useEffect(() => {
        if (id_historia) {
            buscarHistoriaPorId();
        }
    }, [id_historia]);

    const limpiarResultados = (mensaje) => {
        setMensaje(mensaje);
        setPersona(null);
        setPaciente(null);
        setHistorias([]);
        setHistoriasConId([]);
    };

    /**informacion para la tabla */
    const columns = [
        { Header: "ID Historia", accessorKey: "id_historia" },
        { Header: "Motivo de Consulta", accessorKey: "motivoConsulta" },
        { Header: "Fecha", accessorKey: "fecha_creacion" },
    ];

    /** ************ codigo para ecportas en pdf */

    // Función para generar el PDF
    const generarPDF = (historia) => {
        const doc = new jsPDF();

        // Título centrado en la parte superior
        const title = "Historia Clínica";
        const pageWidth = doc.internal.pageSize.width;
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2; // Calculando el centro horizontal

        // Título
        doc.text(title, titleX, 20); // Centrado en la parte superior

        // Espacio después del título
        let currentY = 30;

        // Agregar los datos al PDF
        doc.text(`ID Historia: ${historia.id_historia}`, 10, currentY);
        currentY += 10; // Incrementamos la posición en Y para los siguientes textos

        doc.text(`Motivo de Consulta: ${historia.motivoConsulta}`, 10, currentY);
        currentY += 10;

        doc.text(`Fecha de Creación: ${historia.fecha_creacion}`, 10, currentY);
        currentY += 10;

        // Agregar más datos en nuevas líneas o ubicaciones
        doc.text(`Más Datos: ${historia.antecedentesPatologicosPersonales || 'No disponibles'}`, 10, currentY);
        currentY += 10;

        // Agregar más información personalizada
        doc.text(`Presión Arterial: ${historia.presionArterial || 'No disponible'}`, 10, currentY);
        currentY += 10;

        doc.text(`Peso: ${historia.peso || 'No disponible'}`, 10, currentY);
        currentY += 10;

        // Si tienes más datos, puedes seguir agregando con un incremento de Y
        // Siempre ajustando `currentY` para separar los textos

        // Guardamos el PDF en el estado
        setPdfDoc(doc);

        // Generar el PDF como un objeto de datos (en lugar de guardarlo directamente)
        const pdfOutput = doc.output('arraybuffer');

        // Mostrar la vista previa del PDF
        const file = new Blob([pdfOutput], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        setPreviewUrl(fileURL);
    };



    // Función para manejar la descarga del PDF
    const descargarPDF = () => {
        if (pdfDoc) {
            // Si el PDF ya fue generado, lo descargamos
            pdfDoc.save('historia_clinica.pdf');
        }
    };


    return (
        <div className="content">
            <h1>Gestión de Historias Clínicas</h1>
            <form
                className="busqueda-container"
                onSubmit={(e) => { e.preventDefault(); buscarHistoria(cedula); }}>
                <label>
                    Cédula:
                    <div className="input-group">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            placeholder="Ingrese la cédula"
                        />
                        <button type="submit">Buscar</button>
                    </div>
                </label>
            </form>

            {/* Mensaje de error o informativo */}
            {mensaje && <p className="mensaje">{mensaje}</p>}

            {/* Mostrar la persona y el paciente encontrados */}
            {persona && (
                <div className="persona-info">
                    <h2>Persona Encontrada:</h2>
                    <p><strong>Nombre:</strong> {persona.nombre} {persona.apellido}</p>
                    <p><strong>Cédula:</strong> {persona.numero_documento}</p>
                </div>
            )}

            {paciente && (
                <div className="paciente-info">
                    <h2>Historias Encontradas:</h2>
                </div>
            )}

            {/* Mostrar las historias clínicas en la tabla */}
            <PersonalTable data={historias} columns={columns} />


            {/* ********************para la segunda tabla ***********/}

            {historias && (
                <div>
                    <input
                        type="text"
                        value={id_historia}
                        onChange={e => { setIdHistoria(e.target.value); buscarHistoriaPorId() }}
                        placeholder="ingrece id de la historia a exportar"
                    ></input>
                </div>
            )}

            {historiasConId.length > 0 && (
                <div>
                    <h3>Detalles de la Historia Clínica</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Historia</th>
                                <th>Motivo de Consulta</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historiasConId.map((historia, index) => (
                                <tr key={index}>
                                    <td>{historia.id_historia}</td>
                                    <td>{historia.motivoConsulta}</td>
                                    <td>{historia.fecha_creacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => generarPDF(historiasConId[0])}>Ver Vista Previa</button>
                </div>
            )}

            {/* Vista previa del PDF */}
            {previewUrl && (
                <div>
                    <h3>Vista Previa del PDF:</h3>
                    <iframe src={previewUrl} width="170%" height="500px"></iframe>
                    <button onClick={descargarPDF}>Descargar PDF</button>
                </div>
            )}

            <div id="contenedor-button-personal">
                <button
                    id="back-personal"
                    onClick={() => navigate("/inicio")}
                >
                    Volver
                </button>
            </div>

        </div >)
}

export default Exportacion;