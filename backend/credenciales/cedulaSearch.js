import db from '../database/db.js'

//funcion para encontrar el numero de cedula
const BuscarPersona = async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log("Datos recibidos en el backend:", cedula);


        const query = `
      SELECT * FROM persona WHERE numero_documento = ? ;
        `

        const [result] = await db.query(query, {
            replacements: [cedula],
        });

        if (result.length > 0) {
            const persona = result[0]; // Obtiene el primer elemento del resultado.
            console.log(`persona encontrada: ${persona.id_persona}`);

            res.json(persona);
            
        } else {
            console.log('No se encontró ninguna persona con esa cédula');
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar cédula:', error);
        res.status(500).json({ message: 'Error al buscar cédula', error: error.message });
    }
}

export default BuscarPersona;