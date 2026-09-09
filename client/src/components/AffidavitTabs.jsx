import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#f5871f';

function TabGroup({ docs }) {
  const [active, setActive] = useState(0);
  const activeDoc = docs[active];

  return (
    <div className="tabs tabs-folder m-b-40">
      <ul className="nav nav-tabs nav-fill justify-content-center">
        {docs.map((doc, i) => (
          <li className="nav-item" key={doc.slug}>
            <button
              type="button"
              className={`nav-link${active === i ? ' active' : ''}`}
              style={{ color: ACCENT, border: 0, background: 'none', width: '100%' }}
              onClick={() => setActive(i)}
            >
              {doc.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content text-center p-t-20">
        <p>{activeDoc.description}</p>
        <Link
          to={`/draft/document/${activeDoc.slug}`}
          className="btn"
          style={{ backgroundColor: ACCENT, color: '#fff', border: 'none' }}
        >
          <i className="fas fa-adjust" /> Create Affidavit
        </Link>
      </div>
    </div>
  );
}

function chunk(items, size) {
  const groups = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

export default function AffidavitTabs({ docs }) {
  const groups = chunk(docs, 3);

  return (
    <>
      <center>
        <h2>Choose Your Affidavit</h2>
      </center>
      <div className="space" />
      {groups.map((group) => (
        <TabGroup docs={group} key={group[0].slug} />
      ))}
    </>
  );
}
