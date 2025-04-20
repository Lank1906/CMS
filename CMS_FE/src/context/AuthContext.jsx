import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role_id, setRoleId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
          setToken(storedToken);
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setRoleId(userData.role_id);
          setIsAuthenticated(true);
        } else {
          toast.info('No user data found, please log in.');
        }
      } catch {
        toast.error('Error checking auth status.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (userData, authToken) => {
    try {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      setRoleId(userData.role_id);
      setIsAuthenticated(true);
      toast.success(`Login successful! Welcome, ${userData.full_name || 'user'}!`);
    } catch {
      toast.error('Login failed!');
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setRoleId(null);
      setIsAuthenticated(false);
      toast.info('Logged out successfully.');
    } catch {
      toast.error('Logout failed!');
    }
  };

  const register = async () => {
    try {
      toast.success('Registration successful!');
      return { success: true };
    } catch {
      toast.error('Registration failed!');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        role_id,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
