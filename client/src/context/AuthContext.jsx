import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (payload) => {
    localStorage.setItem('token', payload.token);
    setUser(payload.user);
  };

  const clearSession = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData);
    saveSession(data);
  };

  const login = async (formData) => {
    const { data } = await api.post('/auth/login', formData);
    saveSession(data);
  };

  const logout = () => {
    clearSession();
  };

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (error) {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
