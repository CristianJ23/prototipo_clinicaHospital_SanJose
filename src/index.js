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
import Gestion from './components/Gestión'; 
import Mostrar from './components/Mostrar'; 
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/Reset';
import Personal from './components/Personal';
import Exportacion from './components/Exportacion';

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
        path: "/vista-medico", // Ruta para la vista del médico
        element: <InicioMedico />, // Asegúrate de que este componente exista
    },
    {
        path: "/tratamientos", // Ruta para gestionar tratamientos
        element: <Tratamientos />,
    },
    {
        path: "/gestion-historias", // Ruta para gestionar tratamientos
        element: <RegistroHistoria />,
    },
    {
        path: "/users",
        element: <ProtectedRoute requiredRole="no definido"><CompShowUsers /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/mostrar/:id", // Ruta dinámica para Mostrar
        element: <Mostrar />,
    },
    {
        path: "/crear-paciente", // Ruta para gestionar pacientes
        element: <CrearPaciente />,
    },
    {
        path: "/crear_rol",
        element: <ProtectedRoute requiredRole={["admin"]}><CreateRols /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/gestion", // Ruta para gestionar tratamientos
        element: <ProtectedRoute requiredRole={["admin"]}><Gestion /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/personal", // Ruta para gestionar personal
        element: <ProtectedRoute requiredRole={["admin"]}><Personal /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/exportacion", // Ruta para gestionar personal
        element: <ProtectedRoute requiredRole={["admin"]}><Exportacion /></ProtectedRoute>, // Solo accesible para admins
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