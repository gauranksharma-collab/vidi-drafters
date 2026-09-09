import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vd_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/admin/me', { authToken: 'admin' })
      .then((res) => setAdmin(res.data.admin))
      .catch(() => localStorage.removeItem('vd_admin_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const res = await api.post('/admin/login', { username, password });
    localStorage.setItem('vd_admin_token', res.data.token);
    setAdmin(res.data.admin);
  }

  function logout() {
    localStorage.removeItem('vd_admin_token');
    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, setAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
