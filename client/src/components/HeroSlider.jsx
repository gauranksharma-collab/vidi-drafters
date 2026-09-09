import { useEffect, useState } from 'react';

const SLIDES = [
  {
    image: '/img/1.jpg',
    imageMobile: '/img/1_m.jpg',
    eyebrow: 'WELCOME TO VIDHIK DRAFTER',
    title: (<>Business<br /> Registration</>),
    text: (<>" Your One-Stop Partner for <br /> Business Registration, Legal Compliance<br /> & Intellectual Property Services. "</>),
  },
  {
    image: '/img/2.jpg',
    imageMobile: '/img/2_m.jpg',
    eyebrow: 'WELCOME TO VIDHIK DRAFTER',
    title: (<>Legal Compliance <br />Consultants</>),
    text: (<>"Empowering Startups with Hassle-Free<br /> Registrations, Certifications & Legal Services."</>),
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 4600);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="slider" className="inspiro-slider slider-fullscreen dots-creative is-fade" style={{ position: 'relative' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`slide background-image${i === active ? ' is-selected' : ''}`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            position: 'absolute',
            inset: 0,
            zIndex: i === active ? 2 : 1,
            pointerEvents: i === active ? 'auto' : 'none',
          }}
        >
          <div className="container">
            {i === active && (
              <div className="slide-captions text-left" key={active}>
                <h6 className="text-light">{slide.eyebrow}</h6>
                <h2 className="text-uppercase text-medium text-light">{slide.title}</h2>
                <p className="lead text-light">{slide.text}</p>
                <a className="btn btn-red" href="#registration-form">Contact Us</a>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="slider-dots" style={{ position: 'absolute', bottom: 24, width: '100%', textAlign: 'center', zIndex: 5 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              margin: '0 4px',
              background: i === active ? '#f84b46' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}
