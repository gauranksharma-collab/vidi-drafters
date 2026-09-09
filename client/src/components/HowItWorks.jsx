const STEPS = [
  { icon: 'fa fa-rocket', title: 'Fill Your Details' },
  { icon: 'fas fa-book-reader', title: 'Review & Make Payment' },
  { icon: 'fas fa-shipping-fast', title: 'Delivery of your Affidavit with e-Stamp' },
];

export default function HowItWorks() {
  return (
    <section>
      <div className="container">
        <div className="col-lg-8 m-b-80 center">
          <div className="heading-text heading-section text-center">
            <h2>How It Works ?</h2>
          </div>
        </div>

        <div className="row">
          {STEPS.map((step) => (
            <div className="col-lg-4" key={step.title}>
              <div className="icon-box text-center effect border color">
                <div className="icon">
                  <i className={step.icon} />
                </div>
                <h5>{step.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
