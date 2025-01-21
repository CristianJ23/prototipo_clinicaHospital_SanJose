import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/agregar.css";

const guardarModificacion = async (detalles, id, idPaciente) => {
  try {
    // Enviar los detalles de la modificación a tu API
    const response = await fetch("http://localhost:8000/kriss/guardar_modificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        id_historia: id,
        detalles,
        id_paciente: idPaciente, // Enviamos el idPaciente
        fecha: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error("Error al guardar la modificación");
  } catch (error) {
    console.error("Error al guardar la modificación:", error);
    alert("Ocurrió un error al guardar la modificación.");
  }
};

const medicamentos = [
  {
    categoria: "tabletas",
    medicamentos: [
      { nombre: "Paracetamol", dosis: "500 mg" },
      { nombre: "Ibuprofeno", dosis: "400 mg" },
      { nombre: "Amoxicilina", dosis: "500 mg" },
      { nombre: "Metformina", dosis: "850 mg" },
      { nombre: "Losartán", dosis: "50 mg" },
      { nombre: "Atenolol", dosis: "50 mg" },
      { nombre: "Loratadina", dosis: "10 mg" },
      { nombre: "Simvastatina", dosis: "20 mg" },
      { nombre: "Omeprazol", dosis: "20 mg" },
      { nombre: "Clonazepam", dosis: "0.5 mg" }
    ]
  },
  {
    categoria: "inyecciones",
    medicamentos: [
      { nombre: "Ceftriaxona", dosis: "1 g" },
      { nombre: "Penicilina G", dosis: "1.5 millón U" },
      { nombre: "Metotrexato", dosis: "25 mg" },
      { nombre: "Ketorolaco", dosis: "30 mg" },
      { nombre: "Adrenalina", dosis: "1 mg" },
      { nombre: "Fentanilo", dosis: "100 mcg" },
      { nombre: "Insulina Rápida", dosis: "100 U/ml" },
      { nombre: "Tramadol", dosis: "50 mg" },
      { nombre: "Vitamina B12", dosis: "1,000 mcg" },
      { nombre: "Cloruro de sodio", dosis: "0.9%" }
    ]
  },
  {
    categoria: "jarabes",
    medicamentos: [
      { nombre: "Dextrometorfano", dosis: "15 mg/5 ml" },
      { nombre: "Amoxicilina", dosis: "125 mg/5 ml" },
      { nombre: "Ibuprofeno", dosis: "100 mg/5 ml" },
      { nombre: "Clorfenamina", dosis: "2 mg/5 ml" },
      { nombre: "Salbutamol", dosis: "2 mg/5 ml" },
      { nombre: "Mucosolvan", dosis: "30 mg/5 ml" },
      { nombre: "Ambroxol", dosis: "15 mg/5 ml" },
      { nombre: "Loratadina", dosis: "5 mg/5 ml" },
      { nombre: "Domperidona", dosis: "10 mg/5 ml" }
    ]
  }
];

const FormularioTratamiento = () => {
  const { id, idPaciente } = useParams(); // Recuperar idHistoria y idPaciente
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tratamiento: { medicamentos: "", metodoAdministracion: "" } });
  const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState([]);
  const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);

  const handleMedicamentoChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, tratamiento: { ...formData.tratamiento, medicamentos: value } });

    setOpcionesFiltradas(value ? medicamentos.flatMap(categoria =>
      categoria.medicamentos.filter(medicamento => medicamento.nombre.toLowerCase().includes(value.toLowerCase()))
    ) : []);
  };

  const agregarMedicamento = () => {
    const medicamento = obtenerMedicamentoPorNombre(formData.tratamiento.medicamentos);
    if (medicamento && !medicamentosSeleccionados.some(item => item.nombre.toLowerCase() === medicamento.nombre.toLowerCase())) {
      setMedicamentosSeleccionados([...medicamentosSeleccionados, { ...medicamento, metodoAdministracion: formData.tratamiento.metodoAdministracion }]);
      setFormData({ ...formData, tratamiento: { medicamentos: "", metodoAdministracion: "" } });
    } else {
      alert(medicamento ? "Este medicamento ya ha sido agregado" : "Medicamento no encontrado");
    }
  };

  const obtenerMedicamentoPorNombre = (nombre) => {
    return medicamentos.flatMap(categoria => categoria.medicamentos)
      .find(med => med.nombre.toLowerCase() === nombre.toLowerCase());
  };

  const eliminarMedicamento = (medicamento) => {
    setMedicamentosSeleccionados(medicamentosSeleccionados.filter(item => item.nombre !== medicamento.nombre));
  };

  const handleAgregarTratamiento = async (e) => {
    e.preventDefault();
  
    try {
      // Crear el plan de tratamiento
      const planTratamientoResponse = await fetch("http://localhost:8000/kriss/crear_plan_tratamiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ id_historia: id, id_paciente: idPaciente, fecha_inicio: new Date().toISOString(), estado: 'ACTIVO' }),
      });

      if (!planTratamientoResponse.ok) throw new Error("Error al crear el plan de tratamiento");
      const { id_plan_tratamiento } = await planTratamientoResponse.json();

      // Registrar los medicamentos seleccionados
      for (const medicamento of medicamentosSeleccionados) {
        await fetch("http://localhost:8000/kriss/tratamiento", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            medicamentos: medicamento.nombre,
            metodoAdministracion: medicamento.metodoAdministracion,
            id_plan_tratamiento,
            id_paciente: idPaciente, // Incluir el idPaciente
          }),
        });
      }

      alert("Plan de tratamiento y tratamientos registrados exitosamente.");
  
      // Limpiar campos
      setMedicamentosSeleccionados([]);
      setFormData({ tratamiento: { medicamentos: "", metodoAdministracion: "" } });
  
      // Crear detalles de la modificación con los medicamentos agregados
      const nuevoTratamiento = medicamentosSeleccionados.map(med => med.nombre).join(", ");
      const detalles = `El médico agregó un nuevo tratamiento que consistió en ${nuevoTratamiento}`;
      await guardarModificacion(detalles, id, idPaciente); // Incluir idPaciente al guardar

      // Redirigir a la página de detalles
      navigate(`/mostrar/${id}/${idPaciente}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar los datos.");
    }
  };

  const handleCancelar = () => navigate(-1);

  return (
    <form onSubmit={handleAgregarTratamiento} className="form-tratamiento">
      <h2 className="form-title">Tratamiento</h2>
      
      <label className="form-label">
        Medicamentos:
        <input
          type="text"
          value={formData.tratamiento.medicamentos}
          onChange={handleMedicamentoChange}
          placeholder="Buscar medicamento"
          className="input-medicamento"
        />
        {opcionesFiltradas.length > 0 && (
          <div className="sugerencias-lista">
            {opcionesFiltradas.map(medicamento => (
              <div key={medicamento.nombre} className="sugerencia-item" onClick={() => {
                setFormData({ ...formData, tratamiento: { medicamentos: medicamento.nombre } });
                setOpcionesFiltradas([]);}}>
                {medicamento.nombre} ({medicamento.dosis})
              </div>
            ))}
          </div>
        )}
      </label>

      <label className="form-label">
        Método de Administración:
        <input
          type="text"
          value={formData.tratamiento.metodoAdministracion}
          onChange={(e) => setFormData({ ...formData, tratamiento: { ...formData.tratamiento, metodoAdministracion: e.target.value } })}
          placeholder="Método de administración"
          className="input-metodo"
        />
      </label>
      <button type="button" onClick={agregarMedicamento} className="btn-agregar">Agregar</button>

      <div className="medicamentos-seleccionados">
        <h3 className="plan-title">Plan de tratamiento</h3>
        <div className="medicamentos-lista">
          {medicamentosSeleccionados.map(medicamento => (
            <div key={medicamento.nombre} className="medicamento-item">
              <span>{medicamento.nombre} ({medicamento.dosis}) - Método: {medicamento.metodoAdministracion}</span>
              <button type="button" onClick={() => eliminarMedicamento(medicamento)} className="btn-eliminar">Eliminar</button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-guardar">Guardar Tratamiento</button>
      <button type="button" onClick={handleCancelar} className="btn-cancelar">Cancelar</button>
    </form>
  );
};

export default FormularioTratamiento;
