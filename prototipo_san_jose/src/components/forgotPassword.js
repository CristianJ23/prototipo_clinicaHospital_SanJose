import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h1>¿Olvidó su contraseña?</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="Ingrese su correo registrado" />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );
};

export default ForgotPassword;