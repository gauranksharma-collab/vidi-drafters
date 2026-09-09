import { useState } from 'react';
import { WHY_CHOOSE_US } from '../data/homeContent';

export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <>
      <section
        className="section-video text-light"
        style={{ backgroundImage: "url('/img/sl.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
      >
        <div className="container container-fullscreen">
          <div className="text-middle text-center text-light">
            <h2 className="text-uppercase text-sm">Why Choose VIDHIK DRAFTER</h2>
            <p className="lead">
              "At <b>VIDHIK DRAFTER</b>, we believe legal documentation and business registration should be simple,
              transparent, and hassle-free. Here's why thousands trust us as their legal and business partner"
            </p>
          </div>
        </div>
      </section>

      <section id="page-content">
        <div className="container">
          <div className="row">
            <div className="content col-lg-12">
              <div className="toggle accordion accordion-shadow">
                {WHY_CHOOSE_US.map((item, i) => (
                  <div className={`ac-item${openIndex === i ? ' ac-active' : ''}`} key={item.title}>
                    <h5 className="ac-title" onClick={() => setOpenIndex(openIndex === i ? -1 : i)} style={{ cursor: 'pointer' }}>
                      {item.title}
                    </h5>
                    {openIndex === i && (
                      <div className="ac-content">
                        <p>{item.body}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
