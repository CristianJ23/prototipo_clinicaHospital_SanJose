import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../css/crear_paciente.css";


// Importar imágenes
import crearPacienteImg from "../img2/medico.png";
import gestionHistoriasImg from "../img2/enfermera.png";
import gestion from "../img2/gestion.png";
import home from "../img2/home.png";

const CrearPaciente = ({ onCancel = () => console.log("Cancelación predeterminada") }) => {
  const navigate = useNavigate(); // Initialize the navigate function
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

  const ubicaciones = {
    "Azuay": {
      cantones: {
        "Cuenca": ["Azogues", "Baños", "Chantaco", "Cuenca", "Jadán", "El Valle", "Nulti", "Sinincay", "Turi", "Victoria del Portete"],
        "Girón": ["Girón", "San Fernando", "La Asunción", "Verde Loma", "San Gerardo", "Chumblin", "San Juan", "Loma de Girón", "Capillapamba", "El Plateado"],
        "Gualaceo": ["Gualaceo", "Chordeleg", "San Juan", "Mariano Moreno", "Luis Cordero", "San Juan de Gualaceo", "Bulán", "Remigio Crespo", "San Juan de Pamba", "Gabriel Moscoso"],
        "Paute": ["Paute", "Guachapala", "Amaluza", "Bulán", "Pan", "San Cristóbal", "El Cabo", "La Merced", "Chican", "Uzhupud"],
        "Santa Isabel": ["Santa Isabel", "Zhaglli", "La Victoria", "Gima", "Shagli", "San Salvador", "Canaan", "Nabón", "El Chorro", "Catarama"],
        "Sigsig": ["Sigsig", "Cochapamba", "San Bartolomé", "Ludo", "Jadan", "Pucara", "Chigchig", "La Punta", "Chaucha", "El Progreso"],
        "Nabón": ["Nabón", "Cochapamba", "Oña", "Quera", "Pucacocha", "Gualel", "Guapán", "El Progreso", "Yavi", "Cuchil"],
        "Chordeleg": ["Chordeleg", "San Martín", "Luis Cordero", "La Unión", "Principal", "Pindilig", "El Valle", "Remigio Crespo", "Turi", "Sinincay"],
        "Gualaceo": ["Gualaceo", "San Juan", "Luis Cordero", "Mariano Moreno", "Bulán", "Chordeleg", "Sinincay", "Jadán", "La Unión", "El Valle"],
        "Camilo Ponce Enríquez": ["Camilo Ponce Enríquez", "El Carmen", "La Libertad", "Molleturo", "Chorrillos", "San Gerardo", "Victoria", "El Cisne", "San Miguel", "El Pan"]
      }
    },
    "Bolívar": {
      cantones: {
        "Guaranda": ["Guaranda", "Angochagua", "Salinas", "San Luis", "Simiatug", "San Simón", "Facundo Vela", "Guanujo", "Chimbo", "Echeandía"],
        "Chillanes": ["Chillanes", "San José", "San Pablo", "San Pedro", "Guayabal", "Tushin", "Chimbo", "San Simón", "Angochagua", "Echeandía"],
        "Echeandía": ["Echeandía", "San Simón", "San Pablo", "Salinas", "Simiatug", "San Luis", "Chimbo", "Guanujo", "Angochagua", "Facundo Vela"],
        "San Miguel": ["San Miguel", "Chimbo", "San Pedro", "San Pablo", "Angochagua", "Salinas", "Simiatug", "San Simón", "Facundo Vela", "San Luis"],
        "Chimbo": ["Chimbo", "San Pablo", "Angochagua", "Salinas", "Simiatug", "San Simón", "Guanujo", "Facundo Vela", "San Luis", "Echeandía"],
        "Las Naves": ["Las Naves", "San Luis", "Angochagua", "Guanujo", "Facundo Vela", "Chimbo", "Salinas", "Simiatug", "San Simón", "San Pablo"],
        "San José de Chimbo": ["San José de Chimbo", "Guaranda", "Salinas", "San Luis", "Simiatug", "Angochagua", "San Simón", "Facundo Vela", "Guanujo", "San Pablo"],
        "Salinas": ["Salinas", "San Pablo", "San Pedro", "San Simón", "Facundo Vela", "Guanujo", "Angochagua", "San Luis", "Simiatug", "Chimbo"],
        "Simiatug": ["Simiatug", "San Luis", "Angochagua", "Guanujo", "Facundo Vela", "Chimbo", "Salinas", "San Pablo", "San Pedro", "Echeandía"],
        "Facundo Vela": ["Facundo Vela", "Guaranda", "Angochagua", "Salinas", "San Luis", "San Pablo", "San Simón", "Guanujo", "Simiatug", "Chimbo"]
      }
    },
    "Carchi": {
      cantones: {
        "Tulcán": ["Tulcán", "Maldonado", "Chical", "El Playón", "La Libertad", "El Carmelo", "Cristóbal Colón", "Santa Martha", "San Gabriel", "Julio Andrade"],
        "Mira": ["Mira", "El Playón", "La Libertad", "El Carmelo", "Chical", "Cristóbal Colón", "Julio Andrade", "Maldonado", "Santa Martha", "San Gabriel"],
        "Montúfar": ["Montúfar", "San Gabriel", "La Libertad", "El Carmelo", "Cristóbal Colón", "Mira", "Maldonado", "El Playón", "Chical", "Santa Martha"],
        "San Pedro de Huaca": ["San Pedro de Huaca", "Tulcán", "Mira", "Montúfar", "Julio Andrade", "El Carmelo", "Santa Martha", "Cristóbal Colón", "San Gabriel", "El Playón"],
        "Espejo": ["Espejo", "Tulcán", "Montúfar", "San Pedro de Huaca", "Cristóbal Colón", "La Libertad", "El Carmelo", "Santa Martha", "Mira", "Julio Andrade"],
        "Bolívar": ["Bolívar", "San Gabriel", "Cristóbal Colón", "Santa Martha", "Montúfar", "Mira", "El Playón", "Tulcán", "Chical", "Julio Andrade"],
        "Julio Andrade": ["Julio Andrade", "San Pedro de Huaca", "Tulcán", "Espejo", "Santa Martha", "Montúfar", "Cristóbal Colón", "Mira", "El Carmelo", "La Libertad"],
        "Chical": ["Chical", "Tulcán", "El Playón", "La Libertad", "El Carmelo", "Cristóbal Colón", "Mira", "Julio Andrade", "San Gabriel", "Santa Martha"],
        "La Libertad": ["La Libertad", "Tulcán", "Montúfar", "Mira", "Cristóbal Colón", "San Pedro de Huaca", "Santa Martha", "Espejo", "El Playón", "Chical"]
      }
    },
      "Loja": {
      cantones: {
        "Loja": ["El Sagrario", "San Sebastián", "Sucre", "Carigán", "Vilcabamba", "Malacatos", "Quinara", "Chantaco", "San Lucas", "Chuquiribamba"],
        "Catamayo": ["San José", "La Toma", "Zambi", "El Tambo", "San Pedro", "Trapichillo", "San Antonio", "Gonzanamá", "Cera", "Uzhcurrumi"],
        "Macará": ["General Eloy Alfaro", "Catacocha", "Bellavista", "Sabiango", "La Victoria", "Larama", "Lalama", "Sauces", "Paletillas", "Obando"],
        "Calvas": ["Cariamanga", "Colaisaca", "El Lucero", "Jimbura", "Nambacola", "San Vicente", "Gonzanamá", "Yangana", "San Antonio", "El Tablón"],
        "Puyango": ["Alamor", "El Limo", "Ciano", "Vicentino", "Pindal", "Paletillas", "Mercadillo", "Cazaderos", "Garrapata", "Zapallal"],
        "Saraguro": ["Saraguro", "San Pablo de Tenta", "San Lucas", "El Valle", "Yuluc", "El Cisne", "Urdaneta", "Las Cochas", "Manú", "Silla"],
        "Paltas": ["Catacocha", "Cangonamá", "Colaisaca", "El Arenal", "Guachanamá", "Lauro Guerrero", "Orobo", "San Antonio", "Yuracruz", "Catazacon"],
        "Espíndola": ["Amaluza", "El Ingenio", "Jimbura", "Santa Teresita", "Bellavista", "El Airo", "Zapotillo", "Pózul", "Garzareal", "Mangahurco"],
        "Zapotillo": ["Zapotillo", "Paletillas", "Bolaspamba", "Cazaderos", "Limones", "El Tambo", "Celica", "Mangahurco", "Pindal", "Salinas"],
        "Celica": ["Celica", "Cruzpamba", "Garza", "Sabanilla", "Pindal", "Bolívar", "Mercadillo", "Paletillas", "La Victoria", "Pózul"],
      },
    },
    "Pichincha": {
      cantones: {
        "Quito": ["Centro Histórico", "La Mariscal", "La Floresta", "El Condado", "La Carolina", "Cotocollao", "Chillogallo", "Tumbaco", "Conocoto", "Cumbayá"],
        "Cayambe": ["Cayambe", "Tabacundo", "Olmedo", "San José", "Santa Rosa", "Cangahua", "El Quinche", "Oyambarillo", "Zámbiza", "Guayllabamba"],
        "Rumiñahui": ["Sangolquí", "San Rafael", "San Pedro de Taboada", "Cotogchoa", "Conocoto", "El Triángulo", "Amaguaña", "Píntag", "Guangopolo", "Chillos"],
        "Mejía": ["Machachi", "Aloasí", "Cutuglahua", "El Chaupi", "Tandapi", "Tandacatu", "Pastocalle", "Uyumbicho", "Rumipamba", "Lasso"],
        "Pedro Moncayo": ["Tabacundo", "La Esperanza", "Tocachi", "Malchinguí", "Santa Marianita", "San Pablo", "Gualea", "Guayllabamba", "Oyambarillo", "Cangahua"],
        "Pedro Vicente Maldonado": ["Pedro Vicente Maldonado", "Puerto Quito", "La Celica", "Santa Rosa", "Las Tolas", "Mashpi", "Chontal", "Nanegalito", "Pacto", "Nono"],
        "Puerto Quito": ["Puerto Quito", "La Celica", "Nanegalito", "Mashpi", "Las Golondrinas", "San Pedro de Manglaralto", "La Esperanza", "El Cristal", "Pacto", "Gualea"],
        "San Miguel de los Bancos": ["San Miguel", "Mindo", "Los Bancos", "Nanegalito", "Pacto", "Las Tolas", "Santa Marianita", "La Esperanza", "Nono", "Chontal"],
        "Nanegal": ["Nanegal", "Nanegalito", "Pacto", "Gualea", "Nono", "Mindo", "Santa Marianita", "Las Tolas", "El Cedral", "La Esperanza"],
        "Tababela": ["Tababela", "Puembo", "Pifo", "Cumbayá", "Tumbaco", "Checa", "Yaruquí", "Chaupi", "Conocoto", "El Quinche"],
      },
    },
    "Guayas": {
      cantones: {
        "Guayaquil": ["Tarqui", "Ximena", "Febres Cordero", "Sucre", "Garay", "Rocafuerte", "Puerto Hondo", "Posorja", "Progreso", "Chongón"],
        "Daule": ["Daule", "La Aurora", "El Limonal", "Isidro Ayora", "Juan Bautista Aguirre", "Magro", "Banife", "Los Lojas", "Santa Clara", "Bucay"],
        "Samborondón": ["Samborondón", "La Puntilla", "Tarifa", "La Aurora", "Santa Rosa de Flandes", "San Miguel", "Marcelino Maridueña", "Progreso", "Jujan", "Los Lojas"],
        "Durán": ["Durán", "El Recreo", "Oramas González", "Pancho Jiménez", "Las Lomas", "Los Vergeles", "San Jacinto", "La Toma", "Bellavista", "Victoria"],
        "Milagro": ["Milagro", "Roberto Astudillo", "Chobo", "Mariscal Sucre", "El Progreso", "Virginia", "Narcisa", "Santa Lucía", "Mariscal", "Augusto Martínez"],
        "Naranjal": ["Naranjal", "Santa Rosa", "Taura", "Jesús María", "San Carlos", "San Isidro", "Puerto Inca", "Molleturo", "Chacayacu", "San Nicolás"],
        "Balao": ["Balao", "Guasmo Sur", "Tres Cerritos", "San Ignacio", "Puerto Cañaveral", "Las Mercedes", "Santa Ana", "San Marcos", "Santa Clara", "Chupadores"],
        "Playas": ["General Villamil", "Posorja", "Puerto El Morro", "Data de Villamil", "Progreso", "Chongón", "El Morro", "Engabao", "Las Balsas", "El Arenal"],
        "Balzar": ["Balzar", "Santa Rita", "Los Andes", "San Jacinto", "Sabanilla", "Progreso", "El Laurel", "Balsalito", "Santa Clara", "Colimes"],
        "El Empalme": ["El Empalme", "El Triunfo", "San Jacinto", "Santa María", "El Arenal", "El Salitre", "Cuchilla", "General Vernaza", "Los Ángeles", "Santa Lucía"],
      },
    },
    "Imbabura": {
        cantones: {
          "Ibarra": ["Ibarra", "Otavalo", "Antonio Borrero", "Cruzpamba"],
          "Cotacachi": ["Cotacachi", "Mojanda", "La Calera"],
        },
      },
    "Manabí": {
        cantones: {
          "Portoviejo": ["Portoviejo", "Manta", "Jipijapa"],
          "Manta": ["Manta", "Montecristi", "Puerto López"],
          "Jipijapa": ["Jipijapa", "Pichincha", "San Sebastián"],
        },
      },
      "Morona Santiago": {
        cantones: {
          "Macas": ["Macas", "Limón", "Santiago"],
          "Gualaquiza": ["Gualaquiza", "Nangaritza"],
        },
      },
      "Napo": {
        cantones: {
          "Tena": ["Tena", "Archidona", "Pano", "Misahuallí"],
          "Ahuano": ["Ahuano", "La Chonta", "Santa Clara"],
        },
      },
      "Pastaza": {
        cantones: {
          "Puyo": ["Puyo", "Mera", "Baños de Agua Santa"],
          "Mera": ["Mera", "Baños"],
        },
      },
    "Tungurahua": {
        cantones: {
          "Ambato": ["Ambato", "Baños", "Cevallos", "Pelileo", "Patate"],
          "Baños de Agua Santa": ["Baños de Agua Santa", "Pillaro", "Santiago"],
        },
      },
      "Zamora-Chinchipe": {
        cantones: {
          "Zamora": ["Zamora", "Chinchipe", "Yacuambi", "Loja", "El Pangui"],
          "Chinchipe": ["Chinchipe", "Yacuambi", "Loja", "El Pangui"],
        },
      },
  };
  

  const [cantonesDisponibles, setCantonesDisponibles] = useState([]);
const [parroquiasDisponibles, setParroquiasDisponibles] = useState([]);

  const handleProvinciaChange = (e) => {
    const provinciaSeleccionada = e.target.value;
    setFormData((prev) => ({ ...prev, provincia: provinciaSeleccionada, canton: "", parroquia: "" }));
  
    if (ubicaciones[provinciaSeleccionada]) {
      setCantonesDisponibles(Object.keys(ubicaciones[provinciaSeleccionada].cantones));
    } else {
      setCantonesDisponibles([]);
    }
    setParroquiasDisponibles([]);
  };
  
  const handleCantonChange = (e) => {
    const cantonSeleccionado = e.target.value;
    setFormData((prev) => ({ ...prev, canton: cantonSeleccionado, parroquia: "" }));
  
    const provincia = formData.provincia;
    if (ubicaciones[provincia]?.cantones[cantonSeleccionado]) {
      setParroquiasDisponibles(ubicaciones[provincia].cantones[cantonSeleccionado]);
    } else {
      setParroquiasDisponibles([]);
    }
  };

  //edad calcular
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
  
      if (name === "fecha_nacimiento") {
        const fechaNacimiento = new Date(value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesDiferencia = hoy.getMonth() - fechaNacimiento.getMonth();
        const diaDiferencia = hoy.getDate() - fechaNacimiento.getDate();
  
        // Ajustar la edad si aún no ha cumplido en el año actual
        if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
          edad--;
        }
  
        // Verificar si la edad es negativa (fecha futura)
        if (edad < 0) {
          updatedForm.edad = "Error: la fecha de nacimiento es futura.";
          updatedForm.error = true; // Establecer error
        } else {
          // Calcular meses y días solo si es menor a un mes
          if (edad < 1) {
            let meses = (hoy.getFullYear() - fechaNacimiento.getFullYear()) * 12 + mesDiferencia;
            if (diaDiferencia < 0) meses--; // Ajustar si aún no ha cumplido el mes
  
            // Si es menos de un mes, calcular los días
            if (meses === 0) {
              let dias = Math.floor((hoy - fechaNacimiento) / (1000 * 60 * 60 * 24));
              updatedForm.edad = `${dias} días`;
            } else {
              updatedForm.edad = `${meses} ${meses === 1 ? 'mes' : 'meses'}`; // Singular si es 1 mes
            }
          } else {
            updatedForm.edad = `${edad} años`;
          }
          updatedForm.error = false; // No hay error
        }
      }
  
      return updatedForm;
    });
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
      {/* Contenedor para el menú */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menú</h2>
        <div className="modulo" onClick={() => navigate("/crear-paciente")}>
          <img src={crearPacienteImg} alt="Registro de Paciente" />
          <p>Registro de Paciente</p>
        </div>
        <div className="modulo" onClick={() => navigate("/gestion-historias")}>
          <img src={gestionHistoriasImg} alt="Registro de Historia" />
          <p>Registro de Historia</p>
        </div>
        <div className="modulo" onClick={() => navigate("/gestion")}>
          <img src={gestion} alt="Gestión Historias" />
          <p>Gestión de Historias</p>
        </div>
        <div className="modulo" onClick={() => navigate("/vista-medico")}>
          <img src={home} alt="Home" />
          <p>Home</p>
        </div>
      </div>

      <div className="form-container">
        <h2>Formulario de Registro de Paciente</h2>
        <form onSubmit={handleSubmit}>
          <h3>Registro de Admisión</h3>
          <label>
            Fecha de Admisión:
            <input
              type="date"
              name="fecha_admision"
              value={formData.fecha_admision}
              onChange={handleChange}
              required
            />
          </label>
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
  Edad:
  <input
    type="text"
    name="edad"
    value={formData.edad}
    readOnly
  />
</label>
          <label>
  Nacionalidad:
  <select
    name="nacionalidad" // Nota: usar minúsculas para mantener consistencia
    value={formData.nacionalidad} // Sincronizado con el estado
    onChange={(e) => {
      setFormData((prev) => ({
        ...prev,
        nacionalidad: e.target.value, // Actualiza el valor seleccionado
      }));
    }}
    required
  >
    <option value="">Seleccione</option>
    <option value="Ecuatoriana">Ecuatoriana</option>
    <option value="Argentina">Argentina</option>
    <option value="Brasilera">Brasilera</option>
    <option value="Chilena">Chilena</option>
  </select>
</label>


{formData.error && (
  <div 
    style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
    }}
  >
    Error: la fecha de nacimiento es futura.
  </div>
)}


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
  <select
    name="provincia"
    value={formData.provincia}
    onChange={handleProvinciaChange}
    required
  >
    <option value="">Seleccione</option>
    {Object.keys(ubicaciones).map((provincia) => (
      <option key={provincia} value={provincia}>
        {provincia}
      </option>
    ))}
  </select>
</label>
<label>
  Cantón:
  <select
    name="canton"
    value={formData.canton}
    onChange={handleCantonChange}
    required
    disabled={!cantonesDisponibles.length}
  >
    <option value="">Seleccione</option>
    {cantonesDisponibles.map((canton) => (
      <option key={canton} value={canton}>
        {canton}
      </option>
    ))}
  </select>
</label>
<label>
  Parroquia:
  <select
    name="parroquia"
    value={formData.parroquia}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, parroquia: e.target.value }))
    }
    required
    disabled={!parroquiasDisponibles.length}
  >
    <option value="">Seleccione</option>
    {parroquiasDisponibles.map((parroquia) => (
      <option key={parroquia} value={parroquia}>
        {parroquia}
      </option>
    ))}
  </select>
</label>
{formData.error && (
  <div style={{ color: 'red', marginTop: '10px' }}>
    Error: la fecha de nacimiento es futura.
  </div>
)}

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
            <button type="button" onClick={() => navigate("/vista-medico")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};


export default CrearPaciente;
