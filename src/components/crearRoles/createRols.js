import React, { useState } from "react";
import axios from "axios";
import "../../css/CreateRols.css"; // Importar estilos CSS
import doctorImage from '../../img2/doctorConFormulario.jpg';



const CreateRols = () => {
  const [vista, setVista] = useState("inicio"); // Estados: "inicio", "crearPersona", "darAcceso"
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
    nombres: "",
    apellidos: "",
    cedula: "",
    celular: "",
    sexo: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    edad: "",
    contrasena: "",
    rol: ""
  });


  // Manejar cambios en los inputs
  const handleInputChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Función para buscar persona por cédula
  const buscarPersona = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/kriss/buscarPersonaPorCedula/${cedula}`
      );
      if (response.data) {
        setPersona(response.data);
        setMensaje("");
      } else {
        setMensaje("Persona no encontrada.");
        setPersona(null);
      }
    } catch (error) {
      setMensaje("Error al buscar la persona.");
      setPersona(null);
    }
  };

  // comprobar datos en la consola
  // React.useEffect(() => {
  //   if (credenciales) {
  //     console.log("Persona actualizada:", credenciales);
  //   }
  // }, [credenciales]);


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
        nombres: "",
        apellidos: "",
        cedula: "",
        celular: "",
        sexo: "",
        fecha_nacimiento: "",
        correo_electronico: "",
        edad: '',
      });
      setVista("inicio");
    } catch (error) {
      setMensaje("Error al crear la persona.");
    }
  };

  const buscarPersonaPorCedula = async () => {
    try {
      if (!persona || !persona.cedula) {
        setMensaje("Por favor busca una persona primero.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/kriss/buscarCredencialPorCedula/${persona.cedula}`
      );

      if (response.data) {
        setCredenciales({
          id_credenciales : response.data.id_credencial,
          email: response.data.correo_electronico || "",
          password: response.data.contrasena || "",
          role: response.data.rol || "",
        });
      } else {
        setMensaje("No se encontraron credenciales.");
      }
    } catch (error) {
      setMensaje("Error al buscar credenciales.");
      console.error(error);
    }
  };


  const eliminarRol = async () => {
    try {
      const credencial =
        await axios.get(`http://localhost:8000/kriss/buscarCredencialPorCedula/${persona.cedula}`);
        const credencial_id = credencial.data.id_credencial;
        // console.log("credencial_id", credencial.data);

      await axios.delete(`http://localhost:8000/kriss/credenciales/${credencial_id}`);
      setMensaje("rol eliminado correctamente");

    } catch (error) {
      setMensaje("Error al eliminar la persona.");
    }
  };

  const actualizarRole = async () => {
    try {
      const payload = {
        id_credenciales : credenciales.id_credenciales,
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
      <h1 className="title">Administración de roles</h1>

      {vista === "inicio" && (
        <div className="content-container">

          <div className="button-container">
            <button onClick={() => setVista("crearPersona")}>Crear Nueva Persona</button>
            <button onClick={() => setVista("darAcceso")}>Dar Acceso a Persona Existente</button>
            <button onClick={() => setVista("eliminarRol")}>Eliminar rol</button>
            <button onClick={() => setVista("editarRol")}>Editar rol</button>
          </div>
          <div className="image-container">
            <img src={doctorImage} alt="Imagen doctor con formulario" />
          </div>
        </div>
      )}

      {vista === "editarRol" && (
        <div className="editar-container">
          <h2> Editar rol</h2>
          <button onClick={() => { setVista("inicio"); eliminarDatos() }}>Atrás</button>
          <div>
            <label>
              Buscar por Cédula:
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </label>
            <button onClick={() => { buscarPersona(); buscarPersonaPorCedula() }}>Buscar</button>
          </div>

          {/* mostrar los datos de la persona encontrada */}
          {persona && (
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombre:</strong> {persona.nombres}</p>
              <p><strong>Correo:</strong> {credenciales.email}</p>
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
                onChange={(e) => setCedula(e.target.value)}
              />
            </label>
            <button onClick={buscarPersona}>Buscar</button>
          </div>

          {persona && (
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombre:</strong> {persona.nombres}</p>
              <p><strong>Correo:</strong> {persona.correo_electronico}</p>
            </div>
          )}

          <button onClick={() => eliminarRol(persona.cedula)}>Eliminar rol </button>

        </div>
      )}

      {vista === "darAcceso" && (
        <div className="form-container">
          <h2>Dar Acceso a Persona Existente</h2>
          <button onClick={() => { setVista("inicio"); eliminarDatos(); }}>Atrás</button>

          <div>
            <label>
              Buscar por Cédula:
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </label>
            <button onClick={buscarPersona}>Buscar</button>
          </div>

          {persona && (
            <div>
              <h3>Información de la Persona</h3>
              <p><strong>Nombre:</strong> {persona.nombres}</p>
              <p><strong>Cédula:</strong> {persona.cedula}</p>
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
          <button onClick={() => setVista("inicio")}>Atrás</button>
          <label>
            Nombres:
            <input
              type="text"
              name="nombres"
              value={nuevaPersona.nombres}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Apellidos:
            <input
              type="text"
              name="apellidos"
              value={nuevaPersona.apellidos}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Cédula:
            <input
              type="text"
              name="cedula"
              value={nuevaPersona.cedula}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Celular:
            <input
              type="text"
              name="celular"
              value={nuevaPersona.celular}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Sexo:
            <select
              name="sexo"
              value={nuevaPersona.sexo}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="fecha_nacimiento"
              value={nuevaPersona.fecha_nacimiento}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo_electronico"
              value={nuevaPersona.correo_electronico}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>
          <label>
            Edad:
            <input
              type="number"
              name="edad"
              value={nuevaPersona.edad}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
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
            <input
              type="text"
              name="rol"
              value={nuevaPersona.rol}
              onChange={(e) =>
                handleInputChange(e, setNuevaPersona, nuevaPersona)
              }
            />
          </label>

          <button onClick={guardarNuevaPersona}>Guardar Persona</button>
        </div>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default CreateRols;
