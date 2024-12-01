import React, { useState } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // Importar el hook de autenticación
import "../css/loggin.css"
import { useAuth } from "../auth/AuthProvider"; // Importar el hook de autenticación
import "../css/loggin.css"

export const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();  // Acceder a setIsAuthenticated desde el contexto

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateCredentials(email, password);
        if (isValid) {
            setIsAuthenticated(true);  // Actualizar el estado de autenticación
            navigate("/inicio");
        } else {
            setError(true);
        }
    };

    const validateCredentials = (email, password) => {
        return email === "cj@utpl" && password === "123456";
    };

    const handleForgotPassword = () => {
        navigate("/recuperar");
    };

    const handleGoToUsers = () => {
        navigate("/users");
    };

    return (
        <div className="login-container">
            <div className="image-section"></div>
            <div className="form-section">
                <div className="contenedor-login">
                    <h1>¡Bienvenido a la Clínica San José!</h1>
                    <form className="formulario" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Ingrese su correo aquí"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="seccion-recordar">
                            <label>
                                <input type="checkbox" /> Recuérdame
                            </label>
                            <span
                                className="olvido-contrasena"
                                onClick={handleForgotPassword}
                            >
                                ¿Olvidó su contraseña?
                            </span>
                        </div>
                        <button type="submit">Iniciar sesión</button>
                        <hr />
                        <button type="button" onClick={handleGoToUsers}>
                            Usuarios creados
                        </button>
                    </form>
                    {error && (
                        <p className="error">Credenciales incorrectas, intente nuevamente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;

