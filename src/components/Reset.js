import { useState } from "react";
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams(); // Capturar el token directamente de la URL

    console.log(token); // Verificar que el token se está extrayendo correctamente

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/kriss/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error al actualizar la contraseña.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Restablecer Contraseña</h2>
            <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Actualizar</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ResetPassword;
