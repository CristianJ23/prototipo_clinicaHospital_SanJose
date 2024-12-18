import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/CreateRols.css"; // Importar estilos CSS
import doctorImage from '../../img2/doctorConFormulario.jpg';
import debounce from 'lodash.debounce';


const CreateRols = () => {
  const [vista, setVista] = useState("inicio"); // Estados: "inicio", "crearPersona", "darAcceso"
  const navigate = useNavigate();  // Hook para navegación programática
  const [cedula, setCedula] = useState("");
  const [persona, setPersona] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [credenciales, setCredenciales] = useState({
    id_credenciales: "",
    email: "",
    password: "",
    role: "",
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

  /* hacer llamadas para buscar al escribir */
  const debouncedBuscarPersonaPorCedula = debounce(async (cedula) => {
    if (cedula) {
      try {
        await buscarPersona(cedula); // Ejecutar buscarPersona primero
        await buscarPersonaPorCedula(cedula); // Luego ejecutar buscarPersonaPorCedula
        if (buscarPersonaPorCedula.length > 0) {
          // setMensaje("");
          // eliminarDatos();
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
      };
      await axios.post("http://localhost:8000/kriss/createRolNoPrimeraVez", payload);
      setMensaje("Credenciales guardadas exitosamente.");
      setCredenciales({ id_credenciales: "", email: "", password: "", role: "" });
      setPersona(null);
      setCedula("");
    } catch (error) {
      setMensaje("Error al guardar las credenciales.");
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




  return (
    <div className="container">
      {vista === "inicio" && (
        <div className="content-container">
        <h1 className="title">Administración de roles</h1>
        <div className="button-container">
  <div className="button-module">
    <button onClick={() => setVista("crearPersona")}>Crear Nueva Persona</button>
  </div>
  <div className="button-module">
    <button onClick={() => setVista("darAcceso")}>Dar Acceso a Persona Existente</button>
  </div>
  <div className="button-module">
    <button onClick={() => setVista("eliminarRol")}>Eliminar rol</button>
  </div>
  <div className="button-module">
    <button onClick={() => setVista("editarRol")}>Editar rol</button>
  </div>
  
</div>
<button onClick={() => navigate("/inicio")}>
              Volver
   </button>

          
        </div>
      )}

      {vista === "editarRol" && (
        <div className="editar-container">
          <h2> Editar rol</h2>
          <div>
            <label>
              Buscar por Cédula:
              <input
                type="text"
                value={cedula}
                onChange={handleCedulaChange} // Solo actualiza el estado y llama a debounce
              // onChange={(e) => setCedula(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     buscarPersona();
              //     // buscarPersonaPorCedula();
              //     debouncedBuscarPersonaPorCedula();
              //   }
              // }}
              />
            </label>
            {/* <button
              onClick={() => {
                buscarPersona();
                // buscarPersonaPorCedula();
                debouncedBuscarPersonaPorCedula();
              }}
            >
              Buscar
            </button> */}
            <button onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>
          </div>

          {/* mostrar los datos de la persona encontrada */}
          {persona && (
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombres:</strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
              <p><strong>Apellidos:</strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
            </div>
          )}

          {/* campos para cambiar los datos */}
          {persona && (
            <div>
              <h3>Datos de Credenciales</h3>
              <label>
                Rol:
                <input
                  type="text"
                  name="role"
                  value={credenciales.role}
                  onChange={(e) =>
                    handleInputChange(e, setCredenciales, credenciales)
                  }
                />
              </label>
              <button onClick={actualizarRole}>Guardar</button>
            </div>
          )}

        </div>
      )}

      {vista === "eliminarRol" && (
        <div className="eliminar-container">
          <h2>Eliminar Rol</h2>
          <button onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>


          <div>
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
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombres:</strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
              <p><strong>Apellidos:</strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
            </div>
          )}

          <button onClick={() => eliminarRol(persona.cedula)}>Eliminar rol </button>
          <button onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>

        </div>
      )}

      {vista === "darAcceso" && (
        <div className="form-container-2">
          <h2>Dar Acceso a Persona Existente</h2>
          
          <div>
            <label>
              Buscar por Cédula:
              <input
                type="text"
                value={cedula}
                onChange={handleCedulaChange}
              />
            </label>
          </div>
          <button onClick={() => { setVista("inicio"); eliminarDatos(); }}>Atrás</button>


          {persona && (
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombres:</strong> {persona.primer_nombre + " " + persona.segundo_nombre}</p>
              <p><strong>Apellidos:</strong> {persona.primer_apellido + " " + persona.segundo_apellido}</p>
            </div>
          )}

          {persona && (
            <div>
              <h3>Datos de Credenciales</h3>
              <label>
                Correo Electrónico:
                <input
                  type="email"
                  name="email"
                  value={credenciales.email}
                  onChange={(e) =>
                    handleInputChange(e, setCredenciales, credenciales)
                  }
                />
              </label>
              <label>
                Contraseña:
                <input
                  type="password"
                  name="password"
                  value={credenciales.password}
                  onChange={(e) =>
                    handleInputChange(e, setCredenciales, credenciales)
                  }
                />
              </label>
              <label>
                Rol:
                <input
                  type="text"
                  name="role"
                  value={credenciales.role}
                  onChange={(e) =>
                    handleInputChange(e, setCredenciales, credenciales)
                  }
                />
              </label>
              <button onClick={guardarCredenciales}>Guardar</button>
            </div>
          )}
        </div>
      )}

      {vista === "crearPersona" && (
        <div className="form-container">
          {/* <button onClick={() => setVista("inicio")}>Atrás</button> */}
          <h2>Crear Nueva Persona</h2>
          <label>
            primer nombre:
            <input
              type="text"
              name="primer_nombre"
              value={nuevaPersona.primer_nombre}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            segundo nombre:
            <input
              type="text"
              name="segundo_nombre"
              value={nuevaPersona.segundo_nombre}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            primer apellido:
            <input
              type="text"
              name="primer_apellido"
              value={nuevaPersona.primer_apellido}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            segundo apellido:
            <input
              type="text"
              name="segundo_apellido"
              value={nuevaPersona.segundo_apellido}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Tipo de Documento:
            <select
              name="tipo_documento"
              value={nuevaPersona.tipo_documento}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
              require
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
                onChange={(e) =>
                  handleInputChange(e, setNuevaPersona, nuevaPersona)
                }
                required
              />
            </label>
          )}
          <label>
            Estado Civil:
            <input
              name="estado_civil"
              value={nuevaPersona.estado_civil}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            Sexo:
            <select
              name="sexo"
              value={nuevaPersona.sexo}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } required
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
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo_electronico"
              value={nuevaPersona.correo_electronico}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="fecha_nacimiento"
              value={nuevaPersona.fecha_nacimiento}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            Lugar de Nacimiento:
            <input
              name="lugar_nacimiento"
              value={nuevaPersona.lugar_nacimiento}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            Nacionalidad:
            <input
              name="nacionalidad"
              value={nuevaPersona.nacionalidad}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              } />
          </label>
          <label>
            contraseña:
            <input
              type="text"
              name="contrasena"
              value={nuevaPersona.contrasena}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            rol:
            <select
              name="rol"
              value={nuevaPersona.rol}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            >
              <option value="">Seleccione un rol</option> {/* Opción por defecto */}
              <option value="admin">Administrador</option>
              <option value="medico">medico</option>
              <option value="enfermera">enfermera</option>
              <option value="tratante">tratante</option>
            </select>
          </label>

          {/* Campos condicionales para Médico o Enfermera */}
          {(nuevaPersona.rol === "medico" || nuevaPersona.rol === "enfermera") && (
            <>
              <label>
                Área:
                <select
                  name="area"
                  value={nuevaPersona.area}
                  onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                >
                  <option value="">Seleccione un área</option>
                  <option value="cardiologia">Cardiología</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="urgencias">Urgencias</option>
                </select>
              </label>

              <label>
                Especialidad:
                <select
                  name="especialidad"
                  value={nuevaPersona.especialidad}
                  onChange={(e) => handleInputChange(e, setNuevaPersona, nuevaPersona)}
                >
                  <option value="">Seleccione una especialidad</option>
                  <option value="cirugia">Cirugía</option>
                  <option value="neurologia">Neurología</option>
                </select>
              </label>
            </>
          )}


          <button onClick={guardarNuevaPersona}>Guardar Persona</button>
          <button onClick={() => setVista("inicio")}>Atrás</button>
        </div>
      )}


      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>

    
    
  );
};

export default CreateRols;
