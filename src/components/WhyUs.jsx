import { Shield, Award, Film, Clock, Compass } from "lucide-react";
import { whyChooseUs } from "../data";
import Reveal from "./Reveal";

const ICONS = { shield: Shield, award: Award, film: Film, clock: Clock, compass: Compass };

export default function WhyUs() {
  return (
    <section id="why-us" className="why-us">
      <div className="section-head">
        <Reveal>
          <span className="section-label">04 / Why FalconVision</span>
          <h2>BUILT FOR PERFECTION.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p>
            Cutting-edge drone hardware, a certified pilot, and a production
            mindset — reliability you can plan a shoot day around.
          </p>
        </Reveal>
      </div>

      <div className="why-list">
        {whyChooseUs.map((item, idx) => {
          const Icon = ICONS[item.icon] || Shield;
          return (
            <Reveal key={item.title} delay={Math.min(idx, 3) * 60}>
              <article className="why-item">
                <span className="why-num">0{idx + 1}</span>
                <div className="why-icon-box">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="why-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
