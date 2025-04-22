import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('cms_token');
      const userData = localStorage.getItem('cms_user');

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);
  const login = (userData, token) => {
    localStorage.setItem('cms_token', token);
    localStorage.setItem('cms_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async () => {
    return { success: true };
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
