"use client";

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: "dark" | "light"; // dark = for dark backgrounds, light = for light backgrounds
}

export default function Logo({ size = 40, showText = true, variant = "dark" }: LogoProps) {
  const iconColor = variant === "dark" ? "#4ECDC4" : "#0099FF";
  const accentColor = variant === "dark" ? "#4ECDC4" : "#0066CC";
  const textColor = variant === "dark" ? "#ffffff" : "#003366";
  const aiColor = variant === "dark" ? "#4ECDC4" : "#0099FF";
  const bracketColor = variant === "dark" ? "#4ECDC4" : "#0099FF";
  const circuitColor = variant === "dark" ? "rgba(78,205,196,0.8)" : "rgba(0,153,255,0.8)";
  const nodeColor = variant === "dark" ? "#ffffff" : "#0099FF";
  const orbitColor = variant === "dark" ? "rgba(78,205,196,0.4)" : "rgba(0,153,255,0.3)";

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon — Human head profile with AI brain circuit */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbit ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="38"
          stroke={orbitColor}
          strokeWidth="2"
          fill="none"
          transform="rotate(-15 50 50)"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="20"
          stroke={orbitColor}
          strokeWidth="1.5"
          fill="none"
          transform="rotate(-15 50 50)"
        />

        {/* Head silhouette — facing left (profile) */}
        <path
          d="M 65 22
             C 52 18, 38 22, 30 32
             C 22 42, 20 54, 24 65
             C 27 73, 33 78, 38 80
             L 38 88
             L 62 88
             L 62 70
             C 68 66, 72 60, 74 52
             C 76 42, 74 30, 65 22 Z"
          fill={`${iconColor}20`}
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Neural network nodes inside head */}
        <circle cx="45" cy="38" r="2.5" fill={nodeColor} />
        <circle cx="55" cy="35" r="2.5" fill={nodeColor} />
        <circle cx="60" cy="44" r="2" fill={nodeColor} />
        <circle cx="42" cy="48" r="2" fill={nodeColor} />
        <circle cx="52" cy="50" r="2.5" fill={nodeColor} />
        <circle cx="58" cy="56" r="2" fill={nodeColor} />
        <circle cx="45" cy="58" r="2" fill={nodeColor} />

        {/* Neural connections */}
        <line x1="45" y1="38" x2="55" y2="35" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="55" y1="35" x2="60" y2="44" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="45" y1="38" x2="42" y2="48" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="42" y1="48" x2="52" y2="50" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="52" y1="50" x2="58" y2="56" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="52" y1="50" x2="45" y2="58" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="45" y1="38" x2="52" y2="50" stroke={circuitColor} strokeWidth="1.2" />
        <line x1="60" y1="44" x2="52" y2="50" stroke={circuitColor} strokeWidth="1.2" />

        {/* Circuit lines emanating */}
        <line x1="28" y1="40" x2="20" y2="38" stroke={circuitColor} strokeWidth="1.5" />
        <circle cx="19" cy="38" r="1.5" fill={accentColor} />
        <line x1="26" y1="52" x2="18" y2="52" stroke={circuitColor} strokeWidth="1.5" />
        <circle cx="17" cy="52" r="1.5" fill={accentColor} />
        <line x1="28" y1="63" x2="20" y2="65" stroke={circuitColor} strokeWidth="1.5" />
        <circle cx="19" cy="65" r="1.5" fill={accentColor} />
      </svg>

      {/* Text — < ParulSoftTechAI /> */}
      {showText && (
        <span
          className="font-bold tracking-tight whitespace-nowrap"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: `${size * 0.4}px`,
            lineHeight: 1,
          }}
        >
          <span style={{ color: bracketColor }}>{"<"}</span>{" "}
          <span style={{ color: textColor }}>ParulSoftTech</span>
          <span style={{ color: aiColor }}>AI</span>{" "}
          <span style={{ color: bracketColor }}>{"/>"}</span>
        </span>
      )}
    </div>
  );
}
