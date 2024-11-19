import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext({
    isAuthenticated: false,
});

// Componente AuthProvider
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <AuthContext.Provider value={{ isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
