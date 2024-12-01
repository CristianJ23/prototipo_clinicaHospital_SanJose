import React, { useState } from "react";
import "../css/crear_paciente.css";

const CrearPaciente = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    celular: "",
    sexo: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    edad: "",
    contacto_de_emergencia: "",
    alergias: "",
    medicamentos_reaccion: "",
    enfermedades_hereditarias: "",
  });

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "nombres",
      "apellidos",
      "cedula",
      "celular",
      "sexo",
      "fecha_nacimiento",
      "correo_electronico",
      "edad",
    ];

    // Verificar campos obligatorios
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Por favor, complete el campo obligatorio: ${field.replace("_", " ")}`);
        return;
      }
    }


//imprimir antes de enviar
console.log("Datos enviados al backend:", formData);


    // Enviar los datos al backend
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
        onCancel(); // Cerrar el formulario
      } else {
        response.json().then((data) => {
          console.error("Error en respuesta del servidor:", data);
          alert("Error al guardar los datos.");
        });
      }
    })
  }
    

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Formulario de Registro de Paciente</h2>
      <label>
        Nombres: <input name="nombres" value={formData.nombres} onChange={handleChange} required />
      </label>
      <label>
        Apellidos: <input name="apellidos" value={formData.apellidos} onChange={handleChange} required />
      </label>
      <label>
        Cédula: <input name="cedula" value={formData.cedula} onChange={handleChange} required />
      </label>
      <label>
        Celular: <input name="celular" value={formData.celular} onChange={handleChange} required />
      </label>
      <label>
        Sexo:
        <select name="sexo" value={formData.sexo} onChange={handleChange} required>
          <option value="">Seleccione</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </label>
      <label>
        Fecha de Nacimiento:
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
      </label>
      <label>
        Correo Electrónico:
        <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required />
      </label>
      <label>
        Edad:
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
      </label>
      <label>
        Contacto de Emergencia:
        <input
          name="contacto_de_emergencia"
          value={formData.contacto_de_emergencia}
          onChange={handleChange}
          placeholder="Ninguno"
        />
      </label>
      <label>
        Alergias: <input name="alergias" value={formData.alergias} onChange={handleChange} />
      </label>
      <label>
        Medicamentos que generan reacción:
        <input
          name="medicamentos_reaccion"
          value={formData.medicamentos_reaccion}
          onChange={handleChange}
        />
      </label>
      <label>
        Enfermedades hereditarias:
        <input
          name="enfermedades_hereditarias"
          value={formData.enfermedades_hereditarias}
          onChange={handleChange}
        />
      </label>
      <div className="button-group">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CrearPaciente;
