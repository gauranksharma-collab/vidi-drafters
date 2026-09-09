export default function Footer() {
  return (
    <>
      <section
        className="section-video text-light"
        style={{
          backgroundImage: "url('/img/sl.jpg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container container-fullscreen">
          <div className="text-middle text-center text-light">
            <h2 className="text-uppercase text-md">Vidhik Drafters</h2>
            <p className="lead">
              "At Vidhik Drafters our mission is to empower individuals, businesses, and legal professionals with
              convenient, accessible, and reliable online legal document solutions."
            </p>
          </div>
        </div>
      </section>

      <footer id="footer" className="inverted">
        <div className="footer-content">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="icon-box effect small clean">
                  <div className="icon"><a href="#"><i className="icon-clock" style={{ color: 'white' }} /></a></div>
                  <h3>Vidhik Drafters</h3>
                  <p>
                    A professional consultancy firm offering end-to-end solutions in business registration,
                    compliance, IPR, and legal documentation — ensuring transparency, accuracy, and trusted expertise
                    for startups and enterprises.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box effect small clean">
                  <div className="icon"><a href="#"><i className="fas fa-map-marker-alt" style={{ color: 'white' }} /></a></div>
                  <h3>Office</h3>
                  <p>
                    <strong>Address:</strong>
                    <br /> 45/1109 DDA Flats
                    <br /> Kalkaji - 110019
                    <br />
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box effect small clean">
                  <div className="icon"><a href="#"><i className="icon-phone" style={{ color: 'white' }} /></a></div>
                  <h3>Contact</h3>
                  <p>
                    <br /> Phone: <a href="tel://+918979002000"> +91 89790 02000 </a>
                    <br /> Email: <a href="mailto:care@vidhikdrafters.com"> care@vidhikdrafters.com </a>
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-content">
          <div className="container">
            <div className="copyright-text text-light text-center">&copy; 2025 Vidhik Drafters. All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/918979002000?text=Hello%20Vidhik%20Drafters" className="whatsapp-float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp" />
      </a>
    </>
  );
}
