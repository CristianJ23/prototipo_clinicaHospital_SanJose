import CredencialesModel from "../models/CredencialesModel.js";

const deleteRol = async (req, res) => {
    try {
        const { idCredencial } = req.params; // Extraer desde req.params
        console.log("ID de la credencial a inactivar:", idCredencial);

        // Ejecutar el update para cambiar el estado a "inactivo"
        const [updatedRows] = await CredencialesModel.update(
            { estado: "inactivo" },
            { where: { id_credencial: idCredencial } }
        );

        // Verificar si se actualizó alguna fila
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Credencial no encontrada o ya está inactiva." });
        }

        return res.status(200).json({ message: `Rol actualizado correctamente. Filas afectadas: ${updatedRows}` });

    } catch (error) {
        console.error("Error al actualizar el rol:", error);
        return res.status(500).json({ message: "Error al actualizar el rol.", error: error.message });
    }
};

export default deleteRol;
