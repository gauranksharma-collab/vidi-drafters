import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function LeadsTable({ endpoint, columns, title }) {
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .get(endpoint, { authToken: 'admin', params: { page, status: statusFilter || undefined } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(load, [page, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id, status) {
    await api.patch(`${endpoint}/${id}/status`, { status }, { authToken: 'admin' });
    load();
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>{title}</h1>
      <div className="admin-toolbar">
        <select value={statusFilter} onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}>
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <span style={{ fontSize: 13, color: '#777' }}>{data.total} total</span>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.items.map((item) => (
              <tr key={item._id}>
                {columns.map((c) => <td key={c.key}>{c.render ? c.render(item) : item[c.key]}</td>)}
                <td>
                  <select
                    className={`admin-status ${item.status}`}
                    style={{ border: 'none' }}
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
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
