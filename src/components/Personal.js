import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/personal.css";
import debounce from 'lodash.debounce';
import PersonalTable from "./PersonalTable.js";

const Personal = () => {
    const [personaList, setPersonaList] = useState([]);  // Store list of people
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
    ];

        // Function to fetch all people from the API
        const fetchAllPersonas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/kriss/getAllPersonal");
                setPersonaList(response.data);  // Update state with the list of people
            } catch (error) {
                console.error("Error al obtener las personas:", error);
                setMensaje("Error al obtener las personas.");
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
            {/* Barra superior con botones */}
            <header className="header">
                <button className="header-button" onClick={() => alert("Crear Nueva Persona")}>
                    Crear Nueva Persona
                </button>
                <button className="header-button" onClick={() => alert("Dar Acceso a Persona")}>
                    Dar Acceso a Persona
                </button>
                <button className="header-button" onClick={() => alert("Eliminar Rol")}>
                    Eliminar Rol
                </button>
                <button className="header-button" onClick={() => alert("Editar Rol")}>
                    Editar Rol
                </button>
            </header>

            <body>

            <div>
                <h1>Mi Tabla Ordenable</h1>
                <PersonalTable data={personaList} columns={columns} />
            </div>
            </body>
        </div>
    );
};

export default Personal;