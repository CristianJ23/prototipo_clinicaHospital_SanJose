import CredencialesModel from "../models/CredencialesModel.js";

const actualizarRol = async (req, res) => {
    try {
        const { id_credenciales, email, pasword, role, estado } = req.body;
        console.log("", { id_credenciales, email, pasword, role, estado });

        // Verificar que los datos necesarios estén presentes
        if (!id_credenciales || !email || !role) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        // Actualizar la credencial en la base de datos
        const [updatedCredencial] = await CredencialesModel.update(
            {
                correo_electronico: email,
                rol: role,
                estado: estado,
            },
            { where: { id_credencial: id_credenciales } }
        );

        // Verificar si el documento fue encontrado y actualizado
        if (updatedCredencial.modifiedCount === 0) {
            return res.status(404).json({ message: "Credencial no encontrada o no se realizaron cambios." });
        }

        return res.status(200).json({ message: "Rol actualizado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el rol.", error });
    }
};

export default actualizarRol;
