import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data } = await axios.get('https://zahaback.com/api/allusers', {
          headers: {
            Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
          },
        });
        const currentUser = data.allusers.find(user => user.isadmin === 'admin');
        setIsAdmin(Boolean(currentUser));
        console.log(currentUser)
      } catch (error) {
        console.error('Failed to check admin status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider