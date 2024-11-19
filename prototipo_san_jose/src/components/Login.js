import "../css/loggin.css"
import React from "react";
import { useState } from "react";

const Login = () => {
    const[usuario, setnombre] = useState("")
    const[contraseña, setcCntraseña] = useState("")
  return (
    <div>
      <h1>¡Bienvenido a la Clínica San José!</h1>
      <form className="formulario">
        <label>Email</label>
        <input type="email" placeholder="Ingrese su correo aquí" 
        value={usuario}
        onChange={e => setnombre(e.target.value)}
        />
        <label>Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;