import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import WhyUs from "./components/WhyUs";
import Work from "./components/Work";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  // Theme: persisted, applied to <html data-theme>
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("falconvision_theme") || "dark";
    }
    return "dark";
  });

  // Shared booking state: service + package selections persist into the form
  const [selectedService, setSelectedService] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  // Portfolio playback state
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

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPackage = (pkgFormValue) => {
    setSelectedPackage(pkgFormValue);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#booking">
        Skip to booking
      </a>

      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      <main id="top">
        <Hero />
        <Intro />
        <Services onSelectService={handleSelectService} />
        <Pricing selectedService={selectedService} onSelectPackage={handleSelectPackage} />
        <WhyUs />
        <Work
          inlinePlayingId={inlinePlayingId}
          setInlinePlayingId={setInlinePlayingId}
          theaterVideo={theaterVideo}
          setTheaterVideo={setTheaterVideo}
        />
        <Booking
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      </main>

      <Footer />
    </>
  );
}
