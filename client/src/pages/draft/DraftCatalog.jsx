import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import draftCategories from '../../data/draftCategories';
import api from '../../lib/api';

export default function DraftCatalog() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/draft/document-types')
      .then((res) => setItems(res.data.items))
      .catch(() => setError('Could not load document types. Please try again later.'));
  }, []);

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

          {items &&
            draftCategories.map((cat) => {
              const catItems = items.filter((i) => i.category === cat.slug);
              if (catItems.length === 0) return null;
              return (
                <div key={cat.slug} className="m-b-40">
                  <h4 className="m-b-20">{cat.label}</h4>
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {catItems.map((doc) => (
                      <div className="col" key={doc.slug}>
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{doc.name}</h5>
                            <p className="text-muted mb-3">Starting at ₹{doc.basePrice}</p>
                            <Link to={`/draft/document/${doc.slug}`} className="btn btn-red mt-auto" style={{ backgroundColor: '#f84b46', color: '#fff' }}>
                              Create Affidavit
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
