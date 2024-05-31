// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const ProtectedRoute = ({ element: Component, adminOnly = false, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};


export default ProtectedRoute;


