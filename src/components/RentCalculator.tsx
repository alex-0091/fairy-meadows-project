"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/data";

interface RentCalculatorProps {
  baseRate: number;
  flatName: string;
}

export default function RentCalculator({ baseRate, flatName }: RentCalculatorProps) {
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  // Weekend premium
  const weekendPremium = nights >= 2 ? 0 : 0.1;
  const guestSurcharge = guests > 4 ? (guests - 4) * 500 : 0;
  const perNightRate = Math.round(baseRate * (1 + weekendPremium));
  const totalCost = nights * perNightRate + guestSurcharge * nights;
  const perPersonPerNight = Math.round(totalCost / (nights * guests));

  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-pine-forest mb-2">🌙 Rent Calculator</h4>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-moss-slate">Number of Nights</span>
          <span className="font-bold text-pine-forest">{nights} night{nights > 1 ? "s" : ""}</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          className="w-full accent-terracotta"
        />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-moss-slate">Number of Guests</span>
          <span className="font-bold text-pine-forest">{guests} guest{guests > 1 ? "s" : ""}</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full accent-terracotta"
        />
      </div>

      {/* Cost Breakdown */}
      <div className="bg-pine-forest/5 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-moss-slate">Base rate</span>
          <span>PKR {perNightRate.toLocaleString()}/night</span>
        </div>
        {guestSurcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-moss-slate">Extra guest fee</span>
            <span>+PKR {guestSurcharge.toLocaleString()}/night</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-moss-slate">{nights} nights × rate</span>
          <span>PKR {totalCost.toLocaleString()}</span>
        </div>
        <div className="border-t border-pine-forest/10 pt-2 flex justify-between font-bold text-pine-forest">
          <span>Total Cost</span>
          <span className="text-lg">PKR {totalCost.toLocaleString()}</span>
        </div>
        <div className="text-center text-sm text-moss-slate/60 italic">
          ≈ PKR {perPersonPerNight.toLocaleString()} per person per night
        </div>
      </div>

      <a
        href={getWhatsAppUrl(`Hi! I'd like to book "${flatName}" for ${nights} night${nights > 1 ? "s" : ""}, ${guests} guest${guests > 1 ? "s" : ""}. Total estimated: PKR ${totalCost.toLocaleString()}. Is it available?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors w-full"
      >
        💬 Book via WhatsApp — PKR {totalCost.toLocaleString()}
      </a>
    </div>
  );
}
