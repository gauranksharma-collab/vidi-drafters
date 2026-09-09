import { useState } from 'react';
import PageHero from '../../components/PageHero';
import api from '../../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setStatus({ state: 'success', message: res.data.message });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Something went wrong.' });
    }
  }

  return (
    <>
      <PageHero title="Forgot Password" />
      <section className="p-t-100 p-b-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <p>Enter the email you registered with and we'll send you a link to reset your password.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group m-b-15">
                  <label>Email</label>
                  <input type="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="btn btn-dark btn-block" type="submit" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>
                {status.message && (
                  <p className={status.state === 'error' ? 'text-danger m-t-15' : 'text-success m-t-15'}>{status.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
