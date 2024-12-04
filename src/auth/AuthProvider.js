// auth/AuthProvider.js
import React, { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación, el contexto sirve para compartir valores entre componentes sin usar props
// Este contexto será utilizado para compartir el estado de la autenticación (como si el usuario está autenticado y cuál es su rol) a lo largo de la aplicación.
const AuthContext = createContext();

// Componente AuthProvider, proprciona estados y funciones par los componentes hijos que contendra
export const AuthProvider = ({ children }) => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); // Guarda el rol del usuario

    // Función para manejar el inicio de sesión
    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role); // Asigna el rol al estado
    };

    // Función para manejar el cierre de sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
