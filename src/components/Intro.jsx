import { Zap } from "lucide-react";
import IntroDroneModel from "./IntroDroneModel";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section id="intro" className="intro">
      <div className="intro-left">
        <Reveal>
          <span className="section-label">01 / The FalconVision Approach</span>
        </Reveal>

        <Reveal delay={60}>
          <div className="intro-drone-card-slot">
            <IntroDroneModel />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="intro-pilot-badge">
            <span className="pilot-live-dot" aria-hidden="true" />
            <div>
              <strong>COMMERCIAL FPV PILOT</strong>
              <p>Licensed for indoor fly-throughs &amp; tight spaces</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="intro-main">
        <Reveal>
          <h2>
            Not just footage.
            <br />
            <span>A point of view.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p>
            We turn aerial perspectives into cinematic stories. Every flight is
            meticulously planned around light, speed, movement, and the
            character of your location — then flown line by line until the
            shot is exactly right.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="intro-stats-grid">
            <div className="intro-stat-card">
              <span className="intro-stat-val">
                65<small>KM/H</small>
              </span>
              <span className="intro-stat-lbl">Top FPV chase velocity</span>
            </div>
            <div className="intro-stat-card">
              <span className="intro-stat-val">
                8K<small>60FPS</small>
              </span>
              <span className="intro-stat-lbl">RockSteady HDR capture</span>
            </div>
            <div className="intro-stat-card">
              <span className="intro-stat-val">
                104°–360°<small>FOV</small>
              </span>
              <span className="intro-stat-lbl">Ultra-wide cinematic lens</span>
            </div>
            <div className="intro-stat-card">
              <span className="intro-stat-val">
                10-BIT<small>D-LOG</small>
              </span>
              <span className="intro-stat-lbl">Dynamic color grading range</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="drone-highlight-box">
            <Zap size={26} style={{ color: "var(--accent)", flexShrink: 0 }} aria-hidden="true" />
            <div>
              <strong>Powered by DJI Avata 360</strong>
              <span>
                High-speed agile maneuvering, ultra-wide 360 vision, and
                RockSteady gyro stabilization for broadcast-ready takes.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
