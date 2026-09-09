import { useState } from 'react';
import { PROCESS_STEPS } from '../data/homeContent';

function StepBody({ step }) {
  return (
    <div className="row">
      <div className="col-lg-6 p-l-30 p-r-30" data-animate="fadeInLeft">
        <div className="text-center">
          <br />
          <p style={{ textAlign: 'justify', color: '#03393a' }}>
            {step.body.map((line, i) => (
              <span key={i}>
                {line}
                <br /><br />
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="col-lg-6 m-b-30" data-animate="fadeInRight">
        <div className="tabimg">
          <img src={step.image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="content">
      {/* Desktop: vertical tabs */}
      <div className="container">
        <div className="row d-none d-md-block">
          <div className="content col-lg-12">
            <div className="tabs tabs-vertical">
              <div className="row">
                <div className="col-md-3 mytab">
                  <div className="plan featured">
                    <ul className="nav flex-column nav-tabs">
                      {PROCESS_STEPS.map((step, i) => (
                        <li className="nav-item" key={step.title}>
                          <button
                            type="button"
                            className={`btn btn-outline btn-rounded btn-block${active === i ? ' active' : ''}`}
                            onClick={() => setActive(i)}
                          >
                            {step.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-8 mytab">
                  <div className="plan featured">
                    <br />
                    <h2><center><font color="#e15774">{PROCESS_STEPS[active].heading}</font></center></h2>
                    <StepBody step={PROCESS_STEPS[active]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="row d-block d-md-none">
          <div className="content col-lg-9">
            <div className="accordion accordion-shadow">
              {PROCESS_STEPS.map((step, i) => (
                <div className={`ac-item${openIndex === i ? ' ac-active' : ''}`} key={step.title}>
                  <h5 className="ac-title" onClick={() => setOpenIndex(openIndex === i ? -1 : i)} style={{ cursor: 'pointer' }}>
                    <font color="#e15774">{step.heading}</font>
                  </h5>
                  {openIndex === i && (
                    <div className="ac-content">
                      <StepBody step={step} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
