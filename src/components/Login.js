import "../css/loggin.css"
import React from "react";
import { useState } from "react";

export const Login = ({setUser}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === "" || password === "") { 
        setError(true)
        return
        }
        setError(false)

        setUser([email])
    }

return (
    <div>
        <h1>¡Bienvenido a la Clínica San José!</h1>
        <form className="formulario" onSubmit={handleSubmit} >
            <label>Email</label>
            <input type="email" placeholder="Ingrese su correo aquí"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button>Iniciar sesión</button>
        </form>
        {error && <p>Todos los campos son obligatorios</p>}
    </div>
);
};

export default Login;