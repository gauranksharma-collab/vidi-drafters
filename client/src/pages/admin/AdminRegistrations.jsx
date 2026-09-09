import LeadsTable from '../../components/admin/LeadsTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'email', label: 'Email' },
  { key: 'service', label: 'Service' },
  { key: 'createdAt', label: 'Received', render: (item) => new Date(item.createdAt).toLocaleString('en-IN') },
];

export default function AdminRegistrations() {
  return <LeadsTable endpoint="/admin/registrations" columns={columns} title="Registrations" />;
}
