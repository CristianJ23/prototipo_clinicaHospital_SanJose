import React, { useState } from 'react';
import '../css/recuperar.css';

const Recuperar = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del correo para recuperar la contraseña.
        console.log("Email enviado a: ", email);
    };

    return (
        <div className="recuperar-container">
            <div className="recuperar-box">
                <h1>Has olvidado tu contraseña</h1>
                <form onSubmit={handleSubmit}>
                    <label>Introduzca su correo registrado</label>
                    <input
                        type="email"
                        placeholder="Ingrese su correo aquí"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">ENVIAR</button>
                </form>
                <p>
                    <a href="/">Volver al inicio</a>
                </p>
                <p className="footer-text">
                    Si no puede encontrar el correo electrónico de confirmación en su bandeja de entrada, revise su sección de correo no deseado o spam.
                </p>
            </div>
        </div>
    );
};

export default Recuperar;
