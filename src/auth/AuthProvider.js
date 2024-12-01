import React, { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}  // Función vacía por ahora
});

// Componente AuthProvider
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Iniciar como false

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
