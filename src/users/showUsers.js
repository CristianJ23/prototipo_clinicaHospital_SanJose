import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Referencia al endpoint de backend
const URI = 'http://localhost:8000/kriss/persona';

const CompShowUsers = () => {

    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []); // Se ejecuta solo al montar el componente

    // Mostrar todos los usuarios
    const getUsers = async () => {
        const res = await axios.get(URI);
        setUser(res.data);
    };

    // Eliminar un usuario
    const deleteUser = async (id) => {
        await axios.delete(`${URI}${id}`);
        getUsers(); // Refresca la lista después de eliminar
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>surname</th>
                                <th>email</th>
                                <th>password</th>
                                <th>nameRol</th>
                                <th>rol_idRol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id_persona}>
                                    <td>{user.nombres}</td>
                                    <td>{user.apellidos}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.contraseña}</td>
                                    <td>{user.nombreRol}</td>
                                    <td>{user.Rol_idRol}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className="btn btn-info">
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompShowUsers;
