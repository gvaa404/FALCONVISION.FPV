import { useState, useEffect } from "react";
import djiAvataHeroImg from "./assets/images/hero.png";
import {
  Sun,
  Moon,
  CheckCircle2,
  Shield,
  Award,
  Film,
  Clock,
  Compass,
  Zap,
  Play,
  X,
  Maximize2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Radio,
  Camera,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";

const services = [
  {
    number: "01",
    title: "FPV Drone Shooting",
    description:
      "High-speed dynamic flight, immersive indoor fly-throughs, and close-quarters acrobatic tracking.",
    image:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    tag: "IMMERSIVE FPV",
  },
  {
    number: "02",
    title: "Cinematic Aerial Shooting",
    description:
      "Ultra-smooth sweeping camera moves, golden-hour landscapes, and cinematic film productions.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    tag: "4K CINEMATIC",
  },
  {
    number: "03",
    title: "Professional Drone Videography",
    description:
      "Broadcast-grade 4K/60fps video capture with calibrated color science for high-end productions.",
    image:
      "https://images.unsplash.com/photo-1507582020432-2a3bc418b23d?auto=format&fit=crop&w=800&q=80",
    tag: "PRO GEAR",
  },
  {
    number: "04",
    title: "Real Estate & Property Shoots",
    description:
      "Showcase luxury villas, resorts, layouts, and architectural developments with premium aerial angles.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    tag: "REAL ESTATE",
  },
  {
    number: "05",
    title: "Wedding & Event Drone Coverage",
    description:
      "Capture grand entrances, magnificent venues, festivals, sports, and crowd energy from above.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tag: "EVENTS & CELEBRATIONS",
  },
  {
    number: "06",
    title: "Commercial & Promotional Shoots",
    description:
      "Dynamic visual storytelling for brand commercials, social advertising, and promotional films.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tag: "COMMERCIAL",
  },
  {
    number: "07",
    title: "Reels & Social Media Content",
    description:
      "Fast-paced, attention-grabbing vertical (9:16) and cinematic horizontal clips optimized for viral reach.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    tag: "SOCIAL REELS",
  },
  {
    number: "08",
    title: "Custom Aerial Videography",
    description:
      "Bespoke flight planning for unique creative visions, agriculture, large estates, or industrial sites.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    tag: "CUSTOM FLIGHTS",
  },
];

const pricingPackages = [
  {
    id: "half-day",
    name: "Half Day Package",
    duration: "Up to 4 Hours",
    price: "₹6,000",
    formValue: "Half Day – Up to 4 Hours (₹6,000)",
    featured: false,
    badge: "FLEXIBLE",
    features: [
      "DJI Avata 360 Drone + Pilot",
      "Up to 4 Hours on-site flight",
      "4K Ultra HD Stabilized Footage",
      "Real estate, reels & short events",
      "Same-day / raw file transfer",
    ],
  },
  {
    id: "full-day",
    name: "Full Day Package",
    duration: "Up to 8 Hours",
    price: "₹12,000",
    formValue: "Full Day – Up to 8 Hours (₹12,000)",
    featured: true,
    badge: "MOST POPULAR",
    features: [
      "DJI Avata 360 Drone + Pilot",
      "Up to 8 Hours comprehensive shoot",
      "Unlimited flight sessions & batteries",
      "Multi-location shoot coordination",
      "Full weddings, films & commercial campaigns",
      "Priority footage delivery & color profiles",
    ],
  },
  {
    id: "custom",
    name: "Custom Project",
    duration: "Project Based",
    price: "Custom",
    formValue: "Custom Project Package",
    featured: false,
    badge: "BESPOKE",
    features: [
      "Multi-day production expeditions",
      "Specialized indoor/outdoor FPV routes",
      "Post-production editing & color grading",
      "Commercial licensing support",
      "Dedicated creative consultation",
    ],
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Professional Equipment",
    description:
      "Equipped with the high-performance DJI Avata 360 drone, gyro stabilization, and high-bitrate 4K sensors.",
  },
  {
    icon: Award,
    title: "Skilled Pilot",
    description:
      "Certified precision FPV pilot capable of seamless high-speed lines and intricate indoor navigation.",
  },
  {
    icon: Film,
    title: "Cinematic Shots",
    description:
      "Artful camera trajectories, buttery color grading, and dynamic speeds designed for impactful visual storytelling.",
  },
  {
    icon: Clock,
    title: "Flexible Packages",
    description:
      "Transparent pricing from Half Day (₹6,000) to Full Day (₹12,000) packages with no hidden fees.",
  },
  {
    icon: Compass,
    title: "Location Coverage",
    description:
      "Extensive coverage across Tamil Nadu and regional filming locations with rapid deployment ready.",
  },
];

const portfolio = [
  {
    id: "fpv-reel",
    category: "FPV DRONE REEL",
    title: "High-Speed Dynamic FPV Flight",
    subtitle: "Acros, dive-ins and fast proximity tracking",
    youtubeId: "bNpx7gpSqeI",
    wide: true,
  },
  {
    id: "luxury-villa",
    category: "LUXURY REAL ESTATE",
    title: "Property, Redefined",
    subtitle: "Architectural Villa & Resort Showcase",
    youtubeId: "_tV5LEBDs7w",
    wide: false,
  },
  {
    id: "cinematic-nature",
    category: "CINEMATIC LANDSCAPE",
    title: "Land from Above",
    subtitle: "Scenic Mountain & Coastline Expedition",
    youtubeId: "Scxs7L0vhZ4",
    wide: false,
  },
  {
    id: "wedding-moment",
    category: "WEDDING & CELEBRATION",
    title: "Moments in Motion",
    subtitle: "Cinematic Wedding & Couple Sequence",
    youtubeId: "4vL_2NER5nY",
    wide: true,
  },
];

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("falconvision_theme") || "dark";
    }
    return "dark";
  });

  const [selectedService, setSelectedService] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [inlinePlayingId, setInlinePlayingId] = useState(null);
  const [theaterVideo, setTheaterVideo] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("falconvision_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && theaterVideo) {
        setTheaterVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theaterVideo]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSelectPackage = (pkgFormValue) => {
    setSelectedPackage(pkgFormValue);
    const bookingElement = document.getElementById("booking");
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    const pricingElement = document.getElementById("pricing");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleBooking(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.name.value.trim();
    const service = form.service.value;
    const pkg = form.packageChoice.value || "Not specified";
    const location = form.location.value.trim();
    const date = form.date.value;
    const message = form.message.value.trim() || "None";

    const formattedDate = date
      ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not decided yet";

    const whatsappMessage =
      "Hi falconvision.fpv, I would like to book a drone shoot.\n\n" +
      "Name: " + name + "\n" +
      "Shoot Type: " + service + "\n" +
      "Selected Package: " + pkg + "\n" +
      "Location: " + location + "\n" +
      "Preferred Date: " + formattedDate + "\n" +
      "Requirements: " + message + "\n\n" +
      "Please confirm pilot availability and booking details.";

    const whatsappUrl =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        <a href="#top" className="brand">
          <span className="brand-mark">⌁</span> falconvision.fpv
        </a>

        <div className="nav-center">
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#why-us">Why Us</a>
            <a href="#work">Work</a>
            <a href="#booking">Booking</a>
          </nav>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <>
                <Sun size={14} />
                <span className="theme-text">Light</span>
              </>
            ) : (
              <>
                <Moon size={14} />
                <span className="theme-text">Dark</span>
              </>
            )}
          </button>

          <a href="#booking" className="nav-cta">
            Book a Shoot <span>↗</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg">
            <img
              src={djiAvataHeroImg}
              alt="DJI Avata FPV Cinematic Drone"
              className="hero-img-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="hero-ambient-glow"></div>
            <div className="hero-horizon-gradient"></div>
            <div className="grain"></div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">
              DJI AVATA 360 · CINEMATIC AERIAL VIDEOGRAPHY
            </p>

            <h1>
              CAPTURE THE WORLD
              <br />
              <em>FROM A NEW PERSPECTIVE.</em>
            </h1>

            <p className="hero-text">
              Immersive FPV and high-resolution aerial videography for cinematic productions, luxury real estate, weddings, and commercial campaigns.
            </p>

            <div className="hero-actions">
              <a href="#booking" className="button primary">
                Book Your Shoot <span>↗</span>
              </a>

              <a href="#pricing" className="button ghost">
                View Packages <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section id="intro" className="intro">
          <div className="intro-left-sidebar">
            <span className="section-label">
              01 / THE FALCONVISION.FPV APPROACH
            </span>

            <div className="intro-stats-grid">
              <div className="intro-stat-card">
                <span className="intro-stat-val">65<small>KM/H</small></span>
                <span className="intro-stat-lbl">Top FPV Chase Velocity</span>
              </div>
              <div className="intro-stat-card">
                <span className="intro-stat-val">8K<small>60FPS</small></span>
                <span className="intro-stat-lbl">RockSteady HDR Capture</span>
              </div>
              <div className="intro-stat-card">
                <span className="intro-stat-val">104°-360°<small>FOV</small></span>
                <span className="intro-stat-lbl">Ultra-Wide Cinematic Lens</span>
              </div>
              <div className="intro-stat-card">
                <span className="intro-stat-val">10-BIT<small>D-LOG</small></span>
                <span className="intro-stat-lbl">Dynamic Color Grading Range</span>
              </div>
            </div>

            <div className="intro-pilot-badge">
              <span className="pilot-live-dot"></span>
              <div>
                <strong>COMMERCIAL FPV PILOT</strong>
                <p>Licensed for indoor fly-throughs & tight spaces</p>
              </div>
            </div>
          </div>

          <div>
            <h2>
              Not just footage.
              <br />
              <span>A point of view.</span>
            </h2>

            <p>
              We turn aerial perspectives into cinematic stories. Every flight
              is meticulously planned around light, speed, movement, and the
              character of your location.
            </p>

            <div className="drone-highlight-box">
              <Zap size={28} style={{ color: "var(--accent)", flexShrink: 0 }} />
              <div>
                <strong>Powered by DJI Avata 360 Drone</strong>
                <span>
                  High-speed agile maneuvering, ultra-wide 360 vision, and
                  RockSteady gyro stabilization for broadcast-ready aerial takes.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* OUR SERVICES */}
        <section id="services" className="services">
          <div className="section-head">
            <div>
              <span className="section-label">02 / OUR SERVICES</span>
              <h2>WHAT WE SHOOT.</h2>
            </div>
            <p>
              From immersive high-speed FPV dives to stabilized luxury real estate
              and wedding coverage.
            </p>
          </div>

          <div className="services-grid-cards">
            {services.map((service) => (
              <article key={service.number} className="service-card">
                <div className="service-card-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="service-num">{service.tag}</span>
                </div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button
                    type="button"
                    className="service-card-btn"
                    onClick={() => handleSelectService(service.title)}
                  >
                    Select Service & Choose Package <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PRICING & PACKAGES */}
        <section id="pricing" className="pricing-section">
          <div className="section-head">
            <div>
              <span className="section-label">03 / RENTAL & SHOOTING CHARGES</span>
              <h2>TRANSPARENT PACKAGES.</h2>
            </div>
            <p>
              {selectedService ? (
                <span>
                  Selected Service: <strong style={{ color: "var(--accent)" }}>{selectedService}</strong>. Now choose your shooting duration below:
                </span>
              ) : (
                "Professional drone shooting packages with skilled pilot and 4K gear included."
              )}
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`price-card ${pkg.featured ? "featured" : ""}`}
              >
                {pkg.badge && <span className="price-badge">{pkg.badge}</span>}

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
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.formValue)}
                  className={`button ${pkg.featured ? "primary" : "ghost"}`}
                >
                  Choose {pkg.name} <span>↗</span>
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-footnote">
            <p>
              * Pricing may vary depending on location, shoot requirements,
              travel, and project duration.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="why-us">
          <div className="section-head">
            <div>
              <span className="section-label">04 / WHY CHOOSE US?</span>
              <h2>BUILT FOR PERFECTION.</h2>
            </div>
            <p>
              Combining cutting-edge drone hardware with certified pilot skill to
              deliver unforgettable aerial imagery.
            </p>
          </div>

          <div className="why-grid">
            {whyChooseUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="why-card">
                  <div className="why-icon-box">
                    <IconComp size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SELECTED WORK / PORTFOLIO */}
        <section id="work" className="work">
          <div className="section-head">
            <div>
              <span className="section-label">05 / SELECTED WORK & SHOOT FOOTAGE</span>
              <h2>FROM ABOVE.</h2>
            </div>
            <p>
              Cinematic visual captures and embedded 4K drone footage from our
              recent FPV expeditions and client shoots.
            </p>
          </div>

          <div className="gallery">
            {portfolio.map((item) => {
              const isPlayingInline = inlinePlayingId === item.id;

              return (
                <article
                  key={item.id}
                  className={"shot " + (item.wide ? "shot-wide" : "")}
                >
                  <div className="visual">
                    {isPlayingInline ? (
                      <div className="video-embed-container">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="video-iframe"
                        />
                        <button
                          type="button"
                          className="close-inline-video-btn"
                          onClick={() => setInlinePlayingId(null)}
                          title="Close video player"
                        >
                          <X size={14} /> Close Video
                        </button>
                      </div>
                    ) : (
                      <>
                        <img
                          src={`https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
                          }}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <span>{item.category}</span>

                        <div
                          className="video-play-overlay"
                          onClick={() => setInlinePlayingId(item.id)}
                        >
                          <button
                            type="button"
                            className="clean-play-circle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInlinePlayingId(item.id);
                            }}
                            title="Play Shoot"
                            aria-label={`Play shoot: ${item.title}`}
                          >
                            <Play size={24} fill="currentColor" />
                          </button>
                        </div>
                        <span className="video-hd-tag">4K SHOOT</span>
                      </>
                    )}
                  </div>

                  <div className="shot-info">
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </div>

                    <button
                      type="button"
                      className="shot-action-btn"
                      onClick={() =>
                        isPlayingInline
                          ? setInlinePlayingId(null)
                          : setInlinePlayingId(item.id)
                      }
                    >
                      {isPlayingInline ? "Close Player" : "Watch Footage ↗"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="booking">
          <div className="booking-copy">
            <span className="section-label">06 / LET&apos;S FLY</span>

            <h2>
              READY TO
              <br />
              <span>TAKE OFF?</span>
            </h2>

            <p>
              Tell us what you&apos;re planning. We&apos;ll continue the
              conversation on WhatsApp and confirm pilot availability for your
              preferred date and package.
            </p>

            <div className="contact-note">
              <span>FAST RESPONSE</span>
              <strong>Direct WhatsApp Booking</strong>
            </div>
          </div>

          <form
            id="bookingForm"
            className="booking-form"
            onSubmit={handleBooking}
          >
            {(selectedService || selectedPackage) && (
              <div className="selected-badges-row">
                {selectedService && (
                  <div className="selected-package-badge">
                    <span>
                      Shoot Type: <strong>{selectedService}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedService("")}
                      className="clear-package-btn"
                      title="Clear service selection"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {selectedPackage && (
                  <div className="selected-package-badge">
                    <span>
                      Selected Package: <strong>{selectedPackage}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage("")}
                      className="clear-package-btn"
                      title="Clear package selection"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            <label htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
              />
            </label>

            <label htmlFor="service">
              What are we shooting?
              <select
                id="service"
                name="service"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="packageChoice">
              Package
              <select
                id="packageChoice"
                name="packageChoice"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select a package (Optional)</option>
                {pricingPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.formValue}>
                    {pkg.formValue}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="location">
              Location
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="City / location (e.g., Chennai, Coimbatore, Madurai)"
              />
            </label>

            <label htmlFor="date">
              Preferred Date
              <input id="date" name="date" type="date" />
            </label>

            <label htmlFor="message">
              Shoot Details & Requirements
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about the venue, timeline, style, or specific angles..."
              ></textarea>
            </label>

            <button className="button primary submit" type="submit">
              Continue on WhatsApp <span>↗</span>
            </button>

            <small className="form-note">
              Your WhatsApp app will open with your booking inquiry pre-filled.
            </small>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-top">
          {/* Col 1: Brand & Studio */}
          <div className="footer-col brand-col">
            <div className="brand">
              <span className="brand-mark">⌁</span> falconvision.fpv
            </div>
            <p className="footer-desc">
              Professional DJI Avata 360 & cinematic FPV drone videography services. Delivering broadcast-quality 4K/8K aerial visuals for films, luxury real estate, weddings, and commercial campaigns.
            </p>
            <div className="footer-live-status">
              <span className="status-ping"></span>
              <span>Available for shoots across India & destination locations</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <span className="footer-heading">NAVIGATION</span>
            <ul className="footer-links">
              <li><a href="#intro">01 / The Approach</a></li>
              <li><a href="#services">02 / Flight Services</a></li>
              <li><a href="#pricing">03 / Pricing & Packages</a></li>
              <li><a href="#why-us">04 / Why Choose Us</a></li>
              <li><a href="#work">05 / Selected Work & 4K</a></li>
              <li><a href="#booking">06 / Book a Shoot</a></li>
            </ul>
          </div>

          {/* Col 3: Services & Capabilities */}
          <div className="footer-col">
            <span className="footer-heading">CAPABILITIES</span>
            <ul className="footer-links">
              <li><span>FPV Indoor Fly-Throughs</span></li>
              <li><span>High-Speed Action & Chase</span></li>
              <li><span>Architectural & Real Estate</span></li>
              <li><span>Cinematic Weddings & Events</span></li>
              <li><span>360° VR Aerial Panoramas</span></li>
              <li><span>Commercial & Brand Ads</span></li>
            </ul>
          </div>

          {/* Col 4: Hardware & Tech Specs */}
          <div className="footer-col">
            <span className="footer-heading">FLEET & SPECS</span>
            <ul className="footer-links fleet-specs">
              <li><Camera size={13} /> <span>DJI Avata 360 & FPV Whoop</span></li>
              <li><Radio size={13} /> <span>DJI Goggles 2 + O3+ Transmission</span></li>
              <li><Sparkles size={13} /> <span>8K 60FPS / RockSteady HDR</span></li>
              <li><Zap size={13} /> <span>10-Bit D-Cinelike Color Space</span></li>
              <li><Shield size={13} /> <span>DGCA Compliant Operations</span></li>
            </ul>
          </div>

          {/* Col 5: Contact & Operations */}
          <div className="footer-col contact-col">
            <span className="footer-heading">DIRECT CONTACT</span>
            <div className="footer-contact-items">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi FalconVision, I'd like to inquire about drone shooting services.")}`}
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
                <Clock size={14} />
                <span>24–48h RAW Footages Delivery</span>
              </div>

              <div className="footer-info-row">
                <MapPin size={14} />
                <span>HQ: Coimbatore / Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© {new Date().getFullYear()} falconvision.fpv. All rights reserved.</span>
            <span className="footer-divider">·</span>
            <span>Certified Commercial FPV Pilot</span>
            <span className="footer-divider">·</span>
            <span>Safety First Aviation Standard</span>
          </div>

          <a href="#top" className="footer-back-to-top">
            Back to top <span>↑</span>
          </a>
        </div>
      </footer>
      {/* THEATER VIDEO MODAL */}
      {theaterVideo && (
        <div
          className="theater-modal-backdrop"
          onClick={() => setTheaterVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="theater-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="theater-modal-header">
              <div>
                <span className="theater-badge">{theaterVideo.category}</span>
                <h3>{theaterVideo.title}</h3>
                <small>{theaterVideo.subtitle}</small>
              </div>

              <div className="theater-header-actions">
                <a
                  href={`https://www.youtube.com/watch?v=${theaterVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-youtube-link"
                  title="Open on YouTube"
                >
                  <ExternalLink size={15} /> Open on YouTube
                </a>

                <button
                  type="button"
                  className="close-theater-btn"
                  onClick={() => setTheaterVideo(null)}
                  title="Close theater (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="theater-video-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${theaterVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={theaterVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="theater-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
