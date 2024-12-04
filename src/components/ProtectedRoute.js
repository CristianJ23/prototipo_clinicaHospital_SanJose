import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth(); // Asegúrate de que `useAuth` provea estos valores

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir a la página de login
    return <Navigate to="/" />;
  }

  // if (requiredRole && userRole !== requiredRole) {
  //   // Si el usuario no tiene el rol necesario, redirigir a una página de acceso denegado o inicio
  //   return <Navigate to="/" />;
  // }

  if (requiredRole !== userRole) {
    // Si el usuario no tiene el rol necesario, redirigir a una página de acceso denegado o inicio
    return <Navigate to="/" />;
  }

  // Si pasa ambas verificaciones, renderiza los componentes hijos
  return children;
};

export default ProtectedRoute;
