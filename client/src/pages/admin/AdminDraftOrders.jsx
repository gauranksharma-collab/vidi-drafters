import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

const ORDER_STATUSES = ['placed', 'processing', 'ready', 'dispatched', 'completed', 'cancelled'];

export default function AdminDraftOrders() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [q, setQ] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get('/admin/draft/orders', { authToken: 'admin', params: { page, q: q || undefined, orderStatus: orderStatus || undefined } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(load, [page, q, orderStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(orderNumber, status) {
    await api.patch(`/admin/draft/orders/${orderNumber}`, { orderStatus: status }, { authToken: 'admin' });
    load();
  }

  async function markPaid(orderNumber) {
    await api.patch(`/admin/draft/orders/${orderNumber}`, { paymentStatus: 'paid' }, { authToken: 'admin' });
    load();
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Draft Orders</h1>
      <div className="admin-toolbar">
        <input placeholder="Search order #, email, mobile..." value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} />
        <select value={orderStatus} onChange={(e) => { setPage(1); setOrderStatus(e.target.value); }}>
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 13, color: '#777' }}>{data.total} total</span>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order #</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.items.map((o) => (
              <tr key={o.orderNumber}>
                <td>{o.orderNumber}</td>
                <td>{o.billingAddress?.firstName} {o.billingAddress?.lastName}<br /><small>{o.billingAddress?.email}</small></td>
                <td>{o.items.length}</td>
                <td>₹{o.amount}</td>
                <td>
                  {o.paymentStatus}
                  {o.paymentStatus !== 'paid' && (
                    <button onClick={() => markPaid(o.orderNumber)} style={{ marginLeft: 8, fontSize: 11, padding: '2px 8px' }}>Mark Paid</button>
                  )}
                </td>
                <td>
                  <select value={o.orderStatus} onChange={(e) => updateStatus(o.orderNumber, e.target.value)}>
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                <td><Link to={`/admin/draft-orders/${o.orderNumber}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{ padding: 14 }}>Loading...</p>}
        {!loading && data.items.length === 0 && <p style={{ padding: 14 }}>No orders.</p>}
      </div>
      <div className="admin-pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {data.page} of {data.pages || 1}</span>
        <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
