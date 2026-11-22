"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Car, Navigation, Star } from "lucide-react";

const LOCATION_PINS = [
  { name: "🐴 Horse Riding", time: "5–10 min", x: 0.28, y: 0.42, color: "#D97736", desc: "Pine Forest Trails" },
  { name: "🌲 Lower Topa", time: "10–12 min", x: 0.62, y: 0.30, color: "#1B3B30", desc: "Pine Reserve" },
  { name: "☕ McDonald's & Café", time: "12–18 min", x: 0.72, y: 0.62, color: "#5C4033", desc: "Lower Topa" },
  { name: "🚡 Patriata Chairlift", time: "15–20 min", x: 0.82, y: 0.32, color: "#0F241D", desc: "New Murree" },
  { name: "🛍️ Mall Road", time: "15–18 min", x: 0.76, y: 0.68, color: "#D97736", desc: "Murree Bazaar" },
  { name: "🏨 Bhurban", time: "10–15 min", x: 0.5, y: 0.22, color: "#1B3B30", desc: "PC Hotel Views" },
];

const NEARBY_LIST = [
  { emoji: "🌲", name: "Pine Forest Trails", time: "2 min walk", type: "walk" },
  { emoji: "🐴", name: "Horse Riding", time: "5–10 min", type: "drive" },
  { emoji: "⛰️", name: "Valley Viewpoints", time: "5–8 min", type: "drive" },
  { emoji: "🌲", name: "Lower Topa Reserve", time: "10–12 min", type: "drive" },
  { emoji: "🏨", name: "Bhurban Plateau", time: "10–15 min", type: "drive" },
  { emoji: "☕", name: "Gloria Jean's & McDonald's", time: "12–18 min", type: "drive" },
  { emoji: "🛍️", name: "Mall Road, Murree", time: "15–18 min", type: "drive" },
  { emoji: "🚡", name: "Patriata Chairlift", time: "15–20 min", type: "drive" },
];

function TerrainCanvas() {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#0d1f18] via-[#0F241D] to-[#0a1a14] rounded-2xl overflow-hidden" style={{ maxWidth: "100%" }}>
      {/* Animated gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3B30]/30 via-transparent to-[#0F241D]/50" />

      <svg
        viewBox="0 0 800 420"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1a14" />
            <stop offset="40%" stopColor="#0F241D" />
            <stop offset="100%" stopColor="#1B3B30" />
          </linearGradient>
          {/* Mountain fill */}
          <linearGradient id="mtGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d6b45" />
            <stop offset="60%" stopColor="#1B3B30" />
            <stop offset="100%" stopColor="#0F241D" />
          </linearGradient>
          <linearGradient id="mtGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f4d33" />
            <stop offset="100%" stopColor="#0F241D" />
          </linearGradient>
          <linearGradient id="mtGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#143324" />
            <stop offset="100%" stopColor="#0a1a14" />
          </linearGradient>
          {/* Glow effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Mist gradient */}
          <linearGradient id="mistGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F6F3EC" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#F6F3EC" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#F6F3EC" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Sky background */}
        <rect width="800" height="420" fill="url(#skyGrad)" />

        {/* Stars */}
        {[
          [80, 35], [140, 20], [220, 55], [300, 25], [390, 45], [480, 15],
          [560, 60], [640, 30], [720, 50], [770, 25], [160, 75], [340, 70],
          [520, 40], [680, 70], [420, 85], [260, 90], [110, 55],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? "1.8" : "1.2"} fill="white" opacity={0.5 + (i % 4) * 0.1}>
            {i % 5 === 0 && (
              <animate attributeName="opacity" values={`${0.3 + (i % 4) * 0.1};0.9;${0.3 + (i % 4) * 0.1}`} dur={`${2 + i % 3}s`} repeatCount="indefinite" />
            )}
          </circle>
        ))}

        {/* Far background mountains */}
        <path
          d="M0,310 L60,200 L120,230 L180,165 L250,195 L320,140 L390,170 L450,120 L520,155 L580,105 L650,135 L720,90 L800,125 L800,420 L0,420 Z"
          fill="url(#mtGrad1)"
          opacity="0.4"
        />

        {/* Snow caps on far peaks */}
        <path d="M180,165 L195,145 L210,165 Z" fill="white" opacity="0.15" />
        <path d="M450,120 L465,100 L478,120 Z" fill="white" opacity="0.12" />
        <path d="M580,105 L596,85 L610,105 Z" fill="white" opacity="0.15" />
        <path d="M720,90 L736,68 L750,90 Z" fill="white" opacity="0.12" />

        {/* Mid mountains */}
        <path
          d="M0,355 L80,255 L150,285 L220,215 L300,255 L380,195 L440,230 L510,180 L580,215 L650,172 L720,205 L800,170 L800,420 L0,420 Z"
          fill="url(#mtGrad2)"
          opacity="0.65"
        />

        {/* Mist layer */}
        <rect x="0" y="250" width="800" height="40" fill="url(#mistGrad)" />
        <rect x="0" y="290" width="800" height="30" fill="url(#mistGrad)" opacity="0.5" />

        {/* Foreground terrain — our area */}
        <path
          d="M0,390 L50,330 L100,355 L160,315 L230,340 L300,295 L370,320 L430,280 L500,308 L570,268 L640,295 L710,265 L780,282 L800,270 L800,420 L0,420 Z"
          fill="url(#mtGrad3)"
        />

        {/* Pine trees silhouette — foreground */}
        {[30, 75, 115, 165, 215, 270, 330, 395, 455, 515, 575, 635, 695, 755].map((x, i) => {
          const baseY = 300 + (i % 4) * 12;
          const h = 35 + (i % 3) * 10;
          return (
            <g key={i} transform={`translate(${x}, ${baseY})`}>
              <polygon points={`0,${-h} ${h * 0.4},0 ${-h * 0.4},0`} fill="#0a1a14" opacity="0.9" />
              <polygon points={`0,${-h * 1.3} ${h * 0.5},${-h * 0.2} ${-h * 0.5},${-h * 0.2}`} fill="#0d2018" opacity="0.8" />
              <rect x={-3} y={0} width={6} height={10} fill="#0a1a14" />
            </g>
          );
        })}

        {/* Road/path */}
        <path
          d="M200,380 Q300,340 400,310 Q500,280 600,290 Q700,295 780,285"
          stroke="#D97736"
          strokeWidth="2"
          strokeDasharray="8,5"
          fill="none"
          opacity="0.4"
        />

        {/* YOUR FLAT — glowing center pin */}
        <g transform="translate(400, 290)" filter="url(#glow)">
          <circle cx="0" cy="0" r="20" fill="#D97736" opacity="0.15">
            <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="12" fill="#D97736" opacity="0.3">
            <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
          </circle>
          <circle cx="0" cy="0" r="9" fill="#D97736" />
          <circle cx="0" cy="0" r="4.5" fill="white" />
          <text x="14" y="5" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">Your Flat</text>
        </g>

        {/* Location Pins */}
        {LOCATION_PINS.map((pin, i) => {
          const svgX = pin.x * 800;
          const svgY = pin.y * 300 + 50;
          return (
            <g key={i} transform={`translate(${svgX}, ${svgY})`} filter="url(#softGlow)" style={{ cursor: "pointer" }}>
              {/* Pulse ring */}
              <circle cx="0" cy="0" r="14" fill={pin.color} opacity="0.2">
                <animate attributeName="r" values="10;18;10" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="8" fill={pin.color} opacity="0.95" />
              <circle cx="0" cy="0" r="4" fill="white" />
            </g>
          );
        })}
      </svg>

      {/* Pin Labels Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {LOCATION_PINS.map((pin, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${pin.x * 100}%`,
              top: `${((pin.y * 300 + 50) / 420) * 100}%`,
              transform: "translate(-50%, calc(-100% - 14px))",
            }}
          >
            <div
              className="text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg"
              style={{ backgroundColor: pin.color }}
            >
              {pin.name}
              <span className="ml-1.5 opacity-70">· {pin.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Compass */}
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/20">
        <Navigation className="w-4 h-4 text-white/70" />
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-4 left-4 text-white/30 text-xs font-mono">
        33.89°N · 73.40°E
      </div>
    </div>
  );
}

