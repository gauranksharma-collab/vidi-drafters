import LeadsTable from '../../components/admin/LeadsTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'email', label: 'Email' },
  { key: 'subject', label: 'Subject' },
  { key: 'message', label: 'Message', render: (item) => (item.message.length > 60 ? item.message.slice(0, 60) + '…' : item.message) },
  { key: 'createdAt', label: 'Received', render: (item) => new Date(item.createdAt).toLocaleString('en-IN') },
];

export default function AdminContactMessages() {
  return <LeadsTable endpoint="/admin/contact-messages" columns={columns} title="Contact Messages" />;
}
