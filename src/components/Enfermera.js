import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from 'lodash.debounce';
import "../css/enfermera.css"


const Enfermera = () => {
    const [mensaje, setMensaje] = useState("");
    const [persona, setpersona] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Hook para navegación programática
    const [tratamientos, setTratamientos] = useState([]);


    /* codigo para recibir los datos del persona deacuerdo a su numero de cedula */
    const buscarpersonaPorCedula = async (cedula) => {
        try {
            const response = await axios.get(`http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`);
            const pacienteNew = await axios.get(`http://localhost:8000/kriss/buscarPacientePorCedula/${cedula}`);
            const tratamientos = await axios.get(`http://localhost:8000/kriss/planTratamientoPorCedula/${cedula}`);

            if (pacienteNew.data) {
                setpersona(response.data);
                setPaciente(pacienteNew.data);
                setTratamientos(tratamientos.data || []);
                setMensaje("");

            } else {
                setMensaje("Persona no encontrada.");
                setpersona(null);
                setTratamientos([]); 
                setPaciente(null);
            }
        } catch (error) {
            setMensaje("Error al buscar la persona.");
            setpersona(null);
            setTratamientos([]);  
            setPaciente(null);
        }
    };



    // Usar debounce para evitar múltiples peticiones rápidas al backend
    const debouncedBuscarpersonaPorCedula = debounce((cedula) => {
        if (cedula) {
            buscarpersonaPorCedula(cedula); // Llamada al backend solo después del debounce
        }
    }, 500);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Si el campo es "cedula", llamar a la búsqueda con debounce
        if (name === 'cedula') {
            debouncedBuscarpersonaPorCedula(value); // Llamada al debounced function
        }
    };

    return (
        <div className="containerEnfermera">
            <div className="formSectionEnfermera">
                <h1 className="titleEnfermera">Administración de Tratamientos</h1>
                <h2 className="subtitleEnfermera">Datos de la Persona</h2>
                <label className="inputLabelEnfermera">
                    Cédula:
                    <input type="text" name="cedula" className="inputFieldEnfermera" onChange={handleInputChange} />
                </label>
                {error && <p className="errorMessageEnfermera">{error}</p>} {/* Show errors */}
                <label className="inputLabelEnfermera">
                    Nombres:
                    <input
                        type="text"
                        name="nombres"
                        className="inputFieldEnfermera"
                        value={persona ? persona.primer_nombre + " " + persona.segundo_nombre : ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="inputLabelEnfermera">
                    Apellidos:
                    <input
                        type="text"
                        name="apellidos"
                        className="inputFieldEnfermera"
                        value={persona ? persona.primer_apellido + " " + persona.segundo_apellido : ""}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
    
            <div className="treatmentSectionEnfermera">
                <h2 className="subtitleEnfermera">Tratamientos del Paciente</h2>
                <div className="treatmentListEnfermera">
                    {tratamientos.length > 0 ? (
                        <table className="treatmentTableEnfermera">
                            <thead>
                                <tr>
                                    <th>Medicamento</th>
                                    <th>Método de Administración</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Filter only active treatment plans */}
                                {tratamientos
                                    .filter(plan => plan.planTratamiento.estado === 'ACTIVO') // Only active plans
                                    .map((plan) =>
                                        plan.tratamientos.map((tratamiento) => (
                                            <tr key={tratamiento.id_tratamiento}>
                                                <td>{tratamiento.medicamentos}</td>
                                                <td>{tratamiento.metodoAdministracion}</td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron tratamientos para este paciente.</p>
                    )}
                </div>
            </div>
        </div>
    );
    
    
    
}


export default Enfermera;