import { useState } from 'react';
import api from '../../lib/api';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminChangePassword() {
  const { admin, setAdmin } = useAdminAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      await api.post('/admin/change-password', form, { authToken: 'admin' });
      setStatus({ state: 'success', message: 'Password updated.' });
      setForm({ currentPassword: '', newPassword: '' });
      setAdmin({ ...admin, mustResetPassword: false });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Failed to update password.' });
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Change Password</h1>
      {admin.mustResetPassword && (
        <p style={{ color: '#b8860b', marginBottom: 16 }}>
          Your account is using a temporary password. Please set a new one now.
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
        <div className="form-group m-b-10">
          <input className="form-control" type="password" placeholder="Current password" required value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
        </div>
        <div className="form-group m-b-10">
          <input className="form-control" type="password" placeholder="New password (min 8 chars)" required minLength={8} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
        </div>
        {status.message && <p className={status.state === 'error' ? 'text-danger' : 'text-success'}>{status.message}</p>}
        <button className="btn btn-dark" type="submit" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
