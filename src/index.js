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
import Recuperar from './components/recuperar'


// Define el router
const router = createBrowserRouter([
    {
        path: "/",
        // element: <CompShowUsers />,
        element: <Login />
    },
                {
                path: "/users",  // Ruta para ver los usuarios
                element: <CompShowUsers />,
            },
            {
                path: "/recuperar",  // Ruta para ver los usuarios
                element: <Recuperar />,
            },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/users",  // Ruta para ver los usuarios
                element: <CompShowUsers />,
            },
            {
                path: "/inicio",  // Ruta para ver los usuarios
                element: <Inicio />,
            },
            {
                path: "/pacientes",  // Ruta para ver los usuarios
                element: <CrearPaciente />,
            },
        ]
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
