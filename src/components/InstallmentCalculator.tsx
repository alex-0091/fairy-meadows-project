"use client";

import { useState } from "react";
import { formatPrice, getWhatsAppUrl } from "@/lib/data";

interface InstallmentCalculatorProps {
  totalPriceLac: number;
  flatName: string;
}

export default function InstallmentCalculator({ totalPriceLac, flatName }: InstallmentCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [months, setMonths] = useState(24);
  const [nightsRented, setNightsRented] = useState(10);
  const [nightlyRate, setNightlyRate] = useState(6000);

  const totalPricePKR = totalPriceLac * 100000;
  const downPayment = (downPaymentPct / 100) * totalPricePKR;
  const remaining = totalPricePKR - downPayment;
  const monthlyInstallment = remaining / months;

  // ROI Estimation
  const annualRentalIncome = nightsRented * 12 * nightlyRate;
  const roiPercentage = ((annualRentalIncome / totalPricePKR) * 100).toFixed(1);
  const paybackYears = (totalPricePKR / annualRentalIncome).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Installment Section */}
      <div>
        <h4 className="font-semibold text-pine-forest mb-4">📊 Installment Plan</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-moss-slate">Down Payment</span>
              <span className="font-bold text-pine-forest">
                {downPaymentPct}% — PKR {(downPayment / 100000).toFixed(1)} Lac
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full accent-terracotta"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-moss-slate">Installment Period</span>
              <span className="font-bold text-pine-forest">{months} months</span>
            </div>
            <input
              type="range"
              min={6}
              max={60}
              step={6}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full accent-terracotta"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
            <div className="text-xs text-orange-600 mb-1">Down Payment</div>
            <div className="font-bold text-orange-800 text-sm">
              PKR {(downPayment / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
            <div className="text-xs text-blue-600 mb-1">Monthly</div>
            <div className="font-bold text-blue-800 text-sm">
              PKR {Math.round(monthlyInstallment / 1000)}K
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <div className="text-xs text-green-600 mb-1">Total</div>
            <div className="font-bold text-green-800 text-sm">
              {formatPrice(totalPriceLac)}
            </div>
          </div>
        </div>
      </div>

      {/* ROI Section */}
      <div className="border-t border-pine-forest/10 pt-6">
        <h4 className="font-semibold text-pine-forest mb-4">📈 Rental ROI Estimator</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-moss-slate">Nights Rented Per Month</span>
              <span className="font-bold text-pine-forest">{nightsRented} nights</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={nightsRented}
              onChange={(e) => setNightsRented(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-moss-slate">Nightly Rate (PKR)</span>
              <span className="font-bold text-pine-forest">PKR {nightlyRate.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={12000}
              step={500}
              value={nightlyRate}
              onChange={(e) => setNightlyRate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-xs text-green-600 mb-1">Annual Rental Income</div>
            <div className="font-bold text-green-800 text-lg">
              PKR {(annualRentalIncome / 100000).toFixed(1)} Lac
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-xs text-purple-600 mb-1">Annual ROI</div>
            <div className="font-bold text-purple-800 text-lg">{roiPercentage}%</div>
          </div>
        </div>
        <div className="bg-pine-forest/5 rounded-xl p-3 mt-3 text-center text-sm text-pine-forest">
          💡 At this rate, payback in <strong>{paybackYears} years</strong> — then pure income
        </div>
      </div>

      <a
        href={getWhatsAppUrl(`Hi! I ran the numbers on "${flatName}" — ${downPaymentPct}% down = PKR ${(downPayment/100000).toFixed(1)}L, then PKR ${Math.round(monthlyInstallment/1000)}K/month for ${months} months. Can we discuss flexible terms?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-pine-forest hover:bg-moss-slate text-white py-3 rounded-xl font-semibold text-sm transition-colors w-full"
      >
        💬 Discuss These Terms on WhatsApp
      </a>
    </div>
  );
}
