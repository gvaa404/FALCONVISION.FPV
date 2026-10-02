import { ArrowUpRight, Phone, Mail, Clock, MapPin, Camera, Radio, Sparkles, Zap, Shield } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data";

const NAV_SECTIONS = [
  { href: "#intro", num: "01", label: "The Approach" },
  { href: "#services", num: "02", label: "Flight Services" },
  { href: "#pricing", num: "03", label: "Pricing & Packages" },
  { href: "#why-us", num: "04", label: "Why Choose Us" },
  { href: "#work", num: "05", label: "Selected Work & 4K" },
  { href: "#booking", num: "06", label: "Book a Shoot" },
];

const CAPABILITIES = [
  "FPV Indoor Fly-Throughs",
  "High-Speed Action & Chase",
  "Architectural & Real Estate",
  "Cinematic Weddings & Events",
  "360° VR Aerial Panoramas",
  "Commercial & Brand Ads",
];

const FLEET_SPECS = [
  { icon: Camera, text: "DJI Avata 360 & FPV Whoop" },
  { icon: Radio, text: "DJI Goggles 2 + O3+ Transmission" },
  { icon: Sparkles, text: "8K 60FPS / RockSteady HDR" },
  { icon: Zap, text: "10-Bit D-Cinelike Color Space" },
  { icon: Shield, text: "DGCA Compliant Operations" },
];

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="brand">
            <span className="brand-mark">⌁</span> falconvision.fpv
          </div>
          <p className="footer-desc">
            Professional DJI Avata 360 &amp; cinematic FPV drone videography
            services. Delivering broadcast-quality 4K/8K aerial visuals for
            films, luxury real estate, weddings, and commercial campaigns.
          </p>
          <div className="footer-live-status">
            <span className="status-ping" aria-hidden="true" />
            <span>Available for shoots across India &amp; destination locations</span>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">NAVIGATION</span>
          <ul className="footer-links">
            {NAV_SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href}>
                  <span className="footer-num">{s.num}</span> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-heading">CAPABILITIES</span>
          <ul className="footer-links">
            {CAPABILITIES.map((c) => (
              <li key={c}>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-heading">FLEET &amp; SPECS</span>
          <ul className="footer-links fleet-specs">
            {FLEET_SPECS.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={13} aria-hidden="true" /> <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col contact-col">
          <span className="footer-heading">DIRECT CONTACT</span>
          <div className="footer-contact-items">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi FalconVision, I'd like to inquire about drone shooting services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link highlight"
            >
              <Phone size={14} />
              <span>WhatsApp Direct (+91 99999 99999)</span>
              <ArrowUpRight size={13} />
            </a>

            <a href="mailto:contact@falconvision.fpv" className="footer-contact-link">
              <Mail size={14} />
              <span>contact@falconvision.fpv</span>
            </a>

            <div className="footer-info-row">
              <Clock size={14} aria-hidden="true" />
              <span>24–48h RAW Footage Delivery</span>
            </div>

            <div className="footer-info-row">
              <MapPin size={14} aria-hidden="true" />
              <span>HQ: Coimbatore / Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>© {new Date().getFullYear()} falconvision.fpv. All rights reserved.</span>
          <span className="footer-divider">·</span>
          <span>Certified Commercial FPV Pilot</span>
          <span className="footer-divider">·</span>
          <span>Safety-First Aviation Standard</span>
        </div>

        <a href="#top" className="footer-back-to-top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
