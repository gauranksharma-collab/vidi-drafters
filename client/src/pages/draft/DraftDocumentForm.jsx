import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import RequireAuth from '../../components/RequireAuth';
import api from '../../lib/api';

const STAMP_STATES = ['Delhi/NCR', 'Delhi', 'Uttar Pradesh', 'Haryana'];
const STAMP_AMOUNTS = [10, 50, 101];

function Field({ field, value, onChange }) {
  const common = {
    id: field.name,
    required: !!field.required,
    className: 'form-control',
    value: value ?? '',
    onChange: (e) => onChange(field.name, e.target.value),
  };

  return (
    <div className="form-group m-b-15" key={field.name}>
      <label htmlFor={field.name}>
        {field.label}
        {field.required && '*'}
      </label>
      {field.type === 'textarea' && <textarea rows={3} {...common} />}
      {field.type === 'select' && (
        <select {...common}>
          <option value="">-- Select --</option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {(field.type === 'text' || field.type === 'date' || field.type === 'number') && (
        <input type={field.type} {...common} />
      )}
    </div>
  );
}

function DraftDocumentFormInner() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [docType, setDocType] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [stampState, setStampState] = useState('');
  const [stampAmount, setStampAmount] = useState(10);
  const [addOns, setAddOns] = useState([]);
  const [signatory2, setSignatory2] = useState({ name: '', email: '', mobile: '' });
  const [otherInfo, setOtherInfo] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    setDocType(null);
    setFormData({});
    api
      .get(`/draft/document-types/${slug}`)
      .then((res) => setDocType(res.data.documentType))
      .catch(() => setError('Document type not found.'));
  }, [slug]);

  const total = useMemo(() => {
    if (!docType) return 0;
    const addOnsTotal = (docType.addOns || [])
      .filter((a) => addOns.includes(a.key))
      .reduce((sum, a) => sum + a.price, 0);
    return docType.basePrice + Number(stampAmount) + addOnsTotal;
  }, [docType, stampAmount, addOns]);

  function updateField(name, value) {
    setFormData((f) => ({ ...f, [name]: value }));
  }

  function toggleAddOn(key) {
    setAddOns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stampState) return setStatus({ state: 'error', message: 'Please select a stamp paper state.' });

    setStatus({ state: 'loading', message: '' });
    try {
      await api.post(
        '/draft/cart',
        {
          documentTypeSlug: docType.slug,
          formData: { ...formData, ...(addOns.includes('second-signatory') ? { signatory2 } : {}) },
          stampState,
          stampAmount,
          addOns,
          otherInfo,
        },
        { authToken: 'user' }
      );
      navigate('/draft/cart');
    } catch (err) {
      setStatus({ state: 'error', message: err.response?.data?.error || 'Could not add to cart.' });
    }
  }

  if (error) {
    return (
      <section id="about">
        <div className="container">
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  if (!docType) {
    return (
      <section id="about">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={docType.name} />
      <section id="about">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                {docType.groups.map((group, gi) => (
                  <div className="m-b-30" key={gi}>
                    {group.title && <h4 className="m-b-15">{group.title}</h4>}
                    <div className="row">
                      {group.fields.map((field) => (
                        <div className="col-md-6" key={field.name}>
                          <Field field={field} value={formData[field.name]} onChange={updateField} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="m-b-30">
                  <h4 className="m-b-15">Stamp Paper</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group m-b-15">
                        <label>State*</label>
                        <select className="form-control" required value={stampState} onChange={(e) => setStampState(e.target.value)}>
                          <option value="">-- Select State --</option>
                          {STAMP_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group m-b-15">
                        <label>Stamp Value*</label>
                        <select className="form-control" value={stampAmount} onChange={(e) => setStampAmount(Number(e.target.value))}>
                          {STAMP_AMOUNTS.map((amt) => (
                            <option key={amt} value={amt}>₹{amt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {docType.addOns?.length > 0 && (
                  <div className="m-b-30">
                    <h4 className="m-b-15">Add-ons</h4>
                    {docType.addOns.map((addOn) => (
                      <div className="form-check m-b-10" key={addOn.key}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`addon-${addOn.key}`}
                          checked={addOns.includes(addOn.key)}
                          onChange={() => toggleAddOn(addOn.key)}
                        />
                        <label className="form-check-label" htmlFor={`addon-${addOn.key}`}>
                          {addOn.label} (+₹{addOn.price})
                        </label>
                      </div>
                    ))}

                    {addOns.includes('second-signatory') && (
                      <div className="row m-t-15">
                        <div className="col-md-4">
                          <div className="form-group m-b-15">
                            <label>2nd Signatory Name</label>
                            <input className="form-control" value={signatory2.name} onChange={(e) => setSignatory2({ ...signatory2, name: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group m-b-15">
                            <label>2nd Signatory Email</label>
                            <input type="email" className="form-control" value={signatory2.email} onChange={(e) => setSignatory2({ ...signatory2, email: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group m-b-15">
                            <label>2nd Signatory Mobile</label>
                            <input className="form-control" value={signatory2.mobile} onChange={(e) => setSignatory2({ ...signatory2, mobile: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="form-group m-b-15">
                  <label>Other Information</label>
                  <textarea rows={3} className="form-control" value={otherInfo} onChange={(e) => setOtherInfo(e.target.value)} />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="text-light p-4 rounded shadow" style={{ backgroundColor: '#2C2D2D', position: 'sticky', top: 20 }}>
                  <h4 className="text-colored">Order Summary</h4>
                  <p>Base price: ₹{docType.basePrice}</p>
                  <p>Stamp value: ₹{stampAmount}</p>
                  {addOns.map((key) => {
                    const a = docType.addOns.find((x) => x.key === key);
                    return a ? <p key={key}>{a.label}: ₹{a.price}</p> : null;
                  })}
                  <hr />
                  <h3>Total: ₹{total}</h3>
                  {status.message && <p className="text-danger">{status.message}</p>}
                  <button className="btn btn-block text-white mt-3" type="submit" style={{ backgroundColor: '#f84b46' }} disabled={status.state === 'loading'}>
                    {status.state === 'loading' ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default function DraftDocumentForm() {
  return (
    <RequireAuth>
      <DraftDocumentFormInner />
    </RequireAuth>
  );
}
