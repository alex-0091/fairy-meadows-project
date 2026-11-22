"use client";

import { TrendingUp, Shield, MapPin, Clock, Award, Users } from "lucide-react";

const STATS = [
  {
    icon: "🏔️",
    value: "2,100m+",
    label: "Elevation",
    desc: "Above sea level — above the smog",
  },
  {
    icon: "🛣️",
    value: "65 km",
    label: "From Islamabad",
    desc: "~90 min expressway drive",
  },
  {
    icon: "💰",
    value: "PKR 12 Lac",
    label: "Starting Price",
    desc: "Installment plans available",
  },
  {
    icon: "📈",
    value: "40–60%",
    label: "Appreciation",
    desc: "5-year property value growth",
  },
  {
    icon: "🌙",
    value: "PKR 4,000",
    label: "Per Night Rent",
    desc: "Earn passive rental income",
  },
  {
    icon: "✅",
    value: "6 Flats",
    label: "Available Now",
    desc: "1+1 & 2+1 layouts",
  },
];

const WHY_INVEST = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Strong ROI & Appreciation",
    desc: "Murree mountain properties have seen 40–60% appreciation over five years. Your Fairy Meadows flat earns rental income while you're in the city — PKR 4,000–8,500/night from weekend visitors.",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    iconBg: "bg-orange-100",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Prime Musyari Location",
    desc: "Musyari sits at the sweet spot — quiet pine forest away from tourist crowds, yet 15 mins to Mall Road, 20 mins to Patriata Chairlift, 10 mins to Bhurban. Everything wild, nothing far.",
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-100",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Direct From Owner — No Agent",
    desc: "Buy directly from Multi Stars · M&E Corporation. Mukhtar Ahmed Abbasi handles every transaction personally. Zero agent commissions, full transparency, and direct WhatsApp access.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Easy Installment Plans",
    desc: "Flexible payment schedules designed for working professionals. Book with a down payment and spread the balance over 12–36 months. Use our calculator to find your perfect plan.",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Full Premium Amenities",
    desc: "Every flat includes: equipped kitchen, 20hr electricity + UPS backup, hot water geyser & heating, high-speed Wi-Fi, clean mountain water, and your own private valley-view balcony.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Weekend & Holiday Demand",
    desc: "Murree sees millions of visitors yearly from Islamabad, Rawalpindi, and Lahore. Peak season (Nov–Feb snowfall, Eid & summer) commands PKR 8,000–12,000/night from eager renters.",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    iconBg: "bg-rose-100",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-white overflow-x-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats Row */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block text-terracotta text-xs font-bold tracking-widest uppercase mb-3 bg-terracotta/10 px-4 py-1.5 rounded-full">
              By The Numbers
            </span>
            <h2 className="font-fraunces text-4xl sm:text-5xl text-pine-forest font-bold mb-3">
              The Mountain Investment Case
            </h2>
            <p className="text-moss-slate/60 text-lg max-w-2xl mx-auto">
              Real numbers from Murree's real estate market. Fairy Meadows Project
              delivers on every metric that matters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-warm-sand rounded-3xl p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pine-forest/5"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-fraunces text-xl font-bold text-pine-forest leading-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-terracotta text-xs font-bold uppercase tracking-wide mb-1">
                  {stat.label}
                </div>
                <div className="text-moss-slate/50 text-xs leading-tight">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Invest */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-terracotta text-xs font-bold tracking-widest uppercase mb-3 bg-terracotta/10 px-4 py-1.5 rounded-full">
              Why Fairy Meadows?
            </span>
            <h2 className="font-fraunces text-4xl sm:text-5xl text-pine-forest font-bold mb-3">
              Six Reasons to Buy Now
            </h2>
            <p className="text-moss-slate/60 text-lg max-w-2xl mx-auto">
              Mountain real estate is rising. Early buyers in Musyari, Murree
              have never regretted it. Here's why.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {WHY_INVEST.map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl p-6 border ${item.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 ${item.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-fraunces text-xl font-bold text-pine-forest mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-moss-slate/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-pine-forest rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 text-[200px] leading-none select-none">🌲</div>
            <div className="absolute bottom-0 right-0 text-[200px] leading-none select-none">🏔️</div>
          </div>
          <div className="relative">
            <p className="text-terracotta text-sm font-bold uppercase tracking-widest mb-3">
              Limited Availability
            </p>
            <h3 className="font-fraunces text-3xl sm:text-4xl text-warm-sand font-bold mb-4 leading-tight">
              Only 6 Flats Available — Don't Miss Your Mountain Home
            </h3>
            <p className="text-warm-sand/60 text-base mb-8 max-w-xl mx-auto">
              Once these are sold, that's it. Musyari's pine-view flats at this
              price range won't come again. Talk to Mukhtar Abbasi today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923005183007?text=Assalam%20o%20Alaikum%20Mukhtar%20bhai!%20I%20want%20to%20invest%20in%20Fairy%20Meadows%20Project.%20Please%20share%20availability%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 shadow-xl"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Mukhtar Abbasi Now
              </a>
              <a
                href="tel:+923005183007"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-warm-sand px-8 py-4 rounded-2xl font-bold text-base transition-all"
              >
                📞 Call +92 300 5183007
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
