// Mirrors the legacy site's nav structure (top.php) 1:1, with route paths
// derived from the original PHP filenames (underscores -> hyphens).
const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Incorporation',
    children: [
      { label: 'Proprietorships', path: '/in-pro' },
      { label: 'Limited Liability Partnership (LLP)', path: '/in-llp' },
      { label: 'One Person Company (OPC)', path: '/in-opc' },
      { label: 'Private Limited', path: '/in-pl' },
    ],
  },
  {
    label: 'IPR',
    children: [
      { label: 'Trademark', path: '/ipr-trad' },
      { label: 'Copyright', path: '/ipr-copy' },
      { label: 'Transparent', path: '/ipr-trans' },
      { label: 'Patent', path: '/ipr-pat' },
    ],
  },
  { label: 'Trademark', path: '/trad' },
  {
    label: 'GST',
    children: [
      { label: 'GST Registrations', path: '/gst-r' },
      { label: 'GST Filing', path: '/gst-f' },
    ],
  },
  {
    label: 'Registrations',
    children: [
      { label: 'Startup', path: '/re-startup' },
      { label: 'FSSAI', path: '/re-fssai' },
      { label: 'ISO', path: '/re-iso' },
      { label: 'UDYAM', path: '/re-udyam' },
      { label: 'MSME', path: '/re-msme' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Attestation', path: '/se-att' },
      { label: 'Apostille', path: '/se-apo' },
      { label: 'Online Affidavit', path: '/se-online' },
      { label: 'Name Change', path: '/se-nc' },
      { label: 'Language Translation', path: '/se-lt' },
      { label: 'Draft', path: '/draft' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
];

export default navigation;
