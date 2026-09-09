import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import RequireAuth from '../../components/RequireAuth';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function DraftCheckoutInner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    suite: '',
    city: '',
    state: '',
    pincode: '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    api.get('/draft/cart', { authToken: 'user' }).then((res) => {
      if (res.data.items.length === 0) navigate('/draft/cart');
      setCart(res.data);
    });
  }, [navigate]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.post('/draft/checkout', { billingAddress: form }, { authToken: 'user' });
      const { order, razorpay } = res.data;

      if (razorpay) {
        await loadRazorpayScript();
        const rzp = new window.Razorpay({
          key: razorpay.keyId,
          amount: razorpay.amount,
          currency: 'INR',
          name: 'Vidhik Drafters',
          description: `Order ${order.orderNumber}`,
          order_id: razorpay.orderId,
          prefill: { name: form.firstName, email: form.email, contact: form.mobile },
          handler: async (response) => {
            await api.post(
              '/draft/checkout/verify-payment',
              { orderNumber: order.orderNumber, ...response },
              { authToken: 'user' }
            );
            navigate(`/draft/orders/${order.orderNumber}`);
          },
          modal: {
            ondismiss: () => setStatus({ state: 'error', message: 'Payment was not completed. Your order is saved as pending - you can retry from your order history.' }),
          },
          theme: { color: '#f84b46' },
        });
        rzp.open();
        setStatus({ state: 'idle', message: '' });
      } else {
        navigate(`/draft/orders/${order.orderNumber}`);
      }
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Checkout failed. Please try again.' });
    }
  }

  if (!cart) {
    return (
      <section id="about">
        <div className="container"><p>Loading...</p></div>
      </section>
    );
  }

  return (
    <>
      <PageHero title="Checkout" />
      <section id="about">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <h4 className="m-b-15">Billing Details</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group m-b-15">
                      <label>First Name*</label>
                      <input className="form-control" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group m-b-15">
                      <label>Last Name</label>
                      <input className="form-control" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="form-group m-b-15">
                  <label>Address*</label>
                  <input className="form-control" required value={form.address} onChange={(e) => update('address', e.target.value)} />
                </div>
                <div className="form-group m-b-15">
                  <label>Apartment/Suite</label>
                  <input className="form-control" value={form.suite} onChange={(e) => update('suite', e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group m-b-15">
                      <label>City*</label>
                      <input className="form-control" required value={form.city} onChange={(e) => update('city', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group m-b-15">
                      <label>State*</label>
                      <input className="form-control" required value={form.state} onChange={(e) => update('state', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group m-b-15">
                      <label>Pincode*</label>
                      <input className="form-control" required value={form.pincode} onChange={(e) => update('pincode', e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group m-b-15">
                      <label>Email*</label>
                      <input type="email" className="form-control" required value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group m-b-15">
                      <label>Mobile*</label>
                      <input className="form-control" required value={form.mobile} onChange={(e) => update('mobile', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="text-light p-4 rounded shadow" style={{ backgroundColor: '#2C2D2D' }}>
                  <h4 className="text-colored">Order Summary</h4>
                  {cart.items.map((item) => (
                    <p key={item._id}>{item.documentName}: ₹{item.totalPrice}</p>
                  ))}
                  <p>Shipping: ₹40</p>
                  <hr />
                  <h3>Total: ₹{cart.total + 40}</h3>
                  {status.message && <p className="text-danger">{status.message}</p>}
                  <button className="btn btn-block text-white mt-3" type="submit" style={{ backgroundColor: '#f84b46' }} disabled={status.state === 'loading'}>
                    {status.state === 'loading' ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default function DraftCheckout() {
  return (
    <RequireAuth>
      <DraftCheckoutInner />
    </RequireAuth>
  );
}
