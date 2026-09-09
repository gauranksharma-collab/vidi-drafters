import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';

export default function AdminDraftOrderDetail() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState({ trackingCourier: '', trackingNumber: '' });

  function load() {
    api.get(`/admin/draft/orders/${orderNumber}`, { authToken: 'admin' }).then((res) => {
      setOrder(res.data.order);
      setTracking({ trackingCourier: res.data.order.trackingCourier, trackingNumber: res.data.order.trackingNumber });
    });
  }

  useEffect(load, [orderNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  async function saveTracking() {
    await api.patch(`/admin/draft/orders/${orderNumber}`, tracking, { authToken: 'admin' });
    load();
  }

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Order {order.orderNumber}</h1>
      <p style={{ color: '#666', marginBottom: 20 }}>
        Customer: {order.user?.name} ({order.user?.email}) — Payment: {order.paymentStatus} via {order.paymentProvider} — Status: {order.orderStatus}
      </p>

      <div className="admin-table-wrap" style={{ marginBottom: 24 }}>
        <table className="admin-table">
          <thead><tr><th>Document</th><th>Stamp</th><th>Add-ons</th><th>Price</th><th>Details</th></tr></thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>{item.documentName}</td>
                <td>{item.stampState} / ₹{item.stampAmount}</td>
                <td>{item.addOns.map((a) => a.label).join(', ') || '-'}</td>
                <td>₹{item.totalPrice}</td>
                <td>
                  <details>
                    <summary style={{ cursor: 'pointer' }}>View form data</summary>
                    <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', maxWidth: 400 }}>{JSON.stringify(item.formData, null, 2)}</pre>
                    {item.otherInfo && <p><strong>Other info:</strong> {item.otherInfo}</p>}
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ display: 'flex', gap: 40 }}>
        <div>
          <h4>Billing Address</h4>
          <p>
            {order.billingAddress.firstName} {order.billingAddress.lastName}<br />
            {order.billingAddress.address} {order.billingAddress.suite}<br />
            {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}<br />
            {order.billingAddress.email} / {order.billingAddress.mobile}
          </p>
        </div>
        <div>
          <h4>Shipping / Tracking</h4>
          <div className="form-group m-b-10">
            <input className="form-control" placeholder="Courier name" value={tracking.trackingCourier} onChange={(e) => setTracking({ ...tracking, trackingCourier: e.target.value })} />
          </div>
          <div className="form-group m-b-10">
            <input className="form-control" placeholder="Tracking number" value={tracking.trackingNumber} onChange={(e) => setTracking({ ...tracking, trackingNumber: e.target.value })} />
          </div>
          <button className="btn btn-dark" onClick={saveTracking}>Save</button>
        </div>
      </div>
    </div>
  );
}
