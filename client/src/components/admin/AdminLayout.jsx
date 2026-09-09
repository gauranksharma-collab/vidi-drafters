import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/registrations', label: 'Registrations' },
  { to: '/admin/contact-messages', label: 'Contact Messages' },
  { to: '/admin/draft-orders', label: 'Draft Orders' },
  { to: '/admin/legacy-data', label: 'Legacy Data (MySQL import)' },
  { to: '/admin/admins', label: 'Admin Users' },
  { to: '/admin/change-password', label: 'Change Password' },
];

export default function AdminLayout() {
  const { admin, loading, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Vidhik Drafters</h2>
        <nav>
          {NAV_ITEMS.filter((item) => item.to !== '/admin/admins' || admin.role === 'superadmin').map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <div className="who">
            Logged in as <strong>{admin.username}</strong>
            <span className="admin-badge">{admin.role}</span>
          </div>
          <button onClick={() => { logout(); navigate('/admin/login'); }}>Logout</button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
