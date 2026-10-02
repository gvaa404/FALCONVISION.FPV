import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  LocateFixed,
} from "lucide-react";
import { services, pricingPackages, WHATSAPP_NUMBER } from "../data";
import Reveal from "./Reveal";



export default function Booking({
  selectedService,
  setSelectedService,
  selectedPackage,
  setSelectedPackage,
}) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const successRef = useRef(null);

  // Location auto-detect state
  const [geoStatus, setGeoStatus] = useState("idle"); // idle | locating | detected | error
  const [geoMessage, setGeoMessage] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const clearError = (field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  // ── Auto-detect location ────────────────────────────────────────────
  function detectLocation() {
    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
      setGeoMessage("Geolocation is not supported by this browser.");
      return;
    }
    setGeoStatus("locating");
    setGeoMessage("Getting your location…");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Free reverse geocoding (OpenStreetMap Nominatim) — no API key needed
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            { headers: { Accept: "application/json" } }
          );
          if (!res.ok) throw new Error("geocode failed");
          const data = await res.json();
          const a = data.address || {};
          const city =
            a.city ||
            a.town ||
            a.village ||
            a.county ||
            a.state_district ||
            a.state ||
            "";
          if (city) {
            setLocationValue(city + (a.state ? `, ${a.state}` : ""));
            setGeoStatus("detected");
            setGeoMessage("Location detected — edit it if needed.");
            clearError("location");
          } else {
            // Fall back to coordinates the pilot can interpret
            setLocationValue(
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            );
            setGeoStatus("detected");
            setGeoMessage("Detected via GPS coordinates — edit if needed.");
            clearError("location");
          }
        } catch {
          setGeoStatus("error");
          setGeoMessage("Couldn't look up the city name. Please type it.");
        }
      },
      (err) => {
        setGeoStatus("error");
        if (err.code === err.PERMISSION_DENIED) {
          setGeoMessage("Permission denied — please type your location.");
        } else {
          setGeoMessage("Couldn't get your location. Please type it.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  // ── WhatsApp handoff ────────────────────────────────────────────────
  function buildWhatsAppUrl(data) {
    const formattedDate = data.date
      ? new Date(data.date + "T00:00:00").toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not decided yet";

    const message =
      "Hi falconvision.fpv, I would like to book a drone shoot.\n\n" +
      `Name: ${data.name}\n` +
      `Phone / WhatsApp: ${data.phone || "Not provided"}\n` +
      `Email: ${data.email || "Not provided"}\n` +
      `Shoot Type: ${data.service}\n` +
      `Selected Package: ${data.packageChoice || "Not specified"}\n` +
      `Location: ${data.location}\n` +
      `Preferred Date: ${formattedDate}\n` +
      `Requirements: ${data.message || "None"}\n\n` +
      "Please confirm pilot availability and booking details.";

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (status !== "idle") return; // prevent duplicate submission

    const form = event.currentTarget;
    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value,
      packageChoice: form.packageChoice.value,
      location: form.location.value.trim(),
      date: form.date.value,
      message: form.message.value.trim(),
    };

    // Validate
    const nextErrors = {};
    if (data.name.length < 2) nextErrors.name = "Please enter your name.";
    if (!data.service) nextErrors.service = "Please select a shoot type.";
    if (data.location.length < 2)
      nextErrors.location = "Please enter the shoot location.";
    if (!data.phone && !data.email) {
      nextErrors.phone =
        "Add a phone/WhatsApp number or an email so we can reach you.";
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      form.elements[firstField]?.focus();
      return;
    }

    // Open WhatsApp, then show success state
    setStatus("sending");
    window.open(buildWhatsAppUrl(data), "_blank", "noopener,noreferrer");
    setTimeout(() => setStatus("sent"), 900);
  }

  const inputProps = (field) => ({
    "aria-invalid": errors[field] ? "true" : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onChange: () => clearError(field),
  });

  return (
    <section id="booking" className="booking">
      <Reveal className="booking-copy">
        <span className="section-label">06 / Let&apos;s Fly</span>

        <h2>
          READY TO
          <br />
          <span>TAKE OFF?</span>
        </h2>

        <p>
          Tell us what you&apos;re planning. We&apos;ll continue the conversation
          on WhatsApp and confirm pilot availability for your preferred date
          and package.
        </p>

        <div className="contact-note">
          <span>FAST RESPONSE</span>
          <strong>Direct WhatsApp Booking</strong>
          <small>
            Your inquiry arrives pre-filled — no account, no waiting.
          </small>
        </div>
      </Reveal>

      <Reveal className="booking-form-wrap" delay={80}>
        {status === "sent" ? (
          <div
            className="booking-success"
            ref={successRef}
            tabIndex={-1}
            role="status"
          >
            <CheckCircle2 size={40} />
            <h3>Request ready in WhatsApp</h3>
            <p>
              If WhatsApp didn&apos;t open automatically, check your pop-up
              blocker — or tap below to try again.
            </p>
            <button
              type="button"
              className="button primary"
              onClick={() =>
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Open WhatsApp Again <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              className="link-reset"
              onClick={() => setStatus("idle")}
            >
              Book another shoot
            </button>
          </div>
        ) : (
          <form
            id="bookingForm"
            className="booking-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {(selectedService || selectedPackage) && (
              <div className="selected-badges-row">
                {selectedService && (
                  <div className="selected-package-badge">
                    <span>
                      Shoot type: <strong>{selectedService}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedService("")}
                      className="clear-package-btn"
                      aria-label="Clear service selection"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {selectedPackage && (
                  <div className="selected-package-badge">
                    <span>
                      Package: <strong>{selectedPackage}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage("")}
                      className="clear-package-btn"
                      aria-label="Clear package selection"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="field">
              <label htmlFor="name">
                Name <span className="req" aria-hidden="true">*</span>
                <span className="opt">Required</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                {...inputProps("name")}
              />
              {errors.name && (
                <span className="field-error" id="name-error" role="alert">
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">
                  Phone / WhatsApp <span className="opt">Recommended</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  {...inputProps("phone")}
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <span className="field-error" id="phone-error" role="alert">
                    <AlertCircle size={12} /> {errors.phone}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">
                  Email <span className="opt">Optional</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...inputProps("email")}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="service">
                  What are we shooting?{" "}
                  <span className="req" aria-hidden="true">*</span>
                  <span className="opt">Required</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={selectedService}
                  aria-invalid={errors.service ? "true" : undefined}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    clearError("service");
                  }}
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
                {errors.service && (
                  <span className="field-error" id="service-error" role="alert">
                    <AlertCircle size={12} /> {errors.service}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="packageChoice">
                  Package <span className="opt">Optional</span>
                </label>
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
              </div>
            </div>

            <div className="field-row">
              <div className="field location-field">
                <label htmlFor="location">
                  Location <span className="req" aria-hidden="true">*</span>
                  <span className="opt">Required</span>
                </label>
                <div className="location-input-wrap">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="City / location (e.g., Coimbatore, Chennai)"
                    value={locationValue}
                    onChange={(e) => {
                      setLocationValue(e.target.value);
                      clearError("location");
                      setGeoStatus("idle");
                    }}
                    aria-invalid={errors.location ? "true" : undefined}
                    aria-describedby={
                      errors.location
                        ? "location-error"
                        : geoMessage
                        ? "location-status"
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    className="detect-location-btn"
                    onClick={detectLocation}
                    disabled={geoStatus === "locating"}
                    title="Detect my location automatically"
                    aria-label="Detect my location automatically"
                  >
                    {geoStatus === "locating" ? (
                      <Loader2 size={15} className="spin" />
                    ) : (
                      <LocateFixed size={15} />
                    )}
                    <span>
                      {geoStatus === "locating"
                        ? "Detecting…"
                        : geoStatus === "detected"
                        ? "Detected"
                        : "Auto-detect"}
                    </span>
                  </button>
                </div>
                {errors.location && (
                  <span className="field-error" id="location-error" role="alert">
                    <AlertCircle size={12} /> {errors.location}
                  </span>
                )}
                {geoMessage && !errors.location && (
                  <span
                    className={`location-status ${
                      geoStatus === "error" ? "is-error" : ""
                    }`}
                    id="location-status"
                    aria-live="polite"
                  >
                    <MapPin size={11} /> {geoMessage}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="date">
                  Preferred date <span className="opt">Optional</span>
                </label>
                <input id="date" name="date" type="date" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">
                Shoot details <span className="opt">Optional</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Venue, timeline, style, specific angles you want..."
              />
            </div>

            <button
              className="button primary submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={15} className="spin" /> Opening WhatsApp…
                </>
              ) : (
                <>
                  Continue on WhatsApp <ArrowUpRight size={15} />
                </>
              )}
            </button>

            <small className="form-note">
              Your WhatsApp app opens with the booking inquiry pre-filled.
              Required fields are marked *. Location detection uses your
              device GPS — nothing is stored.
            </small>
          </form>
        )}
      </Reveal>
    </section>
  );
}
