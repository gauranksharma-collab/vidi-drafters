import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function AdminAdmins() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', mobile: '', role: 'admin' });
  const [createdInfo, setCreatedInfo] = useState(null);
  const [error, setError] = useState('');

  function load() {
    api.get('/admin/admins', { authToken: 'admin' }).then((res) => setAdmins(res.data.admins));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    setCreatedInfo(null);
    try {
      const res = await api.post('/admin/admins', form, { authToken: 'admin' });
      setCreatedInfo(res.data);
      setForm({ username: '', email: '', mobile: '', role: 'admin' });
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create admin.');
    }
  }

  async function toggleStatus(id, status) {
    await api.patch(`/admin/admins/${id}/status`, { status }, { authToken: 'admin' });
    load();
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin Users</h1>

      <div className="admin-table-wrap" style={{ marginBottom: 28 }}>
        <table className="admin-table">
          <thead>
            <tr><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Must Reset PW</th><th></th></tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a._id}>
                <td>{a.username}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>{a.status ? 'Active' : 'Disabled'}</td>
                <td>{a.mustResetPassword ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => toggleStatus(a._id, !a.status)} style={{ padding: '4px 10px', fontSize: 12 }}>
                    {a.status ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 17, marginBottom: 12 }}>Create Admin</h2>
      <form onSubmit={handleCreate} style={{ maxWidth: 360 }}>
        <div className="form-group m-b-10">
          <input className="form-control" placeholder="Username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        <div className="form-group m-b-10">
          <input className="form-control" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group m-b-10">
          <input className="form-control" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        </div>
        <div className="form-group m-b-10">
          <select className="form-control" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        {error && <p style={{ color: '#c0392b' }}>{error}</p>}
        <button className="btn btn-dark" type="submit">Create</button>
      </form>

      {createdInfo && (
        <div style={{ marginTop: 16, padding: 14, background: '#fff8e1', borderRadius: 6, fontSize: 13 }}>
          Admin <strong>{createdInfo.admin.username}</strong> created. Temporary password (shown once):{' '}
          <code>{createdInfo.tempPassword}</code> — they must change it on first login.
        </div>
      )}
    </div>
  );
}
