import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.mobile, form.password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero title="Create Account" />
      <section className="p-t-100 p-b-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <form onSubmit={handleSubmit}>
                <div className="form-group m-b-15">
                  <label>Name</label>
                  <input type="text" required className="form-control" value={form.name} onChange={(e) => update('name', e.target.value)} />
                </div>
                <div className="form-group m-b-15">
                  <label>Email</label>
                  <input type="email" required className="form-control" value={form.email} onChange={(e) => update('email', e.target.value)} />
                </div>
                <div className="form-group m-b-15">
                  <label>Mobile</label>
                  <input type="text" required className="form-control" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} />
                </div>
                <div className="form-group m-b-15">
                  <label>Password</label>
                  <input type="password" required minLength={6} className="form-control" value={form.password} onChange={(e) => update('password', e.target.value)} />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-dark btn-block" type="submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
                <p className="m-t-15">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
