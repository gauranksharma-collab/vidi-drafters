import { useState } from 'react';
import PageHero from '../components/PageHero';
import api from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.message) {
      setStatus({ state: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    setStatus({ state: 'loading', message: '' });
    try {
      await api.post('/contact', form);
      setStatus({ state: 'success', message: 'Thank you! Your message has been sent.' });
      setForm({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Something went wrong. Please try again.' });
    }
  }

  return (
    <>
      <PageHero title="Contact Us" />

      <section className="p-t-150 p-b-200" style={{ backgroundImage: "url(/img/ccp.png)", backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="heading-text heading-section">
                    <h2>Get in Touch with Us</h2>
                    <p className="lead">Contact to Vidhik Drafters, Update and Support</p>
                  </div>
                </div>
                <div className="col-lg-12 m-b-30">
                  <div className="row">
                    <div className="col-lg-6">
                      <address>
                        <strong>Office:</strong>
                        <br /><br /> 45/1109 DDA Flats
                        <br /> Kalkaji - 110019
                        <br />
                      </address>
                    </div>
                    <div className="col-lg-6">
                      <strong>Phone:</strong> <a href="tel://+918979002000">+91 89790 02000</a> ,&nbsp;&nbsp;
                      <br /><br />
                      <strong>Email:</strong><a href="mailto:care@vidhikdrafters.com"> care@vidhikdrafters.com </a><br />
                      <a href="mailto:vidhikdrafters@gmail.com">vidhikdrafters@gmail.com </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 m-b-30">
                  <h4>We are social</h4>
                  <div className="social-icons social-icons-light social-icons-colored-hover">
                    <ul>
                      <li className="social-facebook"><a href="#"><i className="fab fa-facebook-f" /></a></li>
                      <li className="social-twitter"><a href="#"><i className="fab fa-twitter" /></a></li>
                      <li className="social-youtube"><a href="#"><i className="fab fa-youtube" /></a></li>
                      <li className="social-instagram"><a href="#"><i className="fab fa-instagram" /></a></li>
                      <li className="social-gplus"><a href="#"><i className="fab fa-google-plus-g" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-1">
              <form role="form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name1">Name</label>
                    <input type="text" required id="name1" className="form-control required name" placeholder="Enter your Name" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email1">Email</label>
                    <input type="email" required id="email1" className="form-control required email" placeholder="Enter your Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="mobile1">Mobile</label>
                    <input type="text" required id="mobile1" className="form-control required name" placeholder="Enter your Mobile No." value={form.mobile} onChange={(e) => update('mobile', e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" required id="subject" className="form-control required subject" placeholder="Enter Subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="msg">Message</label>
                  <textarea required id="msg" rows={8} className="form-control required" placeholder="Enter your Message" value={form.message} onChange={(e) => update('message', e.target.value)} />
                </div>
                <div className="form-group">
                  <button className="btn btn-light" type="submit" disabled={status.state === 'loading'}>
                    <i className="fa fa-paper-plane" />&nbsp;{status.state === 'loading' ? 'Sending...' : 'Send message'}
                  </button>
                </div>
                {status.message && (
                  <p className={status.state === 'success' ? 'text-success' : 'text-danger'}>{status.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
