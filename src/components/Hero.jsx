import { ArrowUpRight, Play } from "lucide-react";
import heroLarge from "../assets/images/hero-2048.webp";
import heroSmall from "../assets/images/hero-1280.webp";

export default function Hero() {
  return (
    <section className="hero" aria-label="FalconVision FPV — cinematic drone videography">
      <div className="hero-bg" aria-hidden="true">
        <picture>
          <source srcSet={heroLarge} media="(min-width: 1600px)" type="image/webp" />
          <img
            src={heroSmall}
            alt=""
            className="hero-img-overlay"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-ambient-glow" />
        <div className="hero-horizon-gradient" />
        <div className="grain" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow reveal-plain">
          <span className="eyebrow-dot" aria-hidden="true" />
          DJI AVATA 360 · CINEMATIC FPV · AERIAL VIDEOGRAPHY
        </p>

        <h1 className="reveal-plain d1">
          Cinematic FPV.
          <br />
          <em>From a different perspective.</em>
        </h1>

        <p className="hero-text reveal-plain d2">
          High-speed FPV flight and stabilized 4K aerial cinematography for
          real estate, weddings, events, and commercial productions —
          piloted, precise, and fearless.
        </p>

        <div className="hero-actions reveal-plain d3">
          <a href="#booking" className="button primary">
            Book a Shoot <ArrowUpRight size={15} />
          </a>
          <a href="#work" className="button ghost">
            <Play size={13} /> Explore Our Work
          </a>
        </div>
      </div>

      {/* Technical side rail */}
      <div className="hero-meta" aria-hidden="true">
        <span>FPV</span>
        <span>4K</span>
        <span>360°</span>
        <span>CINEMATIC</span>
        <span>INDIA</span>
      </div>

      <div className="scroll" aria-hidden="true">
        SCROLL <span>↓</span>
      </div>
    </section>
  );
}
