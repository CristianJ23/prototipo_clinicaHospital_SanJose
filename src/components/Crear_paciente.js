import React, { useState } from "react";
import "../css/crear_paciente.css";

import Vista_medico from "../components/inicio_medico";
// import CrearHistoria from "../components/inicio_enfermera";
import Tratamiento from "../components/tratamientos";
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import tratamientosImg from "../img2/tratamiento.png";

const CrearPaciente = ({ onCancel = () => console.log("Cancelación predeterminada") }) => {
  const [formData, setFormData] = useState({
    // informacion de la persona
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
    nacionalidad: "", //se llena si existe provincia al autocompletarse
    // informacion de el paciente
    // fecha_admision: "", /*se llena con la fecha en que se crea automatico */
    admisionista: "", /* se llena con el id de quien ingreso al sistema*/
    condicion_edad: "",
    autoidentificacion_etnica: "",
    nacionalidad_etnica: "",
    pueblos: "",
    nivel_educacion: "",
    estado_nivel_educacion: "",
    ocupacion: "",
    tipo_empresa: "",
    seguro_salud: "",
    tipo_bono: "",
    provincia: "",//se llena automaticmaente con la parroquia
    canton: "", //se llena automaticmaente con la parroquia
    parroquia: "",
    barrio: "",
    calle_principal: "",
    calle_secundaria: "",
    referencia: "",
    contacto_emergencia_cedula: "",
    contacto_emergencia_nombre: "",
    contacto_emergencia_apellido: "",
    contacto_emergencia_telefono: "",
    contacto_emergencia_direccion: "",
    contacto_emergencia_relacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", formData);

    fetch("http://localhost:8000/kriss/crearPaciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Datos guardados exitosamente.");
          onCancel();
        } else {
          response.json().then((data) => {
            console.error("Error en respuesta del servidor:", data);
            alert("Error al guardar los datos.");
            onCancel();
          });
        }
      });
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <a href="#" className="modulo">
          <img src={crearPacienteImg} alt="Registro de Paciente" />
          <p>Registro de Paciente</p>
        </a>
        {/* <a href={CrearHistoria} className="modulo">
          <img src={gestionHistoriasImg} alt="Registro de Historia" />
          <p>Registro de Historia</p>
        </a> */}
        <a href={Tratamiento} className="modulo">
          <img src={tratamientosImg} alt="Tratamiento" />
          <p>Tratamiento</p>
        </a>
      </div>

      <div className="form-container">
        <h2>Formulario de Registro de Paciente</h2>
        <form onSubmit={handleSubmit}>
          <h3>Registro de Admisión</h3>
          {/* <label>
            Fecha de Admisión:
            <input
              type="date"
              name="fecha_admision"
              value={formData.fecha_admision}
              onChange={handleChange}
              required
            />
          </label> */}
          <label>
            Nombre del Admisionista:
            <input
              name="admisionista"
              value={formData.admisionista}
              onChange={handleChange}
              required
            />
          </label>

          <h3>Datos Personales del Usuario/Paciente</h3>
          <label>
            Primer Apellido:
            <input
              name="primer_apellido"
              value={formData.primer_apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Segundo Apellido:
            <input
              name="segundo_apellido"
              value={formData.segundo_apellido}
              onChange={handleChange}
            />
          </label>
          <label>
            Primer Nombre:
            <input
              name="primer_nombre"
              value={formData.primer_nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Segundo Nombre:
            <input
              name="segundo_nombre"
              value={formData.segundo_nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Tipo de Documento:
            <select
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ci">Cédula de Identidad</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="refugiado">Carné de Refugiado</option>
              <option value="sd">Sin Dato</option>
            </select>
          </label>
          {formData.tipo_documento && (
            <label>
              Número de Documento:
              <input
                name="numero_documento"
                value={formData.numero_documento}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Estado Civil:
            <input
              name="estado_civil"
              value={formData.estado_civil}
              onChange={handleChange}
            />
          </label>
          <label>
            Sexo:
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </label>
          <label>
            Teléfono Fijo:
            <input
              name="telefono_fijo"
              value={formData.telefono_fijo}
              onChange={handleChange}
            />
          </label>
          <label>
            Celular:
            <input
              name="celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
            />
          </label>
          <label>
            Lugar de Nacimiento:
            <input
              name="lugar_nacimiento"
              value={formData.lugar_nacimiento}
              onChange={handleChange}
            />
          </label>
          <label>
            Nacionalidad:
            <input
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleChange}
            />
          </label>
          <label>
            Condición de Edad:
            <input
              name="condicion_edad"
              value={formData.condicion_edad}
              onChange={handleChange}
            />
          </label>
          <label>
            Autoidentificación Étnica:
            <input
              name="autoidentificacion_etnica"
              value={formData.autoidentificacion_etnica}
              onChange={handleChange}
            />
          </label>
          <label>
            Nacionalidad Étnica:
            <input
              name="nacionalidad_etnica"
              value={formData.nacionalidad_etnica}
              onChange={handleChange}
            />
          </label>
          <label>
            Pueblos:
            <input
              name="pueblos"
              value={formData.pueblos}
              onChange={handleChange}
            />
          </label>
          <label>
            Nivel de Educación:
            <input
              name="nivel_educacion"
              value={formData.nivel_educacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Estado del Nivel de Educación:
            <input
              name="estado_nivel_educacion"
              value={formData.estado_nivel_educacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Ocupación:
            <input
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Tipo de Empresa:
            <input
              name="tipo_empresa"
              value={formData.tipo_empresa}
              onChange={handleChange}
            />
          </label>
          <label>
            Seguro de Salud:
            <input
              name="seguro_salud"
              value={formData.seguro_salud}
              onChange={handleChange}
            />
          </label>
          <label>
            Tipo de Bono:
            <input
              name="tipo_bono"
              value={formData.tipo_bono}
              onChange={handleChange}
            />
          </label>

          <h3>Datos de Residencia</h3>
          <label>
            Provincia:
            <input
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantón:
            <input
              name="canton"
              value={formData.canton}
              onChange={handleChange}
            />
          </label>
          <label>
            Parroquia:
            <input
              name="parroquia"
              value={formData.parroquia}
              onChange={handleChange}
            />
          </label>
          <label>
            Barrio o Sector:
            <input
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
            />
          </label>
          <label>
            Calle Principal:
            <input
              name="calle_principal"
              value={formData.calle_principal}
              onChange={handleChange}
            />
          </label>
          <label>
            Calle Secundaria:
            <input
              name="calle_secundaria"
              value={formData.calle_secundaria}
              onChange={handleChange}
            />
          </label>
          <label>
            Referencia:
            <input
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
            />
          </label>

          <h3>Datos de Contacto de Emergencia</h3>
          <label>
            Cédula:
            <input
              name="contacto_emergencia_cedula"
              value={formData.contacto_emergencia_cedula}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nombre:
            <input
              name="contacto_emergencia_nombre"
              value={formData.contacto_emergencia_nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido:
            <input
              name="contacto_emergencia_apellido"
              value={formData.contacto_emergencia_apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              name="contacto_emergencia_telefono"
              value={formData.contacto_emergencia_telefono}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dirección:
            <input
              name="contacto_emergencia_direccion"
              value={formData.contacto_emergencia_direccion}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Relación con el Paciente:
            <input
              name="contacto_emergencia_relacion"
              value={formData.contacto_emergencia_relacion}
              onChange={handleChange}
              required
            />
          </label>

          <div className="button-group">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPaciente;
