import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import RegistrationForm from '../components/RegistrationForm';
import servicePages from '../data/servicePages';

export default function ServicePage() {
  const { slug } = useParams();
  const page = servicePages[slug];

  if (!page) {
    return (
      <section id="about">
        <div className="container">
          <p>Page not found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={page.pageTitleH1} />

      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 center">
              <div className="heading-text heading-section text-center" data-animate="fadeInUp">
                <h2>{page.heading}</h2>
                <p>{page.intro}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div id="blog" className="grid-layout post-2-columns" data-item="post-item" style={{ boxShadow: '0 5px 10px 3px #B3B3B3' }}>
                {page.cards.map((card) => (
                  <div className="post-item" key={card.heading}>
                    <div className="post-item-wrap">
                      <div className="post-item-description">
                        <h2><a href="#">{card.heading}</a></h2>
                        <p>
                          {card.body.map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-10">
              <div className="text-light p-4 rounded shadow" style={{ backgroundColor: '#2C2D2D' }}>
                <div className="heading mb-3 text-center">
                  <h2 className="text-colored">REGISTRATION</h2>
                  <span className="text-light">Submit details to start Registration!</span>
                </div>
                <RegistrationForm fixedService={page.serviceLabel} />
                <p className="mt-3"><b>Note:</b> Our Customer Service is Available 24/7.</p>
              </div>
            </div>
          </div>
          {page.processingTime && (
            <>
              <br />
              <div>
                <h2>{page.processingTimeHeading}</h2>
                <p>{page.processingTime}</p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
