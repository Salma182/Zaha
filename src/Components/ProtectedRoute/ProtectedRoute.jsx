import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../AuthContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, isLoading , isAuthenticated } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />; // Show a loading indicator while checking admin status
  }

  return isAdmin && isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
