import { useState } from 'react';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/kriss/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            // console.log(email);
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error al enviar el correo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Recuperar Contraseña</h2>
            <input
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Enviar</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RequestPasswordReset;
