import { CheckCircle2 } from "lucide-react";
import { pricingPackages } from "../data";
import Reveal from "./Reveal";

export default function Pricing({ selectedService, onSelectPackage }) {
  return (
    <section id="pricing" className="pricing-section">
      <div className="section-head">
        <Reveal>
          <span className="section-label">03 / Packages & Pricing</span>
          <h2>TRANSPARENT PACKAGES.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p>
            {selectedService ? (
              <>
                Selected service: <strong className="head-selected">{selectedService}</strong>
                . Now choose your shooting duration:
              </>
            ) : (
              "Professional drone shooting packages — skilled pilot and 4K gear included. No hidden fees."
            )}
          </p>
        </Reveal>
      </div>

      <div className="pricing-grid">
        {pricingPackages.map((pkg, idx) => (
          <Reveal key={pkg.id} delay={idx * 70}>
            <article className={`price-card${pkg.featured ? " featured" : ""}`}>
              {pkg.badge && (
                <span className={`price-badge${pkg.featured ? " accent" : ""}`}>
                  {pkg.badge}
                </span>
              )}

              <div className="price-card-header">
                <h3>{pkg.name}</h3>
                <span className="price-duration">{pkg.duration}</span>
              </div>

              <div className="price-value-box">
                <span className="price-amount">{pkg.price}</span>
                {pkg.price !== "Custom" && (
                  <span className="price-term">/ shoot</span>
                )}
              </div>

              <ul className="price-features">
                {pkg.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onSelectPackage(pkg.formValue)}
                className={`button ${pkg.featured ? "primary" : "ghost"} price-cta`}
              >
                Choose {pkg.name.replace(" Package", "")} <span className="btn-arrow">↗</span>
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="pricing-footnote">
          <p>
            * Pricing may vary depending on location, shoot requirements,
            travel, and project duration. Custom projects are quoted after a
            short creative consultation.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
