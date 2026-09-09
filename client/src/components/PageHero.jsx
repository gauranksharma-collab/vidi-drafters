export default function PageHero({ title }) {
  return (
    <section
      id="page-title"
      className="text-light"
      style={{ backgroundImage: "url(/img/sl.jpg)", backgroundSize: 'cover', backgroundPosition: 'center center' }}
    >
      <div className="bg-overlay" />
      <div className="container">
        <div className="page-title">
          <br /><br /><br /><br /><br />
          <h1 className="text-uppercase text-small">{title}</h1>
          <br /><br /><br /><br /><br />
        </div>
      </div>
    </section>
  );
}
