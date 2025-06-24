import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }  

  return children;
};

export default ProtectedRoute;