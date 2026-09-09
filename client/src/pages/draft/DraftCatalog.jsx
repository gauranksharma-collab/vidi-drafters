import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import draftCategories from '../../data/draftCategories';
import api from '../../lib/api';

const ACCENT = '#f84b46';

export default function DraftCatalog() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/draft/document-types')
      .then((res) => setItems(res.data.items))
      .catch(() => setError('Could not load document types. Please try again later.'));
  }, []);

  const categoriesWithItems = items
    ? draftCategories
        .map((cat) => ({ ...cat, items: items.filter((i) => i.category === cat.slug) }))
        .filter((cat) => cat.items.length > 0)
    : [];

  return (
    <>
      <PageHero title="Online Legal Drafts" />
      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 center">
              <div className="heading-text heading-section text-center">
                <h2>📝 Choose an Affidavit or Agreement</h2>
                <p>
                  Select a document type below, fill in the details, and our team will draft, notarize, and deliver it
                  to you.
                </p>
              </div>
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          {!items && !error && <p className="text-center">Loading...</p>}

          {items && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
              }}
              className="m-b-40"
            >
              {categoriesWithItems.map((cat) => (
                <div
                  key={cat.slug}
                  style={{
                    flex: '0 1 340px',
                    border: '1px solid #eee',
                    borderRadius: '6px',
                    padding: '30px 24px',
                    position: 'relative',
                    background: '#fff',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      backgroundColor: ACCENT,
                      color: '#fff',
                      borderRadius: '20px',
                      padding: '4px 14px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {cat.badge}
                  </span>

                  <div
                    style={{
                      fontSize: '48px',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: '#fdeceb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {cat.icon}
                  </div>

                  <h5 style={{ fontWeight: 700, marginBottom: '16px' }}>{cat.label}</h5>

                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                    {cat.items.map((doc) => (
                      <li key={doc.slug} style={{ marginBottom: '8px', color: '#666' }}>
                        <i className="fa fa-hand-o-right" style={{ marginRight: '8px', color: ACCENT }} />
                        {doc.name}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/draft/category/${cat.slug}`}
                    className="btn"
                    style={{ backgroundColor: ACCENT, color: '#fff', width: '100%', display: 'block' }}
                  >
                    Select affidavit <i className="fa fa-arrow-right" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
