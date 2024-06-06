import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    }
    setIsLoading(false);
  }, []);

  const login = async (values, setError) => {
    try {
      const { data } = await axios.post('https://zahaback.com/api/login', values, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      const adminStatus = data.user.isadmin === 'admin';
      setIsAdmin(adminStatus);
      localStorage.setItem('isAdmin', adminStatus.toString());
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setError(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error in request setup:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  //   setIsAdmin(false);
  // };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
