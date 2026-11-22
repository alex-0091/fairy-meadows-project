"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MessageCircle, Search, Star } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

export default function HeroSection() {
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleSearch = () => {
    document.getElementById("flats")?.scrollIntoView({ behavior: "smooth" });
  };

  const heroWhatsApp = getWhatsAppUrl(
    `Assalam o Alaikum Mukhtar bhai! I saw the Fairy Meadows Project listing and I'm interested in ${mode === "buy" ? "buying" : "renting"} a flat in Murree. Can you please share more details?`
  );

  return (
    <section className="hero-video-container min-h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/media/flats/flat3-a.jpg"
      >
        <source src="/media/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay — deep pine bottom-up */}
      <div className="absolute inset-0 mountain-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-pine-forest/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center pt-16 pb-8">
        {/* Company Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4">
          <Star className="w-3 h-3 text-terracotta fill-terracotta" />
          <span className="text-white/90 text-xs font-semibold tracking-wide">
            Multi Stars · M&amp;E Corporation · Musyari, Murree
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-fraunces text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight max-w-4xl mb-3">
          Fairy Meadows{" "}
          <span className="text-terracotta italic">Project</span>
          <br />
          <span className="text-2xl sm:text-4xl md:text-5xl">Live Above the Clouds in Murree</span>
        </h1>

        <p className="text-warm-sand/80 text-sm sm:text-lg max-w-2xl mb-6 font-jakarta leading-relaxed px-2">
          Exclusive 1+1 &amp; 2+1 pine-forest flats with valley views, full amenities,
          and your own mountain balcony — just 65 km from Islamabad.
        </p>

        {/* Buy/Rent Toggle */}
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 mb-5 border border-white/20">
          <button
            onClick={() => setMode("buy")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              mode === "buy"
                ? "bg-terracotta text-white shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            🏠 Buy a Flat
          </button>
          <button
            onClick={() => setMode("rent")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              mode === "rent"
                ? "bg-terracotta text-white shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            🌙 Rent by Night
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden mb-5">
          <div className="flex items-center px-3 text-white/50">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={mode === "buy" ? "Search: 1+1, 2+1, pine view..." : "Dates, guests, budget..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/40 py-3.5 pr-2 outline-none text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-terracotta hover:bg-orange-600 text-white px-5 py-3.5 font-semibold text-sm transition-colors"
          >
            View
          </button>
        </div>

        {/* Price Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {mode === "buy" ? (
            <>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">Starting from</span>
                <span className="font-bold">PKR 12 Lac</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">Up to</span>
                <span className="font-bold">PKR 28 Lac</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">Layouts</span>
                <span className="font-bold">1+1 &amp; 2+1</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">From</span>
                <span className="font-bold">PKR 4,000/night</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">Up to</span>
                <span className="font-bold">PKR 8,500/night</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-sm">
                <span className="text-warm-sand/60 text-xs block">All flats</span>
                <span className="font-bold">Full Amenities</span>
              </div>
            </>
          )}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={heroWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-full text-base font-bold transition-all hover:scale-105 shadow-2xl active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat with Mukhtar Ahmed Abbasi →</span>
        </a>

        <p className="text-white/40 text-xs mt-3 font-jakarta">
          Head of Company · Multi Stars · +92 300 5183007
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </div>
    </section>
  );
}
