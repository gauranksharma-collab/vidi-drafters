import { SERVICES } from '../data/homeContent';

export default function ServicesGrid() {
  return (
    <section id="services">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {SERVICES.map((service) => (
            <div className="col" key={service.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title"><i className={`${service.icon} me-2`} /> {service.title}</h4>
                  <ul style={{ paddingLeft: 25 }}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
