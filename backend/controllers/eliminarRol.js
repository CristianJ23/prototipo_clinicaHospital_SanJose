import CredencialesModel from "../models/CredencialesModel.js";

const deleteRol = async(req, res) => {
    try {
        const { idCredencial } = req.body; // Extraer directamente el idCredencial del cuerpo del request
        console.log("ID de la credencial a eliminar:", idCredencial);

        const updateRol = await CredencialesModel.update(
            {
                estado: "inactivo",
            },
            {where: {id_credencial: idCredencial}},
        );

        if (updateRol.modifiedCount === 0) {
            return res.status(404).json({ message: "Credencial no encontrada o no se realizaron cambios." });
        }

        return res.status(200).json({ message: "Rol actualizado correctamente." });


    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el rol.", error });
    }
}

export default deleteRol;