import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import HowItWorks from '../../components/HowItWorks';
import AffidavitTabs from '../../components/AffidavitTabs';
import draftCategories from '../../data/draftCategories';
import api from '../../lib/api';

export default function DraftCategoryPage() {
  const { categorySlug } = useParams();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  const category = draftCategories.find((c) => c.slug === categorySlug);

  useEffect(() => {
    api
      .get('/draft/document-types', { params: { category: categorySlug } })
      .then((res) => setItems(res.data.items))
      .catch(() => setError('Could not load document types. Please try again later.'));
  }, [categorySlug]);

  if (!category) {
    return (
      <section id="about">
        <div className="container">
          <p>Category not found. <Link to="/draft">Back to Drafts</Link></p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={category.label.toUpperCase()} />
      <HowItWorks />

      <section id="page-content">
        <div className="container">
          {error && <p className="text-danger text-center">{error}</p>}
          {!items && !error && <p className="text-center">Loading...</p>}
          {items && items.length === 0 && (
            <p className="text-center">No document types found in this category yet.</p>
          )}
          {items && items.length > 0 && <AffidavitTabs docs={items} />}
        </div>
      </section>
    </>
  );
}
