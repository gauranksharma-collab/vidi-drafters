import { useEffect, useState } from 'react';
import api from '../../lib/api';

const TABS = [
  {
    key: 'users',
    label: 'Users (110)',
    endpoint: '/admin/legacy/users',
    columns: [
      { key: 'legacyId', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'mobile', label: 'Mobile' },
      { key: 'added_on', label: 'Registered' },
    ],
  },
  {
    key: 'orders',
    label: 'Orders',
    endpoint: '/admin/legacy/orders',
    columns: [
      { key: 'legacyId', label: 'ID' },
      { key: 'order_id', label: 'Order ID' },
      { key: 'name', label: 'Name' },
      { key: 'email1', label: 'Email' },
      { key: 'mobile1', label: 'Mobile' },
      { key: 'amt', label: 'Amount' },
      { key: 'payment_status', label: 'Payment' },
      { key: 'added_on', label: 'Date' },
    ],
  },
  {
    key: 'orders-done',
    label: 'Completed Orders',
    endpoint: '/admin/legacy/orders-done',
    columns: [
      { key: 'legacyId', label: 'ID' },
      { key: 'order_id', label: 'Order ID' },
      { key: 'name', label: 'Name' },
      { key: 'state', label: 'State' },
      { key: 'making', label: 'Document Type' },
      { key: 'added_on', label: 'Date' },
    ],
  },
  {
    key: 'contact-us',
    label: 'Old Contact Us Submissions',
    endpoint: '/admin/legacy/contact-us',
    columns: [
      { key: 'legacyId', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'mobile', label: 'Mobile' },
      { key: 'comment', label: 'Comment' },
      { key: 'added_on', label: 'Date' },
    ],
  },
];

export default function AdminLegacyData() {
  const [activeTab, setActiveTab] = useState('users');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const tab = TABS.find((t) => t.key === activeTab);

  useEffect(() => {
    setLoading(true);
    api
      .get(tab.endpoint, { authToken: 'admin', params: { page, q: q || undefined } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [tab.endpoint, page, q]);

  function switchTab(key) {
    setActiveTab(key);
    setPage(1);
    setQ('');
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 6 }}>Legacy Data</h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>
        Read-only historical data migrated from the legacy MySQL database (vidhik_vd) used by the old /draft application.
      </p>
      <div className="admin-toolbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => switchTab(t.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 4,
              border: '1px solid #ccc',
              background: activeTab === t.key ? '#181c24' : '#fff',
              color: activeTab === t.key ? '#fff' : '#333',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="admin-toolbar">
        <input placeholder="Search name / email..." value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} />
        <span style={{ fontSize: 13, color: '#777' }}>{data.total} total</span>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>{tab.columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {!loading && data.items.map((item) => (
              <tr key={item._id}>
                {tab.columns.map((c) => (
                  <td key={c.key} style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {String(item[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{ padding: 14 }}>Loading...</p>}
        {!loading && data.items.length === 0 && <p style={{ padding: 14 }}>No records.</p>}
      </div>
      <div className="admin-pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {data.page} of {data.pages || 1}</span>
        <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
