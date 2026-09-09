import PageHero from '../components/PageHero';

export default function AboutUs() {
  return (
    <>
      <PageHero title="About Us" />

      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 center">
              <div className="heading-text heading-section text-center" data-animate="fadeInUp">
                <h2>Welcome to Vidhik Drafters</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h4>Who we are</h4>
              <p style={{ textAlign: 'justify' }}>
                <span className="dropcap dropcap-colored"> VD </span>
                <b>VIDHIK DRAFTER</b> is a professional <b>Business & Legal Consultancy Firm</b> dedicated to providing{' '}
                <b>comprehensive solutions in company formation, legal compliance, and intellectual property rights (IPR)</b>.
                We specialize in helping entrepreneurs, startups, and established businesses navigate the complexities of
                legal and regulatory processes with accuracy, transparency, and efficiency.
                <br /><br />
                Our services cover the full spectrum of business setup and compliance, including:
                <br /><br />
                <b>• Business Incorporation:</b> Proprietorship, Partnership, LLP, OPC, Private Limited Company<br />
                <b>• Tax & Certification Services:</b> GST Registration & Filing, ISO, FSSAI, MSME/UDYAM<br />
                <b>• Intellectual Property Protection:</b> Trademark, Copyright, and Patent Registration<br />
                <b>• Legal & Documentation Services:</b> Attestation, Apostille, Affidavit Drafting, Name Change, and Language Translation
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
              <br />
              <p style={{ textAlign: 'justify' }}>
                With a <b>qualified team of legal and financial experts</b>, VIDHIK DRAFTER ensures every client receives
                personalized, end-to-end support — from registration to documentation — all under one roof.
                <br /><br />
                We are committed to delivering <b>transparent, reliable, and timely solutions</b>, empowering businesses to
                stay compliant and focus on their growth with complete peace of mind.
                <br /><br />
                <b>VIDHIK DRAFTER</b> is a trusted Business & Legal Consultancy firm offering end-to-end services in company
                registration, GST, IPR, certification, and documentation. We simplify business setup and compliance with
                expert guidance, transparency, and reliability — helping startups and enterprises stay legally compliant
                and growth-focused.
                <br /><br />
                At VIDHIK DRAFTER, we provide a comprehensive range of <b>business, legal, and compliance services</b>{' '}
                designed to support startups, entrepreneurs, and established enterprises. Our team ensures accuracy,
                transparency, and timely delivery across all stages — from business setup to ongoing compliance and
                documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="heading-text heading-line text-center">
            <h4>Vidhik Drafters</h4>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="blockquote text">
                <small><cite>Our Mission</cite></small>
                <p>
                  At VIDHIK DRAFTER, our mission is to simplify legal and business compliance for individuals, startups,
                  and enterprises through expert guidance, transparent processes, and timely execution. We aim to make
                  complex documentation, registrations, and certifications accessible, affordable, and hassle-free —
                  empowering our clients to focus on growth while we handle the legalities.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blockquote blockquote-dark text-light">
                <small><cite>Our Vision</cite></small>
                <p>
                  Our vision is to be India's most trusted and technology-driven legal documentation and business
                  registration platform — known for integrity, innovation, and excellence. We strive to create a future
                  where every entrepreneur, professional, and organization can seamlessly manage their legal and
                  compliance needs with confidence and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="heading-text heading-line text-center">
            <h4>About Us</h4>
          </div>
          <div id="blog" className="grid-layout post-3-columns m-b-30" data-item="post-item">
            {[
              ['Company Philosophy:', 'We believe legal clarity is the foundation of business success. Our philosophy centers on trust, precision, and empowerment, combining human expertise with technology to make compliance simple and stress-free.'],
              ['Our Promise', 'We promise professionalism, transparency, and accuracy in every service — from registration to legal drafting — ensuring peace of mind for our clients.'],
              ['Quality Commitment', 'Zero-error approach, multiple quality checks, and high ethical standards ensure reliable, timely, and accurate services.'],
              ['Client Charter', 'We pledge clear, timely, and confidential services with transparent pricing and responsive support.'],
              ['Code of Conduct', "Integrity, confidentiality, professionalism, respect, compliance, client-first focus, and continuous improvement define our team's ethical standards."],
            ].map(([heading, body]) => (
              <div className="post-item border" key={heading}>
                <div className="post-item-wrap">
                  <div className="post-item-description">
                    <h2><a href="#">{heading}</a></h2>
                    <p>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="heading-text heading-line text-center">
            <h4>🌟 Our Commitment</h4>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>
                At VIDHIK DRAFTER, we believe that every entrepreneur deserves a strong legal foundation.
                <br /><br />
                We're not just service providers — we're your legal partners, ensuring your business runs confidently and
                compliantly in every aspect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
