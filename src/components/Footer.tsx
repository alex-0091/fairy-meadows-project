import Link from "next/link";
import { MessageCircle, Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-pine-forest border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg font-fraunces">FM</span>
              </div>
              <div>
                <div className="font-fraunces font-bold text-warm-sand text-xl leading-tight">
                  Fairy Meadows Project
                </div>
                <div className="text-warm-sand/50 text-sm">
                  Multi Stars · M&amp;E Corporation
                </div>
              </div>
            </div>
            <p className="text-warm-sand/50 text-sm leading-relaxed max-w-sm mb-5">
              Exclusive 1+1 and 2+1 flats in Musyari, Murree — Fairy Meadows Project by Multi Stars.
              Buy your mountain dream home or book a pine forest retreat. Direct from owner — no agent commission.
            </p>
            <div className="space-y-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +92 300 5183007</span>
              </a>
              <div className="flex items-center gap-2 text-warm-sand/40 text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>Mukhtar Ahmed Abbasi — Head of Company</span>
              </div>
              <div className="flex items-center gap-2 text-warm-sand/40 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>Musyari, Murree, Punjab · 33.89°N 73.40°E</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-warm-sand font-fraunces font-bold text-lg mb-4">Properties</h4>
            <ul className="space-y-2.5">
              {[
                { label: "1+1 Flats for Rent", href: "#flats" },
                { label: "2+1 Flats for Sale", href: "#flats" },
                { label: "Installment Plans", href: "#flats" },
                { label: "Rental ROI Calculator", href: "#flats" },
                { label: "Location Map", href: "#location" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-warm-sand/50 hover:text-terracotta text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info + Social */}
          <div>
            <h4 className="text-warm-sand font-fraunces font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Activities Nearby", href: "#activities" },
                { label: "Murree Journal", href: "#blog" },
                { label: "Admin Dashboard", href: "/admin" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-warm-sand/50 hover:text-terracotta text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Placeholders */}
            <div className="mt-6">
              <p className="text-warm-sand/40 text-xs mb-3 uppercase tracking-wider">Social Media</p>
              <div className="flex space-x-3 mb-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-warm-sand/40 hover:text-green-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-warm-sand/40 hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="text-warm-sand/30 text-xs">
                Official pages launching soon —{" "}
                <a href={WHATSAPP_URL} className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp now
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-warm-sand/30 text-xs text-center md:text-left">
            © 2026 Fairy Meadows Project · Multi Stars · M&amp;E Corporation. Direct from owner Mukhtar Ahmed Abbasi.
          </p>
          <p className="text-warm-sand/20 text-xs">
            Musyari, Murree, Punjab, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
