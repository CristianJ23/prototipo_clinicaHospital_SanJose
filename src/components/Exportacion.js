import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonalTable from "./PersonalTable";
import "../css/exportacion.css"
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import autoTable from 'jspdf-autotable';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const Exportacion = () => {
    const [scale, setScale] = useState(1.5); // Establece el zoom inicial
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
    const [numPages, setNumPages] = useState(null);
    const [pageNum, setPageNum] = useState(1);


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

    /** ************ codigo para exportar en pdf */
    // Función para generar el PDF
    const generarPDF = (historia) => {
        const doc = new jsPDF();

        // Título centrado en la parte superior
        const title = "Epicrisis -- Clinica Hospital San Jose";
        const pageWidth = doc.internal.pageSize.width;
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2; // Calculando el centro horizontal

        // Título
        doc.text(title, titleX, 20); // Centrado en la parte superior

        // Espacio después del título
        let currentY = 30;

        /**primera tabla        */
        const columns = ['  INSTITUCIÓN DEL SISTEMA',
            'UNICÓDIGO',
            'ESTABLECIMIENTO DE SALUD',
            'NUMERO DE HISTORIA CLÍNICA ÚNICA',
            'NÚMERO DE ARCHIVO',
            'No. de HOJA']; // Encabezados de la tabla
        const rows = [
            ["clinica san jose",
                'san jose',
                "loja san jose",
                historia.id_historia,
                "archivo primero",
                "1",
            ],
        ];

        autoTable(doc, {
            startY: currentY, // Aquí colocamos la tabla después del título
            head: [["A: Datos del establecimiento y usuario"]],
            headStyles: {
                halign: 'center', // Centra el texto del encabezado
                fillColor: [61, 160, 123] // Verde claro en formato RGB
            }
        })

        // Agregar la tabla con un inicio específico en Y
        autoTable(doc, {
            startY: currentY + 8, // Aquí colocamos la tabla después del título
            head: [columns],
            headStyles: {
                halign: 'center', // Centra el texto del encabezado
                fillColor: [61, 160, 123] // Verde claro en formato RGB
            },  // Encabezados
            body: rows,       // Datos de las filas
        });

        const columnsPaciente = ['  INSTITUCIÓN DEL SISTEMA',
            'UNICÓDIGO',
            'ESTABLECIMIENTO DE SALUD',
            'NUMERO DE HISTORIA CLÍNICA ÚNICA',
            'NÚMERO DE ARCHIVO',
            'No. de HOJA']; // Encabezados de la tabla
        const rowsPaciente = [
            ["clinica san jose",
                'san jose',
                "loja san jose",
                historia.id_historia,
                "archivo primero",
                "1",
            ],
        ];

        autoTable(doc, {
            startY: currentY + 32, // Aquí colocamos la tabla después del título
            head: [columns],
            headStyles: {
                halign: 'center', // Centra el texto del encabezado
                fillColor: [61, 160, 123] // Verde claro en formato RGB
            },  // Encabezados
            body: rows,       // Datos de las filas
        });


        // Guardamos el PDF en el estado
        setPdfDoc(doc);

        // Generar el PDF como un objeto de datos (en lugar de guardarlo directamente)
        const pdfBlob = doc.output("blob");
        const fileURL = URL.createObjectURL(pdfBlob);

        // Mostrar la vista previa del PDF
        setPreviewUrl(fileURL);
    };

    // Next page
    const goToNextPage = () => {
        if (pageNum < numPages) {
            setPageNum(pageNum + 1);
        }
    };

    // Previous page
    const goToPrevPage = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };



    // Función para manejar la descarga del PDF
    const descargarPDF = () => {
        if (pdfDoc) {
            // Si el PDF ya fue generado, lo descargamos
            pdfDoc.save('historia_clinica.pdf');
        }
    };


    return (
        <div className="exportacion-container">
            <h1 className="page-title">Gestión de Historias Clínicas</h1>
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); buscarHistoria(cedula); }}>
                <label>
                    Cédula:
                    <div className="input-group">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            placeholder="Ingrese la cédula"
                        />
                        <button type="submit" className="search-btn">Buscar</button>
                    </div>
                </label>
            </form>

            {mensaje && <p className="message">{mensaje}</p>}

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

            <PersonalTable data={historias} columns={columns} />

            {historias && (
                <div className="input-container">
                    <input
                        type="text"
                        value={id_historia}
                        onChange={e => { setIdHistoria(e.target.value); buscarHistoriaPorId() }}
                        placeholder="Ingrese ID de la historia a exportar"
                    />
                </div>
            )}

            {historiasConId.length > 0 && (
                <div className="history-details">
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
                    <button className="preview-btn" onClick={() => generarPDF(historiasConId[0])}>Ver Vista Previa</button>
                </div>
            )}

            {previewUrl && (
                <div className="pdf-preview-container">
                    <h2 className="pdf-preview-title">Vista Previa del Documento PDF</h2>
                    <Worker workerUrl={`${process.env.PUBLIC_URL}/pdf.worker.min.js`}>
                        <Viewer fileUrl={previewUrl} scale={3.5} />
                    </Worker>
                </div>
            )}

            <div className="button-container">
                <button
                    className="back-btn"
                    onClick={() => navigate("/inicio")}
                >
                    Volver
                </button>
            </div>
        </div>
    );
};
export default Exportacion;