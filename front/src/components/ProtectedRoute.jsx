import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  
  if (!authUser) {
    return <Navigate to="/signup" replace />;
  }  

  return children;
};

export default ProtectedRoute;