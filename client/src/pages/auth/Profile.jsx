import { useState } from 'react';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', mobile: user?.mobile || '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.patch('/auth/me', form, { authToken: 'user' });
      setUser(res.data.user);
      setStatus({ state: 'success', message: 'Profile updated.' });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Update failed.' });
    }
  }

  if (!user) return null;

  return (
    <>
      <PageHero title="My Account" />
      <section className="p-t-100 p-b-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <p><strong>Email:</strong> {user.email}</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group m-b-15">
                  <label>Name</label>
                  <input type="text" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group m-b-15">
                  <label>Mobile</label>
                  <input type="text" className="form-control" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                </div>
                {status.message && (
                  <p className={status.state === 'error' ? 'text-danger' : 'text-success'}>{status.message}</p>
                )}
                <button className="btn btn-dark" type="submit" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
