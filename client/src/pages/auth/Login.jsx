import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || '/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero title="Login" />
      <section className="p-t-100 p-b-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <form onSubmit={handleSubmit}>
                <div className="form-group m-b-15">
                  <label>Email</label>
                  <input type="email" required className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group m-b-15">
                  <label>Password</label>
                  <input type="password" required className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-dark btn-block" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="m-t-15">
                  <Link to="/forgot-password">Forgot password?</Link>
                </p>
                <p>
                  New here? <Link to="/register">Create an account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
