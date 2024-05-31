// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const ProtectedRoute = ({ element: Component, adminOnly = false, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth(); // Assuming useAuth provides isAdmin

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && (!adminOnly || (adminOnly && isAdmin)) ? (
          Component
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;


