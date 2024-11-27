import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import { AuthProvider } from './auth/AuthProvider';
import { Home } from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import CompShowUsers from './users/showUsers';


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
        path: "/",
        element: <ProtectedRoute />,
        children: [
            // {
            //     path: "/recuperar",
            //     element: <Home />
            // },
            // {
            //     path: "/users",  // Ruta para ver los usuarios
            //     element: <CompShowUsers />,
            // },
            // {
            //     path: "/inicio",  // Ruta para ver los usuarios
            //     element: <Home />,
            // },
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
