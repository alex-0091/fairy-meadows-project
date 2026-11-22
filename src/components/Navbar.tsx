"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-pine-forest/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 bg-terracotta rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-base font-fraunces">FM</span>
            </div>
            <div className="text-white min-w-0">
              <div className="font-fraunces font-bold text-sm md:text-base leading-tight truncate">
                Fairy Meadows Project
              </div>
              <div className="text-xs text-warm-sand/60 leading-tight hidden sm:block">
                Multi Stars · M&amp;E Corporation
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: "#flats", label: "Flats" },
              { href: "#location", label: "Location" },
              { href: "#activities", label: "Activities" },
              { href: "#blog", label: "Journal" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-warm-sand/80 hover:text-warm-sand text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:+923005183007"
              className="flex items-center space-x-1.5 text-warm-sand/70 hover:text-warm-sand text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+92 300 5183007</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile: WhatsApp quick button + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-pine-forest border-t border-white/10 py-4 space-y-1">
            {[
              { href: "#flats", label: "🏠 View Flats" },
              { href: "#location", label: "📍 Location" },
              { href: "#activities", label: "🏔️ Activities" },
              { href: "#blog", label: "📖 Murree Journal" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-warm-sand/90 hover:text-white hover:bg-white/5 py-3 px-4 text-sm font-medium transition-colors rounded-lg"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-white/10 mt-2 pt-3 px-4 space-y-2">
              <a
                href="tel:+923005183007"
                className="flex items-center space-x-2 text-warm-sand/70 py-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+92 300 5183007 — Mukhtar Ahmed Abbasi</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 text-white px-5 py-3 rounded-xl font-semibold text-sm"
                onClick={closeMenu}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
