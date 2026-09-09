import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import api from '../../lib/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.post('/auth/reset-password', { email, token, password });
      setStatus({ state: 'success', message: res.data.message });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Something went wrong.' });
    }
  }

  if (!token || !email) {
    return (
      <>
        <PageHero title="Reset Password" />
        <section className="p-t-100 p-b-100">
          <div className="container text-center">
            <p>This reset link is invalid. Please request a new one from the <Link to="/forgot-password">forgot password</Link> page.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="Reset Password" />
      <section className="p-t-100 p-b-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              {status.state === 'success' ? (
                <p className="text-success">
                  {status.message} <Link to="/login">Go to login</Link>
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group m-b-15">
                    <label>New Password</label>
                    <input type="password" required minLength={6} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {status.message && <p className="text-danger">{status.message}</p>}
                  <button className="btn btn-dark btn-block" type="submit" disabled={status.state === 'loading'}>
                    {status.state === 'loading' ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
