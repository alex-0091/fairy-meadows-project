"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X, ChevronLeft, ChevronRight, MessageCircle,
  Wifi, Droplets, Zap, Flame, UtensilsCrossed, Eye,
  CheckCircle, Phone
} from "lucide-react";
import { formatPrice, formatRent, getWhatsAppUrl } from "@/lib/data";
import InstallmentCalculator from "./InstallmentCalculator";
import RentCalculator from "./RentCalculator";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Working Equipped Kitchen": <UtensilsCrossed className="w-4 h-4" />,
  "Reliable Electricity + Backup": <Zap className="w-4 h-4" />,
  "Hot Water Geyser & Heating": <Flame className="w-4 h-4" />,
  "High-Speed Wi-Fi": <Wifi className="w-4 h-4" />,
  "Clean Water": <Droplets className="w-4 h-4" />,
  "Private Valley-View Balcony": <Eye className="w-4 h-4" />,
};

type FlatData = {
  id: number;
  name: string;
  layout: string;
  type: string;
  salePriceLac: number | null;
  rentPerNight: number | null;
  description: string;
  features: string[];
  images: string[];
  videos: string[];
};

interface FlatModalProps {
  flat: FlatData;
  onClose: () => void;
}

type TabId = "overview" | "buy" | "rent" | "enquire";

export default function FlatModal({ flat, onClose }: FlatModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Enquiry form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<"buy" | "rent">(
    flat.type === "rent" ? "rent" : "buy"
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % flat.images.length);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i - 1 + flat.images.length) % flat.images.length);

  const handleEnquire = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          flatId: flat.id,
          type: inquiryType,
          message: `Enquiry for "${flat.name}" (${flat.layout}) — ${
            inquiryType === "buy"
              ? `Sale: PKR ${flat.salePriceLac} Lac`
              : `Rent: PKR ${flat.rentPerNight}/night`
          }`,
        }),
      });
    } catch {
      // proceed regardless
    }
    const url = getWhatsAppUrl(
      `Assalam o Alaikum Mukhtar bhai! My name is ${name.trim()}, my number is ${phone.trim()}. ` +
      `I'm interested in "${flat.name}" (${flat.layout}) — ` +
      (inquiryType === "buy"
        ? `I'd like to BUY it. Sale price PKR ${flat.salePriceLac} Lac.`
        : `I'd like to RENT it. Rate: PKR ${flat.rentPerNight}/night.`) +
      ` Please get back to me. JazakAllah!`
    );
    setWaUrl(url);
    setSubmitting(false);
    setSubmitted(true);
  };

  // Build visible tabs
  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "overview", label: "Overview" },
    ...(flat.salePriceLac ? [{ id: "buy" as TabId, label: "💰 Buy / Invest" }] : []),
    ...(flat.rentPerNight ? [{ id: "rent" as TabId, label: "🌙 Rent Calculator" }] : []),
    { id: "enquire", label: "📩 Quick Enquiry" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-pine-forest/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-warm-sand rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5 text-pine-forest" />
        </button>

        {/* Gallery */}
        <div className="relative h-72 md:h-96">
          <Image
            src={flat.images[currentImageIndex]}
            alt={flat.name}
            fill
            className="object-cover"
            unoptimized
          />
          {flat.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {flat.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === currentImageIndex ? "bg-white w-4" : "bg-white/50 w-2"}`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-pine-forest/90 text-warm-sand text-xs font-bold px-3 py-1 rounded-full">{flat.layout}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-pine-forest mb-2">{flat.name}</h2>
          <p className="text-moss-slate/70 mb-4">{flat.description}</p>

          {/* Pricing */}
          <div className="flex flex-wrap gap-3 mb-6">
            {flat.salePriceLac && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3">
                <div className="text-xs text-orange-600 font-medium mb-0.5">Sale Price</div>
                <div className="text-orange-800 font-bold text-xl">{formatPrice(flat.salePriceLac)}</div>
              </div>
            )}
            {flat.rentPerNight && (
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                <div className="text-xs text-green-600 font-medium mb-0.5">Nightly Rate</div>
                <div className="text-green-800 font-bold text-xl">{formatRent(flat.rentPerNight)}</div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-pine-forest/10 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-terracotta text-terracotta"
                    : "border-transparent text-moss-slate/60 hover:text-moss-slate"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Overview */}
          {activeTab === "overview" && (
            <div>
              <h4 className="font-semibold text-pine-forest mb-3">Full Amenities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {flat.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 bg-pine-forest/5 rounded-xl px-3 py-2.5">
                    <span className="text-terracotta">{AMENITY_ICONS[feature] || "✓"}</span>
                    <span className="text-pine-forest text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Buy Calculator */}
          {activeTab === "buy" && flat.salePriceLac && (
            <InstallmentCalculator totalPriceLac={flat.salePriceLac} flatName={flat.name} />
          )}

          {/* Tab: Rent Calculator */}
          {activeTab === "rent" && flat.rentPerNight && (
            <RentCalculator baseRate={flat.rentPerNight} flatName={flat.name} />
          )}

          {/* Tab: Quick Enquiry Form */}
          {activeTab === "enquire" && (
            <div>
              {!submitted ? (
                <div className="space-y-4">
                  <p className="text-moss-slate/70 text-sm">
                    Leave your name & number — we&apos;ll save your enquiry and open WhatsApp directly with Mukhtar Abbasi.
                  </p>

                  {(flat.salePriceLac && flat.rentPerNight) && (
                    <div className="flex bg-pine-forest/5 rounded-xl p-1 w-fit gap-1">
                      {(["buy", "rent"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setInquiryType(t)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            inquiryType === t ? "bg-pine-forest text-warm-sand shadow" : "text-moss-slate"
                          }`}
                        >
                          {t === "buy" ? "🏠 Buy" : "🌙 Rent"}
                        </button>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-pine-forest mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ahmed Khan"
                      className="w-full border border-pine-forest/20 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-pine-forest mb-1">Your Phone / WhatsApp *</label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 bg-pine-forest/5 border border-pine-forest/20 rounded-xl text-sm text-moss-slate font-medium">
                        <Phone className="w-3.5 h-3.5 mr-1" />+92
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="300 1234567"
                        className="flex-1 border border-pine-forest/20 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleEnquire}
                    disabled={!name.trim() || !phone.trim() || submitting}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {submitting ? "Saving…" : "Save & Open WhatsApp"}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="font-fraunces text-xl font-bold text-pine-forest">Enquiry Saved!</h4>
                  <p className="text-moss-slate/70 text-sm">
                    Your enquiry for <strong>{flat.name}</strong> has been recorded. Chat with Mukhtar bhai now.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] w-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Open WhatsApp Chat
                  </a>
                </div>
              )}
            </div>
          )}

          {/* WhatsApp CTA (shown on non-enquire tabs) */}
          {activeTab !== "enquire" && (
            <div className="mt-6 pt-6 border-t border-pine-forest/10 flex gap-3">
              <a
                href={getWhatsAppUrl(
                  `Hi Mukhtar bhai! I'm interested in "${flat.name}" (${flat.layout}). ${
                    flat.salePriceLac ? `Sale: PKR ${flat.salePriceLac} Lac. ` : ""
                  }${flat.rentPerNight ? `Rent: PKR ${flat.rentPerNight}/night.` : ""} Can we discuss?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </a>
              <button
                onClick={() => setActiveTab("enquire")}
                className="flex items-center justify-center gap-1.5 bg-pine-forest/10 hover:bg-pine-forest/20 text-pine-forest px-4 py-3.5 rounded-2xl font-bold text-sm transition-colors"
              >
                📩 Quick Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
