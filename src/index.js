// index.js o el archivo donde configuras el enrutamiento
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import CompShowUsers from './users/showUsers';
import CrearPaciente from './components/Crear_paciente';
import Inicio from './components/inicio';
import InicioMedico from './components/inicio_medico';
import Tratamientos from './components/tratamientos';
import RegistroHistoria from './components/Registro_historia';
import CreateRols from './components/crearRoles/createRols';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/Reset';

// Define el router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/recuperar",
        element: <RequestPasswordReset />,
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />,
    },    
    {
        path: "/inicio",
        element: <ProtectedRoute requiredRole={["admin"]}><Inicio /></ProtectedRoute>,
    },
    {
        path: "/inicio_medico",
        element: <ProtectedRoute requiredRole={["admin", "medico"]}><InicioMedico /></ProtectedRoute>,
    },
    {
        path: "/registro_historia",
        element: <ProtectedRoute requiredRole={["medico", "admin"]}><RegistroHistoria /></ProtectedRoute>,
    },
    {
        path: "/tratamiento",
        element: <ProtectedRoute requiredRole={["enfermera", "admin", "medico"]}><Tratamientos /></ProtectedRoute>, // Ruta protegida para usuarios autenticados
    },
    {
        path: "/users",
        element: <ProtectedRoute requiredRole="no definido"><CompShowUsers /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/crear_paciente",
        element: <ProtectedRoute requiredRole={["tratante", "admin", "medico"]}><CrearPaciente /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/crear_rol",
        element: <ProtectedRoute requiredRole={["admin"]}><CreateRols /></ProtectedRoute>, // Solo accesible para admins
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
