import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import { AuthProvider } from './auth/AuthProvider';
import { Home } from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';


// Define el router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <Home/>
            }
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
