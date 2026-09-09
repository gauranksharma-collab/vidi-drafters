import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [otpStep, setOtpStep] = useState('idle'); // idle | sent | verified
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === 'mobile' && otpStep !== 'idle') {
      setOtpStep('idle');
      setOtp('');
      setOtpError('');
    }
  }

  async function sendOtp() {
    setOtpError('');
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setOtpError('Enter a valid 10-digit mobile number.');
      return;
    }
    setOtpLoading(true);
    try {
      await api.post('/auth/send-otp', { mobile: form.mobile });
      setOtpStep('sent');
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Could not send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  }

  async function verifyOtp() {
    setOtpError('');
    setOtpLoading(true);
    try {
      await api.post('/auth/verify-otp', { mobile: form.mobile, otp });
      setOtpStep('verified');
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Could not verify OTP.');
    } finally {
      setOtpLoading(false);
    }
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
                  <div className="d-flex" style={{ gap: '8px' }}>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={form.mobile}
                      disabled={otpStep === 'verified'}
                      onChange={(e) => update('mobile', e.target.value)}
                    />
                    {otpStep !== 'verified' && (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        style={{ whiteSpace: 'nowrap' }}
                        disabled={otpLoading || !form.mobile}
                        onClick={sendOtp}
                      >
                        {otpLoading && otpStep !== 'sent' ? 'Sending...' : otpStep === 'sent' ? 'Resend OTP' : 'Send OTP'}
                      </button>
                    )}
                  </div>
                  {otpStep === 'verified' && <p className="text-success m-t-5 m-b-0">Mobile number verified.</p>}
                </div>

                {otpStep === 'sent' && (
                  <div className="form-group m-b-15">
                    <label>Enter OTP</label>
                    <div className="d-flex" style={{ gap: '8px' }}>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        className="form-control"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        style={{ whiteSpace: 'nowrap' }}
                        disabled={otpLoading || otp.length !== 4}
                        onClick={verifyOtp}
                      >
                        {otpLoading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </div>
                  </div>
                )}
                {otpError && <p className="text-danger">{otpError}</p>}

                <div className="form-group m-b-15">
                  <label>Password</label>
                  <input type="password" required minLength={6} className="form-control" value={form.password} onChange={(e) => update('password', e.target.value)} />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-dark btn-block" type="submit" disabled={loading || otpStep !== 'verified'}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
                {otpStep !== 'verified' && (
                  <p className="text-muted m-t-10" style={{ fontSize: '0.9em' }}>
                    Verify your mobile number to enable this button.
                  </p>
                )}
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
