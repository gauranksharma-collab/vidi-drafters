import { useState } from 'react';
import api from '../lib/api';

const SERVICE_OPTIONS = [
  'Proprietorships',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Private Limited',
  'Trademark',
  'Copyright',
  'Patent',
  'GST Registrations',
  'GST Filing',
  'Startup',
  'FSSAI',
  'ISO',
  'UDYAM',
  'MSME',
  'Attestation',
  'Apostille',
  'Online Affidavit',
  'Name Change',
  'Language Translation',
  'Online Draft',
];

// Shared "REGISTER NOW" lead-capture widget used on the homepage sidebar and
// every inner service page. `fixedService`, when passed, hides the dropdown
// and always submits that one service (matches the legacy per-page forms).
export default function RegistrationForm({ fixedService }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', service: fixedService || '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setStatus({ state: 'error', message: 'Please enter your name.' });
    if (!form.mobile.trim()) return setStatus({ state: 'error', message: 'Please enter your mobile number.' });
    if (!fixedService && !form.service) {
      return setStatus({ state: 'error', message: 'Please select a service.' });
    }

    setStatus({ state: 'loading', message: '' });
    try {
      await api.post('/registration', { ...form, service: fixedService || form.service });
      setStatus({ state: 'success', message: 'Thank you! We have received your details and will contact you shortly.' });
      setForm({ name: '', mobile: '', email: '', service: fixedService || '' });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Something went wrong. Please try again.' });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group m-b-5">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Your Name*"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />
      </div>
      <div className="form-group m-b-5">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Your Phone Number*"
          required
          value={form.mobile}
          onChange={(e) => update('mobile', e.target.value)}
        />
      </div>
      <div className="form-group m-b-5">
        <input
          type="email"
          className="form-control form-control-sm"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>
      {!fixedService && (
        <div className="form-group m-b-5">
          <select
            className="form-control form-control-sm"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
          >
            <option value="">-- Select Service --</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
      <button className="btn btn-block text-white" type="submit" style={{ backgroundColor: '#f84b46' }} disabled={status.state === 'loading'}>
        <i className="fa fa-paper-plane" />
        &nbsp;{status.state === 'loading' ? 'Sending...' : 'REGISTER NOW'}
      </button>
      {status.message && (
        <p className={status.state === 'success' ? 'text-success mt-2 mb-0' : 'text-danger mt-2 mb-0'}>
          {status.message}
        </p>
      )}
    </form>
  );
}
