import { useState, useEffect, useRef } from "react";
import { RotateCw, Compass, ShieldCheck } from "lucide-react";

export default function IntroDroneModel() {
  const [rotateY, setRotateY] = useState(15);
  const [rotateX, setRotateX] = useState(-8);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [isSpinningFast, setIsSpinningFast] = useState(false);
  const cardRef = useRef(null);
  const autoAngleRef = useRef(15);

  // Smooth auto-rotation loop when enabled and not actively dragging/hovering
  useEffect(() => {
    let animationFrame;
    if (isRotating && !isHovered) {
      const loop = () => {
        autoAngleRef.current = (autoAngleRef.current + 0.6) % 360;
        setRotateY(autoAngleRef.current);
        setRotateX(Math.sin((autoAngleRef.current * Math.PI) / 90) * 8);
        animationFrame = requestAnimationFrame(loop);
      };
      animationFrame = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isRotating, isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateY((x / (rect.width / 2)) * 32);
    setRotateX(-(y / (rect.height / 2)) * 24);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isRotating) {
      setRotateY(15);
      setRotateX(-8);
    }
  };

  const handleTriggerBoost = () => {
    setIsSpinningFast(true);
    setTimeout(() => {
      setIsSpinningFast(false);
    }, 1800);
  };

  return (
    <div
      ref={cardRef}
      className="intro-drone-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* HUD Telemetry Overlay */}
      <div className="intro-drone-hud">
        <div className="intro-hud-header">
          <span className="intro-hud-tag">
            <span className="hud-status-dot"></span>
            DJI AVATA 360 · 3D
          </span>
          <span className="intro-hud-mode">FPV READY</span>
        </div>

        <div className="intro-hud-specs">
          <span>ALT: 45M</span>
          <span>SPEED: 92KM/H</span>
        </div>
      </div>

      {/* 3D DRONE STAGE */}
      <div
        className="intro-drone-stage"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isSpinningFast ? "translateY(-18px) scale(1.05)" : "translateY(0)"
          }`,
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.4s ease-out",
        }}
      >
        {/* Ground Radial Shadow */}
        <div className="intro-drone-shadow"></div>

        {/* DRONE SVG 3D MODEL */}
        <svg
          viewBox="0 0 500 400"
          className="intro-drone-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ducted Guard Gradients */}
            <radialGradient
              id="guardGrad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="40%"
              fy="40%"
            >
              <stop offset="0%" stopColor="#252b28" />
              <stop offset="70%" stopColor="#121514" />
              <stop offset="100%" stopColor="#080a09" />
            </radialGradient>

            <linearGradient id="carbonArm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a302d" />
              <stop offset="50%" stopColor="#171a19" />
              <stop offset="100%" stopColor="#0b0d0c" />
            </linearGradient>

            <linearGradient id="canopyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#3d4642" />
              <stop offset="35%" stopColor="#1f2422" />
              <stop offset="85%" stopColor="#0d100f" />
              <stop offset="100%" stopColor="#181c1a" />
            </linearGradient>

            <linearGradient id="accentVolt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d8ff55" />
              <stop offset="100%" stopColor="#9be522" />
            </linearGradient>

            <radialGradient id="lensReflect" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#64ffda" />
              <stop offset="40%" stopColor="#0a84ff" />
              <stop offset="85%" stopColor="#041226" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND PROP GUARDS */}
          {/* Top-Left Guard */}
          <g transform="translate(130, 110)">
            <ellipse
              cx="0"
              cy="0"
              rx="68"
              ry="54"
              fill="url(#guardGrad)"
              stroke="#2c3430"
              strokeWidth="5"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="54"
              ry="42"
              fill="#0b0e0d"
              stroke="rgba(216,255,85,0.2)"
              strokeWidth="1.5"
            />
            {/* Spinning Rotor Blades */}
            <g
              className={isSpinningFast ? "intro-spin-turbo" : "intro-spin-cw"}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="48"
                ry="7"
                fill="rgba(216,255,85,0.35)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="7"
                ry="48"
                fill="rgba(255,255,255,0.25)"
              />
              <circle cx="0" cy="0" r="10" fill="#121514" stroke="#d8ff55" strokeWidth="2" />
            </g>
          </g>

          {/* Top-Right Guard */}
          <g transform="translate(370, 110)">
            <ellipse
              cx="0"
              cy="0"
              rx="68"
              ry="54"
              fill="url(#guardGrad)"
              stroke="#2c3430"
              strokeWidth="5"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="54"
              ry="42"
              fill="#0b0e0d"
              stroke="rgba(216,255,85,0.2)"
              strokeWidth="1.5"
            />
            {/* Spinning Rotor Blades */}
            <g
              className={isSpinningFast ? "intro-spin-turbo" : "intro-spin-ccw"}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="48"
                ry="7"
                fill="rgba(216,255,85,0.35)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="7"
                ry="48"
                fill="rgba(255,255,255,0.25)"
              />
              <circle cx="0" cy="0" r="10" fill="#121514" stroke="#d8ff55" strokeWidth="2" />
            </g>
          </g>

          {/* STRUCTURAL FRAME ARMS */}
          <path
            d="M 170 140 L 250 190 L 330 140 L 340 230 L 250 250 L 160 230 Z"
            fill="url(#carbonArm)"
            stroke="#1c2220"
            strokeWidth="3"
          />

          {/* FOREGROUND PROP GUARDS */}
          {/* Bottom-Left Guard */}
          <g transform="translate(140, 240)">
            <ellipse
              cx="0"
              cy="0"
              rx="76"
              ry="60"
              fill="url(#guardGrad)"
              stroke="#343d38"
              strokeWidth="6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="60"
              ry="46"
              fill="#080a09"
              stroke="rgba(216,255,85,0.4)"
              strokeWidth="2"
            />
            {/* LED Status Light */}
            <circle cx="-62" cy="0" r="4" fill="#00ff66" filter="url(#softGlow)" />
            {/* Spinning Propellers */}
            <g
              className={isSpinningFast ? "intro-spin-turbo" : "intro-spin-ccw"}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="54"
                ry="9"
                fill="rgba(216,255,85,0.55)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="9"
                ry="54"
                fill="rgba(255,255,255,0.35)"
              />
              <circle cx="0" cy="0" r="12" fill="#181c1a" stroke="#d8ff55" strokeWidth="2.5" />
            </g>
          </g>

          {/* Bottom-Right Guard */}
          <g transform="translate(360, 240)">
            <ellipse
              cx="0"
              cy="0"
              rx="76"
              ry="60"
              fill="url(#guardGrad)"
              stroke="#343d38"
              strokeWidth="6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="60"
              ry="46"
              fill="#080a09"
              stroke="rgba(216,255,85,0.4)"
              strokeWidth="2"
            />
            {/* LED Status Light */}
            <circle cx="62" cy="0" r="4" fill="#ff3344" filter="url(#softGlow)" />
            {/* Spinning Propellers */}
            <g
              className={isSpinningFast ? "intro-spin-turbo" : "intro-spin-cw"}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="54"
                ry="9"
                fill="rgba(216,255,85,0.55)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="9"
                ry="54"
                fill="rgba(255,255,255,0.35)"
              />
              <circle cx="0" cy="0" r="12" fill="#181c1a" stroke="#d8ff55" strokeWidth="2.5" />
            </g>
          </g>

          {/* CENTER FUSELAGE & BATTERY PACK */}
          {/* Main Body Shell */}
          <path
            d="M 215 130 Q 250 110 285 130 L 305 220 Q 250 270 195 220 Z"
            fill="url(#canopyGrad)"
            stroke="#414c47"
            strokeWidth="3.5"
          />

          {/* Aerodynamic Cockpit Ridges */}
          <path
            d="M 230 145 Q 250 135 270 145 L 285 205 Q 250 235 215 205 Z"
            fill="#121614"
            stroke="rgba(216,255,85,0.35)"
            strokeWidth="1.5"
          />

          {/* Accent Racing Stripe */}
          <path
            d="M 246 138 L 254 138 L 254 228 L 246 228 Z"
            fill="url(#accentVolt)"
          />

          {/* Top GPS Antenna Dome & Cooling Vents */}
          <ellipse cx="250" cy="165" rx="14" ry="8" fill="#1f2523" stroke="#505e58" strokeWidth="1" />
          <line x1="238" y1="185" x2="262" y2="185" stroke="#2c3632" strokeWidth="2" />
          <line x1="240" y1="192" x2="260" y2="192" stroke="#2c3632" strokeWidth="2" />

          {/* 3-AXIS GIMBAL & 4K ULTRA-WIDE LENS (FRONT FACING) */}
          <g transform="translate(250, 245)">
            {/* Gimbal Bracket */}
            <rect x="-18" y="-10" width="36" height="24" rx="6" fill="#1a201e" stroke="#5b6c65" strokeWidth="2" />
            {/* Lens Outer Bezel */}
            <circle cx="0" cy="2" r="16" fill="#080a09" stroke="#d8ff55" strokeWidth="2" />
            {/* Deep Glass Sensor Reflections */}
            <circle cx="0" cy="2" r="12" fill="url(#lensReflect)" />
            {/* Optical Highlight Glint */}
            <ellipse cx="-4" cy="-2" rx="3.5" ry="2" fill="#ffffff" opacity="0.85" />
            <circle cx="4" cy="5" r="1.5" fill="#64ffda" opacity="0.75" />
          </g>

          {/* Front Tally Indicator Beacon */}
          <circle cx="250" cy="272" r="3" fill="#ff3344" className="intro-beacon-blink" />
        </svg>
      </div>

      {/* INTERACTIVE CONTROLS BOTTOM BAR */}
      <div className="intro-drone-controls">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`intro-ctrl-btn ${isRotating ? "active" : ""}`}
          title="Toggle 360 Auto-Rotate"
        >
          <RotateCw size={13} className={isRotating ? "spin-icon" : ""} />
          <span>{isRotating ? "360° AUTO ROTATE" : "ROTATE PAUSED"}</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerBoost}
          disabled={isSpinningFast}
          className="intro-ctrl-btn boost-btn"
          title="Boost FPV Throttle"
        >
          <Compass size={13} />
          <span>{isSpinningFast ? "THROTTLE ACTIVE" : "BOOST THROTTLE"}</span>
        </button>
      </div>

      {/* Sub-label */}
      <div className="intro-model-footer">
        <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
        <span>Hover or drag cursor to inspect 3D flight angles</span>
      </div>
    </div>
  );
}
