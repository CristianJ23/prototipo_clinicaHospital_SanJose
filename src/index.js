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
import Recuperar from './components/recuperar';
import InicioMedico from './components/inicio_medico';
import Tratamientos from './components/tratamientos';
import RegistroHistoria from './components/Registro_historia';

// Define el router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/recuperar",
        element: <Recuperar />,
    },
    {
        path: "/inicio",
        element: <ProtectedRoute requiredRole={"admin"}><Inicio /></ProtectedRoute>,
    },
    {
        path: "/inicio_medico",
        element: <ProtectedRoute requiredRole={"admin"}><InicioMedico /></ProtectedRoute>,
    },
    {
        path: "/registro_historia",
        element: <ProtectedRoute requiredRole={"medico"}><RegistroHistoria /></ProtectedRoute>,
    },
    {
        path: "/tratamiento",
        element: <ProtectedRoute requiredRole="enfermera"><Tratamientos /></ProtectedRoute>, // Ruta protegida para usuarios autenticados
    },
    {
        path: "/users",
        element: <ProtectedRoute requiredRole="no definido"><CompShowUsers /></ProtectedRoute>, // Solo accesible para admins
    },
    {
        path: "/crear_paciente",
        element: <ProtectedRoute requiredRole="tratante"><CrearPaciente /></ProtectedRoute>, // Solo accesible para admins
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
