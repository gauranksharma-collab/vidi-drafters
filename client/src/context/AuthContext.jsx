import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vd_user_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me', { authToken: 'user' })
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('vd_user_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('vd_user_token', res.data.token);
    setUser(res.data.user);
  }

  async function register(name, email, mobile, password) {
    const res = await api.post('/auth/register', { name, email, mobile, password });
    localStorage.setItem('vd_user_token', res.data.token);
    setUser(res.data.user);
  }

  function logout() {
    localStorage.removeItem('vd_user_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
