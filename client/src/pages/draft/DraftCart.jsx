import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import RequireAuth from '../../components/RequireAuth';
import api from '../../lib/api';

function DraftCartInner() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  function load() {
    api.get('/draft/cart', { authToken: 'user' }).then((res) => setData(res.data));
  }

  useEffect(load, []);

  async function removeItem(id) {
    await api.delete(`/draft/cart/${id}`, { authToken: 'user' });
    load();
  }

  if (!data) {
    return (
      <section id="about">
        <div className="container"><p>Loading...</p></div>
      </section>
    );
  }

  if (data.items.length === 0) {
    return (
      <>
        <PageHero title="Your Cart" />
        <section id="about">
          <div className="container text-center">
            <p>Your cart is empty.</p>
            <Link to="/draft" className="btn btn-dark">Browse Documents</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="Your Cart" />
      <section id="about">
        <div className="container">
          <div className="admin-table-wrap" style={{ marginBottom: 24 }}>
            <table className="admin-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Stamp</th>
                  <th>Add-ons</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.documentName}</td>
                    <td>{item.stampState} / ₹{item.stampAmount}</td>
                    <td>{item.addOns.map((a) => a.label).join(', ') || '-'}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>
                      <button onClick={() => removeItem(item._id)} className="btn btn-sm btn-outline-danger">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-6 text-right">
              <h4>Subtotal: ₹{data.total}</h4>
              <button className="btn btn-dark" onClick={() => navigate('/draft/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function DraftCart() {
  return (
    <RequireAuth>
      <DraftCartInner />
    </RequireAuth>
  );
}
