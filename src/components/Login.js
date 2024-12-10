import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/loggin.css"
import { useAuth } from "../auth/AuthProvider"; // Importar el hook de autenticación
import "../css/loggin.css"
import axios from "axios";

export const Login = ({ setUser }) => {
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Realizamos la solicitud al backend para validar las credenciales
            const response = await axios.post("http://localhost:8000/kriss/login", {
                email: email,
                password: password,
            });

            if (response.data.success) {
                // Si las credenciales son correctas, recibimos el rol
                const { role } = response.data; // El backend debe devolver el rol del usuario

                // Redirigimos según el rol
                switch (role) {
                    case "admin":
                        navigate("/inicio"); // Página para administradores
                        break;
                    case "medico":
                        navigate("/inicio_medico"); // Página para médicos
                        break;
                    case "enfermera":
                        navigate("/tratamiento"); // Página para enfermeras
                        break;
                    case "tratante":
                        navigate("/crear_paciente"); // Página para tratantes
                        break;
                    default:
                        console.error("Rol no reconocido:", role);
                        setError(true); // Mostramos un error si el rol no es válido
                        break;
                }

                // Opcional: actualizamos el estado de autenticación con el rol recibido
                login(role);
            } else {
                setError(true); // Si las credenciales no son correctas, mostramos un error
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            setError(true); // Si ocurre un error en la solicitud, mostramos un error
        }
    };

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     // Simulamos un inicio de sesión con un rol específico
    //     const simulatedRole = "doc"; // Esto es solo para pruebas

    //     // Validación de las credenciales
    //     if (email === "kriss@utpl" && password === "123") {
    //         login(simulatedRole); // Actualiza el estado de autenticación
    //         navigate("/inicio"); // Redirige a la página de inicio
    //         login("admin");
    //     } else {
    //         setError(true); // Muestra un error si las credenciales son incorrectas
    //     }
    // };

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
                    <form className="formulario" onSubmit={handleLogin}>
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

