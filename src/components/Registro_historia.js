import React, { useState } from "react";
import "../css/registroHistoria.css";

const RegistroHistoria = ({ onCancel }) => {
  const [tratamiento, setTratamiento] = useState({
    medicamentos: "",
    instruccionesSuministro: "",
  });

  const [pacienteData, setPacienteData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    celular: "",
    sexo: "",
    fecha_nacimiento: "",
    edad: "",
  });

  const [formData, setFormData] = useState({
    institucionSistema: "",
    numeroHistoriaUnica: "",
    numeroArchivo: "",
    numeroHoja: "",
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    sexo: "",
    edad: "",
    motivoConsulta: {
      tipo: "", // "Primera" o "Subsecuente"
    },
    antecedentesPatologicosPersonales: "",
    establecimientoSalud: "",
    enfermedadProblemaActual: "",
    factoresAgravantes: "",
    hora: "",
    constantesVitales: {
      fecha: "",
      presionArterial: "",
      peso: "",
      talla: "",
      temperatura: "",
      pulso: "",
      perimetroAbdominal: "",
      frecuencia: "",
      glucosaCapilar: "",
      hemoglobinaCapilar: "",
    },
    revisionOrganosYSystems: {
      organosSentidos: "",
      respiratorio: "",
      cardiovascular: "",
      digestivo: "",
      urinario: "",
      musculoEsqueletico: "",
      endocrino: "",
      nervioso: "",
    },
  });

  const [activeSection, setActiveSection] = useState("datosGenerales");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (section, name, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tratamientoData = {
      medicamentos: tratamiento.medicamentos,
      instruccionesSuministro: tratamiento.instruccionesSuministro,
    };

    try {
      // Primero, enviar el tratamiento y obtener el ID
      const tratamientoResponse = await fetch("http://localhost:8000/kriss/crearTratamiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tratamientoData),
      });

      if (!tratamientoResponse.ok) {
        console.error("Error al enviar tratamiento.");
        return;
      }

      const tratamiento = await tratamientoResponse.json(); // Suponiendo que el ID viene en la respuesta
      const tratamientoId = tratamiento.id;

      // Ahora, enviar la historia clínica y asignar el ID del tratamiento
      const historiaData = {
        institucionSistema: formData.institucionSistema,
        numeroHistoriaUnica: formData.numeroHistoriaUnica,
        numeroArchivo: formData.numeroArchivo,
        numeroHoja: formData.numeroHoja,
        primerApellido: formData.primerApellido,
        segundoApellido: formData.segundoApellido,
        primerNombre: formData.primerNombre,
        segundoNombre: formData.segundoNombre,
        sexo: formData.sexo,
        edad: formData.edad,
        motivoConsulta: formData.motivoConsulta,
        antecedentesPatologicosPersonales: formData.antecedentesPatologicosPersonales,
        establecimientoSalud: formData.establecimientoSalud,
        enfermedadProblemaActual: formData.enfermedadProblemaActual,
        factoresAgravantes: formData.factoresAgravantes,
        hora: formData.hora,
        constantesVitales: formData.constantesVitales,
        revisionOrganosYSystems: formData.revisionOrganosYSystems,
        tratamientoId: tratamientoId, // Asignar el ID del tratamiento
      };

      const historiaResponse = await fetch("http://localhost:8000/kriss/crearHistoriaClinica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historiaData),
      });

      if (historiaResponse.ok) {
        console.log("Historia clínica enviada correctamente.");
      } else {
        console.error("Error al enviar historia clínica.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      institucionSistema: "",
      numeroHistoriaUnica: "",
      numeroArchivo: "",
      numeroHoja: "",
      primerApellido: "",
      segundoApellido: "",
      primerNombre: "",
      segundoNombre: "",
      sexo: "",
      edad: "",
      motivoConsulta: { tipo: "" },
      antecedentesPatologicosPersonales: "",
      establecimientoSalud: "",
      enfermedadProblemaActual: "",
      factoresAgravantes: "",
      hora: "",
      constantesVitales: {
        fecha: "",
        presionArterial: "",
        peso: "",
        talla: "",
        temperatura: "",
        pulso: "",
        perimetroAbdominal: "",
        frecuencia: "",
        glucosaCapilar: "",
        hemoglobinaCapilar: "",
      },
      revisionOrganosYSystems: {
        organosSentidos: false,
        respiratorio: false,
        cardiovascular: false,
        digestivo: false,
        urinario: false,
        musculoEsqueletico: false,
        endocrino: false,
        nervioso: false,
      },
    });
    alert("Formulario cancelado y datos borrados.");
  };

  const handleCedulaSubmit = async () => {
    const cedula = formData.cedula;
    try {
      const response = await fetch(`http://localhost:8000/kriss/crearPaciente?cedula=${cedula}`);
      if (response.ok) {
        const data = await response.json();
        setPacienteData(data);
      } else {
        console.error("Error al obtener los datos del paciente.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="registro-historia">
      <h1>Registro de Historia Clínica</h1>

      {/* Navegación por secciones */}
      <nav className="form-nav">
        <button onClick={() => setActiveSection("datosPaciente")}>Datos Generales</button>
        <button onClick={() => setActiveSection("motivoConsulta")}>Motivo de Consulta</button>
        <button onClick={() => setActiveSection("antecedentesPatologicos")}>Antecedentes Patológicos</button>
        <button onClick={() => setActiveSection("enfermedadProblemaActual")}>Enfermedad o Problema Actual</button>
        <button onClick={() => setActiveSection("constantesVitales")}>Constantes Vitales</button>
        <button onClick={() => setActiveSection("revisionOrganos")}>Revisión de Órganos</button>
        <button onClick={() => setActiveSection("tratamiento")}>Tratamiento</button>
      </nav>

      <form onSubmit={handleSubmit}>
        {/* Sección A: Datos del Establecimiento y Usuario */}
        {activeSection === "datosPaciente" && (
          <section>
            <h2>Datos del Establecimiento y Usuario</h2>
            <label>
            <label>
              Cédula:
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
              />
            </label>
              Nombres:
              <input
                type="text"
                name="nombres"
                value={pacienteData.nombres}
                disabled
              />
            </label>
            <label>
              Apellidos:
              <input
                type="text"
                name="apellidos"
                value={pacienteData.apellidos}
                disabled
              />
            </label>
            <button onClick={handleCedulaSubmit}>Obtener Datos</button>
          </section>
        )}

        {/* Sección B: Motivo de Consulta */}
        {activeSection === "motivoConsulta" && (
          <section>
            <h2>Motivo de Consulta</h2>
            <label>
              <input
                type="radio"
                name="tipoMotivo"
                value="Primera"
                checked={formData.motivoConsulta.tipo === "Primera"}
                onChange={() => handleNestedChange("motivoConsulta", "tipo", "Primera")}
              />
              Primera
            </label>
            <label>
              <input
                type="radio"
                name="tipoMotivo"
                value="Subsecuente"
                checked={formData.motivoConsulta.tipo === "Subsecuente"}
                onChange={() => handleNestedChange("motivoConsulta", "tipo", "Subsecuente")}
              />
              Subsecuente
            </label>
          </section>
        )}

        {/* Sección C: Antecedentes Patológicos Personales */}
        {activeSection === "antecedentesPatologicos" && (
          <section>
            <h2>Antecedentes Patológicos Personales</h2>
            <textarea
              name="antecedentesPatologicosPersonales"
              value={formData.antecedentesPatologicosPersonales}
              onChange={handleInputChange}
            />
          </section>
        )}

        {/* Sección D: Enfermedad o Problema Actual */}
        {activeSection === "enfermedadProblemaActual" && (
          <section>
            <h2>Enfermedad o Problema Actual</h2>
            <textarea
              name="enfermedadProblemaActual"
              value={formData.enfermedadProblemaActual}
              onChange={handleInputChange}
            />
          </section>
        )}

        {/* Sección E: Factores Aggravantes */}
        {activeSection === "factoresAgravantes" && (
          <section>
            <h2>Factores Aggravantes</h2>
            <textarea
              name="factoresAgravantes"
              value={formData.factoresAgravantes}
              onChange={handleInputChange}
            />
          </section>
        )}

        {/* Sección F: Constantes Vitales y Antropometría */}
        {activeSection === "constantesVitales" && (
          <section>
            <h2>Constantes Vitales y Antropometría</h2>
            <label>
              Hora:
              <input type="text" name="hora" value={formData.hora} onChange={handleInputChange} />
            </label>
            <label>
              Fecha:
              <input type="date" name="fecha" value={formData.constantesVitales.fecha} onChange={(e) => handleNestedChange("constantesVitales", "fecha", e.target.value)} />
            </label>
            <label>
              Presión Arterial:
              <input type="text" name="presionArterial" value={formData.constantesVitales.presionArterial} onChange={(e) => handleNestedChange("constantesVitales", "presionArterial", e.target.value)} />
            </label>
            <label>
              Peso (Kg):
              <input type="text" name="peso" value={formData.constantesVitales.peso} onChange={(e) => handleNestedChange("constantesVitales", "peso", e.target.value)} />
            </label>
            <label>
              Talla (cm):
              <input type="text" name="talla" value={formData.constantesVitales.talla} onChange={(e) => handleNestedChange("constantesVitales", "talla", e.target.value)} />
            </label>
            <label>
              Temperatura:
              <input type="text" name="temperatura" value={formData.constantesVitales.temperatura} onChange={(e) => handleNestedChange("constantesVitales", "temperatura", e.target.value)} />
            </label>
            <label>
              Pulso / min:
              <input type="text" name="pulso" value={formData.constantesVitales.pulso} onChange={(e) => handleNestedChange("constantesVitales", "pulso", e.target.value)} />
            </label>
            <label>
              Perímetro Abdominal:
              <input type="text" name="perimetroAbdominal" value={formData.constantesVitales.perimetroAbdominal} onChange={(e) => handleNestedChange("constantesVitales", "perimetroAbdominal", e.target.value)} />
            </label>
            <label>
              Frecuencia:
              <input type="text" name="frecuencia" value={formData.constantesVitales.frecuencia} onChange={(e) => handleNestedChange("constantesVitales", "frecuencia", e.target.value)} />
            </label>
            <label>
              Glucosa Capilar (mg):
              <input type="text" name="glucosaCapilar" value={formData.constantesVitales.glucosaCapilar} onChange={(e) => handleNestedChange("constantesVitales", "glucosaCapilar", e.target.value)} />
            </label>
            <label>
              Hemoglobina Capilar (g/dL):
              <input type="text" name="hemoglobinaCapilar" value={formData.constantesVitales.hemoglobinaCapilar} onChange={(e) => handleNestedChange("constantesVitales", "hemoglobinaCapilar", e.target.value)} />
            </label>
          </section>
        )}


        {/* Sección G: Revisión Actual de Órganos y Sistemas */}
{activeSection === "revisionOrganos" && (
  <section>
    <h2>Revisión Actual de Órganos y Sistemas</h2>
    
    <label>
      Órganos de los Sentidos:
      <textarea
        name="organosSentidos"
        value={formData.revisionOrganosYSystems.organosSentidos}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "organosSentidos", e.target.value)}
        placeholder="Ingrese detalles sobre los órganos de los sentidos"
      />
    </label>
    
    <label>
      Respiratorio:
      <textarea
        name="respiratorio"
        value={formData.revisionOrganosYSystems.respiratorio}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "respiratorio", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema respiratorio"
      />
    </label>
    
    <label>
      Cardiovascular:
      <textarea
        name="cardiovascular"
        value={formData.revisionOrganosYSystems.cardiovascular}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "cardiovascular", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema cardiovascular"
      />
    </label>
    
    <label>
      Digestivo:
      <textarea
        name="digestivo"
        value={formData.revisionOrganosYSystems.digestivo}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "digestivo", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema digestivo"
      />
    </label>
    
    <label>
      Urinario:
      <textarea
        name="urinario"
        value={formData.revisionOrganosYSystems.urinario}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "urinario", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema urinario"
      />
    </label>
    
    <label>
      Músculo Esquelético:
      <textarea
        name="musculoEsqueletico"
        value={formData.revisionOrganosYSystems.musculoEsqueletico}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "musculoEsqueletico", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema músculo esquelético"
      />
    </label>
    
    <label>
      Endocrino:
      <textarea
        name="endocrino"
        value={formData.revisionOrganosYSystems.endocrino}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "endocrino", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema endocrino"
      />
    </label>
    
    <label>
      Nervioso:
      <textarea
        name="nervioso"
        value={formData.revisionOrganosYSystems.nervioso}
        onChange={(e) => handleNestedChange("revisionOrganosYSystems", "nervioso", e.target.value)}
        placeholder="Ingrese detalles sobre el sistema nervioso"
      />
    </label>
    
  </section>
)}

        {/* Sección G: Tratamiento */}
        {activeSection === "tratamiento" && (
          <section>
            <h2>Tratamiento</h2>
            <label>
              Medicamentos:
              <input
                type="text"
                name="medicamentos"
                value={tratamiento.medicamentos}
                onChange={(e) => setTratamiento({ ...tratamiento, medicamentos: e.target.value })}
              />
            </label>
            <label>
              Instrucciones de Suministro:
              <input
                type="text"
                name="instruccionesSuministro"
                value={tratamiento.instruccionesSuministro}
                onChange={(e) => setTratamiento({ ...tratamiento, instruccionesSuministro: e.target.value })}
              />
            </label>
          </section>
        )}

        <button type="submit">Enviar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>


      </form>
    </div>
  );
};

export default RegistroHistoria;
