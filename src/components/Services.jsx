import { ArrowRight } from "lucide-react";
import { services } from "../data";
import Reveal from "./Reveal";

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="services">
      <div className="section-head">
        <Reveal>
          <span className="section-label">02 / Our Services</span>
          <h2>WHAT WE SHOOT.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p>
            From immersive high-speed FPV dives to stabilized luxury real estate
            and wedding coverage — every shoot is flown and graded in-house.
          </p>
        </Reveal>
      </div>

      <div className="services-list">
        {services.map((service, idx) => (
          <Reveal key={service.number} delay={Math.min(idx, 3) * 60}>
            <article
              className="service-row"
              onClick={() => onSelectService(service.title)}
            >
              <span className="service-row-num">{service.number}</span>

              <div className="service-row-media">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="service-row-body">
                <span className="service-row-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  type="button"
                  className="service-row-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service.title);
                  }}
                >
                  Select &amp; price this shoot <ArrowRight size={14} />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
