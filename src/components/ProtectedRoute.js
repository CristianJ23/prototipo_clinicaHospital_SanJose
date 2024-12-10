import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth(); // Asegúrate de que `useAuth` provea estos valores
  const location = useLocation(); // Obtiene la ruta actual


  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir a la página de login
    // return <Navigate to="/" />;
      return <Navigate to="/" />;
  }


  if (requiredRole && !requiredRole.includes(userRole)) {
    // Si el usuario no tiene el rol necesario, redirigir a una página de acceso denegado o inicio
    return <Navigate to="/"  />;
  }

  // Si pasa ambas verificaciones, renderiza los componentes hijos
  return children;
};

export default ProtectedRoute;
