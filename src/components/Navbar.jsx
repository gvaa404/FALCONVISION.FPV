import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data";

const NAV_LINKS = [
  { href: "#intro", label: "Approach" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#why-us", label: "Why Us" },
  { href: "#work", label: "Work" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav${scrolled ? " nav-scrolled" : ""}${menuOpen ? " nav-open" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={closeMenu}>
            <span className="brand-mark">⌁</span>
            <span className="brand-name">falconvision.fpv</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href="#booking" className="nav-cta">
              Book a Shoot <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              className="icon-btn nav-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-links" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              <span className="mobile-link-text">{link.label}</span>
            </a>
          ))}
          <a
            href="#booking"
            onClick={closeMenu}
            className="mobile-menu-cta"
            style={{ transitionDelay: `${NAV_LINKS.length * 35}ms` }}
          >
            <span>Book a Shoot</span>
            <ArrowUpRight size={18} />
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20FalconVision,%20I%20would%20like%20to%20inquire%20about%20a%20drone%20shoot`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-whatsapp-btn"
          >
            WhatsApp Direct: +91 63690 90002
          </a>
          <span className="mobile-menu-tagline">Cinematic FPV · Aerial Videography</span>
        </div>
      </div>
    </>
  );
}

