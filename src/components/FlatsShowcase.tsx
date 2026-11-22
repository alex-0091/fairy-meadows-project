"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Wifi, Droplets, Zap, Flame, UtensilsCrossed, Eye } from "lucide-react";
import { FLATS_DATA, formatPrice, formatRent, getWhatsAppUrl } from "@/lib/data";
import FlatModal from "./FlatModal";

const amenityIcons: Record<string, React.ReactNode> = {
  "Working Equipped Kitchen": <UtensilsCrossed className="w-3 h-3" />,
  "Reliable Electricity + Backup": <Zap className="w-3 h-3" />,
  "Hot Water Geyser & Heating": <Flame className="w-3 h-3" />,
  "High-Speed Wi-Fi": <Wifi className="w-3 h-3" />,
  "Clean Water": <Droplets className="w-3 h-3" />,
  "Private Valley-View Balcony": <Eye className="w-3 h-3" />,
};

type Flat = typeof FLATS_DATA[0];

interface FlatsShowcaseProps {
  mode?: "buy" | "rent" | "all";
}

export default function FlatsShowcase({ mode = "all" }: FlatsShowcaseProps) {
  const [activeMode, setActiveMode] = useState<"all" | "buy" | "rent">(mode === "all" ? "all" : mode);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

  const filteredFlats = FLATS_DATA.filter((flat) => {
    if (activeMode === "buy") return flat.type === "sale" || flat.type === "both";
    if (activeMode === "rent") return flat.type === "rent" || flat.type === "both";
    return true;
  });

  return (
    <section id="flats" className="py-20 bg-warm-sand overflow-x-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-terracotta text-sm font-semibold tracking-widest uppercase mb-3">
            Available Properties
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl text-pine-forest font-bold mb-4">
            Your Mountain Home Awaits
          </h2>
          <p className="text-moss-slate/70 text-lg max-w-2xl mx-auto">
            Six uniquely named flats in Musyari, each with full amenities, valley views,
            and direct access to the pine forest.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-pine-forest/5 rounded-full p-1 border border-pine-forest/10">
            {(["all", "buy", "rent"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMode(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${
                  activeMode === tab
                    ? "bg-pine-forest text-warm-sand shadow-md"
                    : "text-moss-slate hover:text-pine-forest"
                }`}
              >
                {tab === "all" ? "All Flats" : tab === "buy" ? "🏠 For Sale" : "🌙 For Rent"}
              </button>
            ))}
          </div>
        </div>

        {/* Flats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {filteredFlats.map((flat) => (
            <div
              key={flat.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md card-hover group cursor-pointer"
              onClick={() => setSelectedFlat(flat)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={flat.images[0]}
                  alt={flat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-pine-forest/90 text-warm-sand text-xs font-bold px-2 py-1 rounded-full">
                    {flat.layout}
                  </span>
                  {(flat.type === "sale" || flat.type === "both") && (
                    <span className="bg-terracotta text-white text-xs font-bold px-2 py-1 rounded-full">
                      For Sale
                    </span>
                  )}
                  {(flat.type === "rent" || flat.type === "both") && (
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      For Rent
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-fraunces text-xl font-bold text-pine-forest mb-2 leading-tight">
                  {flat.name}
                </h3>
                <p className="text-moss-slate/70 text-sm mb-4 line-clamp-2">
                  {flat.description}
                </p>

                {/* Pricing */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {flat.salePriceLac && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
                      <div className="text-xs text-orange-600 font-medium">Sale Price</div>
                      <div className="text-orange-800 font-bold text-sm">
                        {formatPrice(flat.salePriceLac)}
                      </div>
                    </div>
                  )}
                  {flat.rentPerNight && (
                    <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-1.5">
                      <div className="text-xs text-green-600 font-medium">Per Night</div>
                      <div className="text-green-800 font-bold text-sm">
                        {formatRent(flat.rentPerNight)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {flat.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1 bg-pine-forest/5 text-pine-forest/70 text-xs px-2 py-1 rounded-full"
                    >
                      {amenityIcons[feature]}
                      {feature.split(" ")[0]}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFlat(flat);
                    }}
                    className="flex-1 bg-pine-forest hover:bg-moss-slate text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    View Details
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hi! I'm interested in "${flat.name}" (${flat.layout}). ${flat.salePriceLac ? `Sale: PKR ${flat.salePriceLac} Lac. ` : ""}${flat.rentPerNight ? `Rent: PKR ${flat.rentPerNight}/night.` : ""}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFlat && (
        <FlatModal flat={selectedFlat} onClose={() => setSelectedFlat(null)} />
      )}
    </section>
  );
}
