import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import RequireAuth from '../../components/RequireAuth';
import api from '../../lib/api';

function DraftOrderDetailInner() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/draft/orders/${orderNumber}`, { authToken: 'user' })
      .then((res) => setOrder(res.data.order))
      .catch(() => setError('Order not found.'));
  }, [orderNumber]);

  if (error) {
    return <section id="about"><div className="container"><p className="text-danger">{error}</p></div></section>;
  }
  if (!order) {
    return <section id="about"><div className="container"><p>Loading...</p></div></section>;
  }

  return (
    <>
      <PageHero title={`Order ${order.orderNumber}`} />
      <section id="about">
        <div className="container">
          {order.paymentStatus === 'paid' && (
            <p className="text-success">✅ Payment received. Your document(s) are being prepared.</p>
          )}
          {order.paymentStatus === 'pending' && order.paymentProvider === 'manual' && (
            <p style={{ color: '#b8860b' }}>
              ⏳ Payment pending. Our team will contact you at {order.billingAddress.mobile} to complete payment
              (online payment isn't set up yet). Your order has been recorded as {order.orderNumber}.
            </p>
          )}
          {order.paymentStatus === 'failed' && <p className="text-danger">❌ Payment failed. Please contact support.</p>}

          <h4 className="m-t-20 m-b-15">Items</h4>
          <div className="admin-table-wrap" style={{ marginBottom: 20 }}>
            <table className="admin-table" style={{ width: '100%' }}>
              <thead>
                <tr><th>Document</th><th>Stamp</th><th>Add-ons</th><th>Price</th></tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.documentName}</td>
                    <td>{item.stampState} / ₹{item.stampAmount}</td>
                    <td>{item.addOns.map((a) => a.label).join(', ') || '-'}</td>
                    <td>₹{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <h4>Billing Address</h4>
              <p>
                {order.billingAddress.firstName} {order.billingAddress.lastName}<br />
                {order.billingAddress.address} {order.billingAddress.suite}<br />
                {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}<br />
                {order.billingAddress.email} / {order.billingAddress.mobile}
              </p>
            </div>
            <div className="col-lg-6 text-right">
              <p>Items Total: ₹{order.itemsTotal}</p>
              <p>Shipping: ₹{order.shippingFee}</p>
              <h4>Total: ₹{order.amount}</h4>
              <p>Order Status: <strong>{order.orderStatus}</strong></p>
              {order.trackingNumber && <p>Tracking: {order.trackingCourier} - {order.trackingNumber}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function DraftOrderDetail() {
  return (
    <RequireAuth>
      <DraftOrderDetailInner />
    </RequireAuth>
  );
}
