import React from "react";

const ResetPassword = () => {
  return (
    <div>
      <h1>Crea una nueva contraseña</h1>
      <form>
        <label>Nueva Contraseña</label>
        <input type="password" placeholder="Ingrese la nueva contraseña" />
        <label>Confirmar Contraseña</label>
        <input type="password" placeholder="Confirme la contraseña" />
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;