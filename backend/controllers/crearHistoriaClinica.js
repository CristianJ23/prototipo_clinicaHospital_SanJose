import HistoriaClinicaModel from "../models/HistoriaClinicaModel.js";

//falta por encontrar el area para la historia clinica
const CrearHistoriaClinica = async (req, res) => {
    try {
        // console.log("Sesión recibida en CrearHistoriaClinica:", req.session);
        // console.log("Cookies recibidas:", req.headers.cookie);

        // console.log("persona que ingreso: ", req.session.person.id_persona);
        const id_medico = req.session.person.id_persona;
        
        const historial = req.body;
        historial.id_medico = id_medico;
        console.log("medico", historial.id_medico);
        // historial.id_area = 0;
        // historial.id_area = req.session.person.id_area ? req.session.person.id_area : 0;
        // console.log(historial);

        const newHistory = await HistoriaClinicaModel.create(historial);
        console.log("id de la historia", newHistory.id_historia);

        res.status(200).json({
            id_historia: newHistory.id_historia,
        })
    } catch (e) {
        console.error("error al crear la historia clinica", e);
        res.status(500).json({
            mesage: "error al crear la historia clinica", error: e.message,
        })
    }
}

export default CrearHistoriaClinica;