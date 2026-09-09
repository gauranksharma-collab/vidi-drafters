import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import RequireAuth from '../../components/RequireAuth';
import api from '../../lib/api';

function DraftOrdersInner() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get('/draft/orders', { authToken: 'user' }).then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <>
      <PageHero title="My Orders" />
      <section id="about">
        <div className="container">
          {!orders && <p>Loading...</p>}
          {orders && orders.length === 0 && (
            <div className="text-center">
              <p>You haven't placed any orders yet.</p>
              <Link to="/draft" className="btn btn-dark">Browse Documents</Link>
            </div>
          )}
          {orders && orders.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.orderNumber}>
                      <td>{o.orderNumber}</td>
                      <td>{o.items.length}</td>
                      <td>₹{o.amount}</td>
                      <td>{o.paymentStatus}</td>
                      <td>{o.orderStatus}</td>
                      <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td><Link to={`/draft/orders/${o.orderNumber}`}>View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function DraftOrders() {
  return (
    <RequireAuth>
      <DraftOrdersInner />
    </RequireAuth>
  );
}
