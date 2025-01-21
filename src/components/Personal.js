import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/personal.css";
import debounce from 'lodash.debounce';
import PersonalTable from "./PersonalTable.js";

// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import crearUsuarioImg from "../img2/usuario.png";

const Personal = () => {
    const [personaList, setPersonaList] = useState([]);  // Store list of people
    const [isLoading, setIsLoading] = useState(true); // Estado para indicador de carga
    const [vista, setVista] = useState("inicio"); // Estados: "inicio", "crearPersona", "darAcceso"
    const navigate = useNavigate();  // Hook para navegación programática
    const [cedula, setCedula] = useState("");
    const [persona, setPersona] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [areas, setAreas] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [credenciales, setCredenciales] = useState({
        id_credenciales: "",
        email: "",
        password: "",
        role: "",
        area: "",
        especialidad: "",
        estado: "",
    });
    const [nuevaPersona, setNuevaPersona] = useState({
        primer_apellido: "",
        segundo_apellido: "",
        primer_nombre: "",
        segundo_nombre: "",
        tipo_documento: "",
        numero_documento: "",
        estado_civil: "",
        sexo: "",
        celular: "",
        correo_electronico: "",
        fecha_nacimiento: "",
        lugar_nacimiento: "",
        nacionalidad: "",
        contrasena: "",
        rol: "",
        area: "",
        especialidad: ""
    });

    /* datos para la tabla */
    const columns = [
        {
            header: "Nombre",
            accessorKey: "primer_nombre",  // Adjust this according to the data structure
        },
        {
            header: "Apellido",
            accessorKey: "primer_apellido",  // Adjust this according to the data structure
        },
        {
            header: "numero_documento",
            accessorKey: "numero_documento",  // Adjust this according to the data structure
        },
        {
            header: "sexo",
            accessorKey: "sexo",  // Adjust this according to the data structure
        },
        {
            header: "fecha_nacimiento",
            accessorKey: "fecha_nacimiento",  // Adjust this according to the data structure
        }
    ];

    // Función para obtener todas las personas desde la API
    const fetchAllPersonas = async () => {
        try {
            const response = await axios.get("http://localhost:8000/kriss/getAllPersonal");
            setPersonaList(response.data); // Actualizar estado con los datos obtenidos
        } catch (error) {
            console.error("Error al obtener las personas:", error);
            setMensaje("Error al obtener las personas.");
        } finally {
            setIsLoading(false); // Finaliza el indicador de carga
        }
    };

    // Fetch people when component mounts
    useEffect(() => {
        fetchAllPersonas();
    }, []);

    /* hacer llamadas para buscar al escribir */
    const debouncedBuscarPersonaPorCedula = debounce(async (cedula) => {
        if (cedula) {
            try {
                eliminarDatos();
                await buscarPersona(cedula); // Ejecutar buscarPersona primero
                await buscarPersonaPorCedula(cedula); // Luego ejecutar buscarPersonaPorCedula
                if (buscarPersonaPorCedula.length > 0) {
                    setMensaje("");
                }
            } catch (error) {
                console.error("Error al buscar la persona:", error);
            }
        }
    }, 500);

    // Manejar el input para la cédula
    const handleCedulaChange = (e) => {
        const value = e.target.value;
        setCedula(value); // Actualizar estado de cédula
        debouncedBuscarPersonaPorCedula(value); // Llamar al debounce
    };



    //cambiar valores de un objeto
    const actualizarEstado = (setState, name, value) => {
        setState((prevState) => ({
            ...prevState,  // Preserva el estado anterior
            [name]: value, // Actualiza solo la propiedad especificada
        }));
    };


    // Manejar cambios en los inputs
    const handleInputChange = (e, setState, state) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });

        // // Si el campo es "cedula", llamar a la búsqueda con debounce
        // if (name === 'cedula') {
        //   debouncedBuscarPersonaPorCedula(value); // Llamada al debounced function
        // }
    };

    // Función para buscar persona por cédula
    const buscarPersona = async (cedula) => {
        try {
            const response = await axios.get(`http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`);
            if (response.data) {
                setPersona(response.data);
                setMensaje("");
            } else {
                setMensaje("Persona no encontrada.");
                setPersona(null);
            }
        } catch (error) {
            console.error("Error al buscar persona:", error);
            setMensaje("Error al buscar la persona.");
            setPersona(null);
        }
    };

    // comprobar datos en la consola
    React.useEffect(() => {
        if (credenciales) {
            console.log("credenciales actualizada:", credenciales);
        }
    }, [credenciales]);


    // Función para guardar credenciales
    const guardarCredenciales = async () => {
        if (!persona) {
            setMensaje("Busca una persona antes de guardar.");
            return;
        }

        try {
            const payload = {
                id_persona: persona.id_persona,
                email: credenciales.email,
                password: credenciales.password,
                role: credenciales.role,
                area: credenciales.area,
                especialidad: credenciales.especialidad,
            };
            await axios.post("http://localhost:8000/kriss/createRolNoPrimeraVez", payload);
            setMensaje("Credenciales guardadas exitosamente.");
            setCredenciales({ id_credenciales: "", email: "", password: "", role: "", area: "", especialidad: "" });
            setPersona(null);
            setCedula("");
        } catch (error) {
            // Verificar si el error tiene una respuesta
            if (error.response && error.response.data && error.response.data.error) {
                setMensaje(error.response.data.error); // Mostrar el error enviado desde el backend
            } else {
                setMensaje("Error al guardar las credenciales."); // Si no hay un error específico
            }
        }
    };

    // Función para guardar nueva persona
    const guardarNuevaPersona = async () => {
        try {
            await axios.post("http://localhost:8000/kriss/createRolPrimeraVez", nuevaPersona);
            setMensaje("Persona creada exitosamente.");
            setNuevaPersona({
                primer_apellido: "",
                segundo_apellido: "",
                primer_nombre: "",
                segundo_nombre: "",
                tipo_documento: "",
                numero_documento: "",
                estado_civil: "",
                sexo: "",
                celular: "",
                correo_electronico: "",
                fecha_nacimiento: "",
                lugar_nacimiento: "",
                nacionalidad: "",
                correo_electronico: "",
                contraseña: "",
                rol: "",
            });
            setVista("inicio");
        } catch (error) {
            setMensaje("Error al crear la persona.");
        }
    };


    const buscarPersonaPorCedula = async (cedula) => {
        try {
            const response = await axios.get(`http://localhost:8000/kriss/buscarCredencialPorCedula/${cedula}`);
            if (response.data) {
                setCredenciales({
                    id_credenciales: response.data.id_credencial,
                    email: response.data.correo_electronico || "",
                    password: response.data.contrasena || "",
                    role: response.data.rol || "",
                    estado: response.data.estado || "",
                });
            } else {
                setMensaje("No se encontraron credenciales.");
            }
        } catch (error) {
            console.error("Error al buscar credenciales:", error);
            setMensaje("Error al buscar credenciales.");
        }
    };


    const eliminarRol = async () => {
        try {
            const credencial =
                // console.log(persona.numero_documento)
                await axios.get(`http://localhost:8000/kriss/buscarCredencialPorCedula/${persona.numero_documento}`);
            console.log("credencial_id", credencial.data.id_credencial);
            // const credencial_id = credencial.data.id_credencial;

            await axios.post(`http://localhost:8000/kriss/deleteRol/${credencial.data.id_credencial}`);
            setMensaje("rol eliminado correctamente");

        } catch (error) {
            setMensaje("Error al eliminar la persona.");
        }
    };

    const actualizarRole = async () => {
        try {
            const payload = {
                id_credenciales: credenciales.id_credenciales,
                email: credenciales.email,
                password: credenciales.password,
                role: credenciales.role,
                estado: credenciales.estado,
            };
            await axios.post(`http://localhost:8000/kriss/actializarRol`, payload);
            setMensaje("Credenciales guardadas exitosamente.");
            setCredenciales({ id_credenciales: "", email: "", password: "", role: "" });
            setPersona(null);
            setCedula("");
        } catch (error) {
            setMensaje("Error al guardar las credenciales.");
        }
    }

    const eliminarDatos = () => {
        setPersona(null);
        setCedula(null);
        setCredenciales({ id_credenciales: "", email: "", password: "", role: "" });
        setMensaje("");
    };

    // Función para obtener las áreas desde la API
    const fetchAreas = async () => {
        try {
            const response = await axios.get("http://localhost:8000/kriss/area");
            setAreas(response.data); // Guardar las áreas en el estado
        } catch (error) {
            console.error("Error al obtener las áreas:", error);
        }
    };

    // Función para obtener las especialidaddes desde la API
    const fetchEspecialidades = async () => {
        try {
            const response = await axios.get("http://localhost:8000/kriss/especialidades");
            setEspecialidades(response.data); // Guardar las áreas en el estado
        } catch (error) {
            console.error("Error al obtener las áreas:", error);
        }
    };

    // Fetch areas and specialties on component mount
    useEffect(() => {
        if (credenciales.role === "medico" || credenciales.role === "enfermera") {
            fetchAreas();
            fetchEspecialidades();
        }
    }, [credenciales.role]);


    return (
        <div className="container">
    
            {vista === "inicio" && (
                <div className="content-container">
                    {/* Barra superior con botones */}
                    <header className="header">
                        <button className="header-button" onClick={() => setVista("crearPersona")}>
                            Crear Nueva Persona
                        </button>
                        <button className="header-button" onClick={() => setVista("darAcceso")}>
                            Dar Acceso a Persona
                        </button>
                        <button className="header-button" onClick={() => setVista("eliminarRol")}>
                            Eliminar Rol
                        </button>
                        <button className="header-button" onClick={() => setVista("editarRol")}>
                            Editar Rol
                        </button>
                    </header>

                    <body>
                    <div>
                            {isLoading ? (
                                <p>Cargando datos...</p> // Indicador de carga
                            ) : personaList.length > 0 ? (
                                <PersonalTable data={personaList} columns={columns} />
                            ) : (
                                <p>No se encontraron datos. {mensaje}</p>
                            )}
                        </div>

                        <div className="button-container">
                        <button className="back-button" onClick={() => navigate("/inicio")}>
                            Volver
                        </button>
                    </div>
                    </body>

                </div>
            )}
    
            {vista === "editarRol" && (
                <div className="editar-container">
                    <h2>Editar rol</h2>
                    <div className="search-container">
                        <label>
                            Buscar por Cédula:
                            <input
                                type="text"
                                value={cedula}
                                onChange={(e) => handleCedulaChange(e)}
                            />
                        </label>
                        <button className="back-button" onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>
                    </div>
    
                    {persona && (
                        <div className="persona-info">
                            <h3>Información de la Persona</h3>
                            <p><strong>Nombres: </strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
                            <p><strong>Apellidos: </strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
                            <p><strong>Estado: </strong>{credenciales.estado}</p>
                        </div>
                    )}
    
                    {persona && (
                        <div className="role-status">
                            <h3>Estado de rol</h3>
                            {credenciales.estado === "activo" ? (
                                <button onClick={() => actualizarEstado(setCredenciales, "estado", "inactivo")}>
                                    Desactivar estado
                                </button>) :
                                (<button onClick={() => actualizarEstado(setCredenciales, "estado", "activo")}>
                                    Activar estado
                                </button>)
                            }
                        </div>
                    )}
    
                    {persona && (
                        <div className="credentials-form">
                            <h3>Datos de Credenciales</h3>
                            <label>
                                Rol:
                                <input
                                    type="text"
                                    name="role"
                                    value={credenciales.role}
                                    onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                />
                            </label>
                            <button onClick={actualizarRole} className="save-button">Guardar</button>
                        </div>
                    )}
                </div>
            )}
    
            {vista === "eliminarRol" && (
                <div className="eliminar-container">
                    <h2>Eliminar Rol</h2>
                    <button className="back-button" onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>
    
                    <div className="search-container">
                        <label>
                            Buscar por Cédula:
                            <input
                                type="text"
                                value={cedula}
                                onChange={handleCedulaChange}
                            />
                        </label>
                    </div>
    
                    {persona && (
                        <div className="persona-info">
                            <h3>Información de la Persona</h3>
                            <p><strong>Nombres:</strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
                            <p><strong>Apellidos:</strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
                        </div>
                    )}
    
                    <div className="delete-button-container">
                        <button onClick={() => eliminarRol(persona.cedula)} className="delete-button">Eliminar rol</button>
                        <button className="back-button" onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>
                    </div>
                </div>
            )}
    
            {vista === "darAcceso" && (
                <div className="form-container">
                    <h2>Dar Acceso a Persona Existente</h2>
    
                    <div className="search-container">
                        <label>
                            Buscar por Cédula:
                            <input
                                type="text"
                                value={cedula}
                                onChange={handleCedulaChange}
                            />
                        </label>
                    </div>
    
                    <button className="back-button" onClick={() => { setVista("inicio"); eliminarDatos(); }}>Atrás</button>
    
                    {persona && (
                        <div className="persona-info">
                            <h3>Información de la Persona</h3>
                            <p><strong>Nombres:</strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
                            <p><strong>Apellidos:</strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
                        </div>
                    )}
    
                    {persona && (
                        <div className="credentials-form">
                            <h3>Datos de Credenciales</h3>
                            <label>
                                Correo Electrónico:
                                <input
                                    type="email"
                                    name="email"
                                    value={credenciales.email}
                                    onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                />
                            </label>
                            <label>
                                Contraseña:
                                <input
                                    type="password"
                                    name="password"
                                    value={credenciales.password}
                                    onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                />
                            </label>
                            <label>
                                Rol:
                                <select
                                    name="role"
                                    value={credenciales.role}
                                    onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="medico">medico</option>
                                    <option value="enfermera">enfermera</option>
                                    <option value="tratante">tratante</option>
                                </select>
                            </label>
    
                            {/* Campos condicionales para Médico o Enfermera en dar acceso a una persona*/}
                            {(credenciales.role === "medico" || credenciales.role === "enfermera") && (
                                <>
                                    <label>
                                        Área:
                                        <select
                                            name="area"
                                            value={credenciales.area || ""}
                                            onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                        >
                                            <option value="">Seleccione un área</option>
                                            {areas.map((area) => (
                                                <option key={area.id_area} value={area.nombre_area}>
                                                    {area.nombre_area}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
    
                                    <label>
                                        Especialidad:
                                        <select
                                            name="especialidad"
                                            value={credenciales.especialidad || ""}
                                            onChange={(e) => handleInputChange(e, setCredenciales, credenciales)}
                                        >
                                            <option value="">Seleccione una especialidad</option>
                                            {especialidades.map((especialidad) => (
                                                <option key={especialidad.id_especialidad} value={especialidad.nombre_especialidad}>
                                                    {especialidad.nombre_especialidad}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </>
                            )}
    
                            <button onClick={guardarCredenciales} className="save-button">Guardar</button>
                        </div>
                    )}
                </div>
            )}
    
            {vista === "crearPersona" && (
                <div className="form-container">
                    <h2>Crear Nueva Persona</h2>
                    <label>
                        primer nombre:
                        <input
                            type="text"
                            name="primer_nombre"
                            value={nuevaPersona.primer_nombre}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        segundo nombre:
                        <input
                            type="text"
                            name="segundo_nombre"
                            value={nuevaPersona.segundo_nombre}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        primer apellido:
                        <input
                            type="text"
                            name="primer_apellido"
                            value={nuevaPersona.primer_apellido}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        segundo apellido:
                        <input
                            type="text"
                            name="segundo_apellido"
                            value={nuevaPersona.segundo_apellido}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Tipo de Documento:
                        <select
                            name="tipo_documento"
                            value={nuevaPersona.tipo_documento}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        >
                            <option value="">Seleccione</option>
                            <option value="cc">Cédula de Ciudadanía</option>
                            <option value="ci">Cédula de Identidad</option>
                            <option value="pasaporte">Pasaporte</option>
                            <option value="refugiado">Carné de Refugiado</option>
                            <option value="sd">Sin Dato</option>
                        </select>
                    </label>
                    {nuevaPersona.tipo_documento && (
                        <label>
                            Número de Documento:
                            <input
                                name="numero_documento"
                                value={nuevaPersona.numero_documento}
                                onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                            />
                        </label>
                    )}
                    <label>
                        Estado Civil:
                        <input
                            name="estado_civil"
                            value={nuevaPersona.estado_civil}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Sexo:
                        <select
                            name="sexo"
                            value={nuevaPersona.sexo}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        >
                            <option value="">Seleccione</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </label>
                    <label>
                        Celular:
                        <input
                            name="celular"
                            value={nuevaPersona.celular}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Correo Electrónico:
                        <input
                            type="email"
                            name="correo_electronico"
                            value={nuevaPersona.correo_electronico}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Fecha de Nacimiento:
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={nuevaPersona.fecha_nacimiento}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Lugar de Nacimiento:
                        <input
                            name="lugar_nacimiento"
                            value={nuevaPersona.lugar_nacimiento}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
                    <label>
                        Nacionalidad:
                        <input
                            name="nacionalidad"
                            value={nuevaPersona.nacionalidad}
                            onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                        />
                    </label>
    
                    <button className="save-button" onClick={guardarNuevaPersona}>Guardar Persona</button>
                    <button className="back-button" onClick={() => setVista("inicio")}>Atrás</button>
                </div>
            )}
    
        </div>
    );
      
}

export default Personal;