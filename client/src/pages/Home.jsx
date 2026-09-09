import HeroSlider from '../components/HeroSlider';
import RegistrationForm from '../components/RegistrationForm';
import ServicesGrid from '../components/ServicesGrid';
import ProcessSection from '../components/ProcessSection';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className="p-b-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-text heading-section text-center m-b-40" data-animate="fadeInUp">
                <h2>WELCOME TO Vidhik Drafters</h2>
                <span className="lead">
                  " Your One-Stop Partner for Business Registration, Legal Compliance & Intellectual Property Services. "
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <p style={{ textAlign: 'justify' }}>
                <b>VIDHIK DRAFTER</b> is a professional Business & Legal Consultancy Firm dedicated to providing
                comprehensive solutions in company formation, legal compliance, and intellectual property rights (IPR).
                We specialize in helping entrepreneurs, startups, and established businesses navigate the complexities of
                legal and regulatory processes with accuracy, transparency, and efficiency.
                <br /><br />
                We provide end-to-end support in company registration, compliance, certification, intellectual property
                rights, and legal drafting — all under one roof. Our mission is to make legal and regulatory processes
                transparent, affordable, and accessible for every business, so you can focus on growth while we manage
                your compliance journey.
              </p>
              Our services cover the full spectrum of business setup and compliance, including:
              <br /><br />
              <p>
                &nbsp;&nbsp;&nbsp;<b>• Business Incorporation:</b> Proprietorship, Partnership, LLP, OPC, Private Limited Company<br />
                &nbsp;&nbsp;&nbsp;<b>• Tax & Certification Services:</b> GST Registration & Filing, ISO, FSSAI, MSME/UDYAM<br />
                &nbsp;&nbsp;&nbsp;<b>• Intellectual Property Protection:</b> Trademark, Copyright, and Patent Registration<br />
                &nbsp;&nbsp;&nbsp;<b>• Legal & Documentation Services:</b> Attestation, Apostille, Affidavit Drafting, Name Change, and Language Translation
              </p>
              <p style={{ textAlign: 'justify' }}>
                We are committed to delivering transparent, reliable, and timely solutions, empowering businesses to stay
                compliant and focus on their growth with complete peace of mind.
              </p>
            </div>
            <div className="col-lg-4 col-md-12 text-light p-20 rounded" style={{ backgroundColor: '#2C2D2D' }} id="registration-form">
              <div className="heading p-20 m-b-0">
                <h2 className="text-colored">REGISTRATION</h2>
                <span className="text-light">Submit details to start Registration!</span>
              </div>
              <RegistrationForm />
              <p className="p-20 m-b-0"><b>Note:</b> Our Customer Service is Available 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="seperator p-b-0 p-t-0"><i className="fa fa-chevron-down" /></div>

      <ServicesGrid />

      <div className="seperator p-b-0 p-t-0"><i className="fa fa-chevron-down" /></div>

      <section
        className="section-video text-light"
        style={{ backgroundImage: "url('/img/sl2.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
      >
        <div className="container container-fullscreen">
          <div className="text-middle text-center text-light">
            <h2 className="text-uppercase text-sm">Our Registration Process</h2>
            <p className="lead">
              "At <b>VIDHIK DRAFTER</b>, we follow a transparent and streamlined process to make every registration
              simple, accurate, and hassle-free. Whether you're applying for a company formation, GST, IPR, or
              certification — our experts guide you through every step."
            </p>
          </div>
        </div>
      </section>

      <ProcessSection />

      <div className="seperator p-b-0 p-t-0"><i className="fa fa-chevron-down" /></div>

      <WhyChooseUs />
    </>
  );
}
