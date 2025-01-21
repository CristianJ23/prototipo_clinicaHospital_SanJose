import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";

//falta por encontrar el area para la historia clinica
const CrearHistoriaClinica = async (req, res) => {
    try {
        // console.log("Sesión recibida en CrearHistoriaClinica:", req.session);
        // console.log("Cookies recibidas:", req.headers.cookie);
        // console.log("persona que ingreso: ", req.session.person.id_persona);
        const id_medico = req.session.person.id_persona;
        const input = req.body; // Datos enviados desde el formulario
        input.id_medico = id_medico;
        input.id_area = req.session.person.id_area ? req.session.person.id_area : 0;
        // Transformar datos para la base de datos
        const historial = {
            id_paciente: input.id_paciente,
            id_medico: input.id_medico,
            motivoConsulta: input.motivoConsulta,
            antecedentesPatologicosPersonales: input.antecedentesPatologicosPersonales,
            presionArterial: input.constantesVitales.presionArterial || null,
            peso: input.constantesVitales.peso || null,
            talla: input.constantesVitales.talla || null,
            imc: input.constantesVitales.imc || null,
            perimetroAbdominal: input.constantesVitales.perimetroAbdominal || null,
            glucosaCapilar: input.constantesVitales.glucosaCapilar || null,
            hemoglobinaCapilar: input.constantesVitales.hemoglobinaCapilar || null,
            pulsioximetria: input.constantesVitales.pulsioximetria || null,
            observacion_fisica: input.examenFisico.observacion || "",
            observacion_organos: input.revisionOrganosYSystems.observacion || "",
            ...mapNamesToFields(input.examenFisico.seleccionados, [
                "cabeza", "cuello", "torax", "abdomen", "extremidades",
                "piel", "sistema_linfatico", "sistema_nervioso",
                "fisico_cardiovascular", "fisico_respiratorio",
            ]),
            ...mapNamesToFields(input.revisionOrganosYSystems.seleccionados, [
                "organos_sentidos", "respiratorio", "cardiovascular",
                "digestivo", "urinario", "musculo_esqueletico",
                "endocrino", "nervioso",
            ]),
        };

        // Insertar en la base de datos
        const newHistory = await HistoriaClinicaModel.create(historial);

        res.status(200).json({
            id_historia: newHistory.id_historia,
        });
    } catch (e) {
        console.error("Error al crear la historia clínica", e);
        res.status(500).json({
            message: "Error al crear la historia clínica",
            error: e.message,
        });
    }
};

// Función para mapear nombres a campos con valores 1 o 0
function mapNamesToFields(selectedNames, fieldNames) {
    const result = {};
    fieldNames.forEach((field) => {
        result[field] = selectedNames.includes(field) ? 1 : 0; // Si el nombre existe, 1; si no, 0
    });
    return result;
}

export default CrearHistoriaClinica;