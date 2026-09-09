import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get('/admin/summary', { authToken: 'admin' }).then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Dashboard</h1>
      <div className="admin-cards">
        <div className="admin-card">
          <div className="num">{summary.newRegistrations}</div>
          <div className="label">New Registrations</div>
        </div>
        <div className="admin-card">
          <div className="num">{summary.totalRegistrations}</div>
          <div className="label">Total Registrations</div>
        </div>
        <div className="admin-card">
          <div className="num">{summary.newContacts}</div>
          <div className="label">New Contact Messages</div>
        </div>
        <div className="admin-card">
          <div className="num">{summary.totalContacts}</div>
          <div className="label">Total Contact Messages</div>
        </div>
      </div>
      <p style={{ color: '#666', fontSize: 14 }}>
        New leads submitted through the site's Registration and Contact Us forms land here. Historical customer/order
        data migrated from the legacy MySQL database is available under "Legacy Data".
      </p>
    </div>
  );
}