export default function LocationExplorer() {
  return (
    <section id="location" className="py-20 bg-pine-forest overflow-x-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-terracotta text-xs font-bold tracking-widest uppercase mb-3 bg-terracotta/10 px-4 py-1.5 rounded-full">
            Musyari, Murree
          </span>
          <h2 className="font-fraunces text-4xl sm:text-5xl text-warm-sand font-bold mb-4">
            Perfectly Located
          </h2>
          <p className="text-warm-sand/60 text-base sm:text-lg max-w-2xl mx-auto">
            Tucked in the pine hills of Musyari — peaceful enough to feel wild, close enough to reach everything iconic about Murree.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Terrain Map */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden h-80 sm:h-96 md:h-[480px] border border-white/10 shadow-2xl">
              <TerrainCanvas />
            </div>

            {/* Map Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=33.89,73.40"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-terracotta hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                Open Exact Pin in Google Maps
              </a>
              <a
                href="https://www.google.com/maps/dir//Musyari,+Murree"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-warm-sand border border-white/20 px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <Car className="w-4 h-4" />
                Get Directions
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "From Islamabad", value: "65 km", icon: "🏙️" },
                { label: "Altitude", value: "~2,300m", icon: "⛰️" },
                { label: "To Mall Road", value: "15 min", icon: "🛍️" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-2xl px-3 py-3 text-center border border-white/10">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-warm-sand font-bold text-sm">{stat.value}</div>
                  <div className="text-warm-sand/40 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Distance Cards Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-terracotta fill-terracotta" />
              <h3 className="text-warm-sand font-fraunces text-xl font-bold">
                What's Nearby
              </h3>
            </div>
            {NEARBY_LIST.map((place) => (
              <div
                key={place.name}
                className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-3 transition-colors border border-white/5 hover:border-white/10 group"
              >
                <span className="text-xl flex-shrink-0">{place.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-warm-sand text-sm font-semibold truncate">{place.name}</div>
                  <div className="text-warm-sand/40 text-xs flex items-center gap-1 mt-0.5">
                    {place.type === "walk"
                      ? <span>🚶 {place.time}</span>
                      : <><Car className="w-3 h-3" />{place.time} drive</>
                    }
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-warm-sand/20 group-hover:text-terracotta/60 transition-colors flex-shrink-0" />
              </div>
            ))}

            {/* WhatsApp direction help */}
            <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-400 text-xs font-semibold mb-1">📍 Need Directions?</p>
              <p className="text-warm-sand/60 text-xs">
                WhatsApp Mukhtar Abbasi — he'll send you the exact pin and guide you in.
              </p>
              <a
                href="https://wa.me/923005183007?text=Hi%20Mukhtar%20bhai!%20Can%20you%20send%20me%20the%20exact%20location%20pin%20for%20Fairy%20Meadows%20Project%20in%20Musyari%20Murree%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-green-400 hover:text-green-300 text-xs font-bold transition-colors"
              >
                💬 Send me the pin →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
