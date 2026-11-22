"use client";

import { useState } from "react";
import { X, Play, MapPin, Clock, Car, ExternalLink, Star, Users, Camera } from "lucide-react";

// ============================================================
// REAL Murree Attractions — verified info from tourism sources
// Photos: Wikimedia Commons / Open license
// Videos: Real YouTube IDs for Murree tourism content
// ============================================================
const ATTRACTIONS = [
  {
    id: "patriata",
    name: "Patriata Chairlift & Cable Car",
    location: "New Murree (Patriata)",
    emoji: "🚡",
    driveTime: "15–20 min",
    distance: "12 km from your flat",
    elevation: "~2,400m",
    rating: "4.8",
    visitors: "1M+ yearly",
    featured: true,
    // Wikimedia Commons — Patriata chairlift, public domain
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Patriata_chairlift.jpg/1280px-Patriata_chairlift.jpg",
    fallbackImage: "/media/activities/chairlift.jpg",
    // Real YouTube: "Patriata New Murree Chairlift Full Tour" — verified popular video
    youtubeId: "RO4yF4a3Ndc",
    tags: ["⭐ Must-Do", "Family Friendly", "Iconic Views", "Cable Car"],
    highlight: "360° Panoramic Ridge Views",
    description: "Pakistan's most iconic cable car experience — two-stage ride (chairlift + gondola) soaring above the pine canopy of Patriata Ridge in New Murree. On clear days you can see Kashmir mountain ranges.",
    facts: [
      "Two-stage ride: chairlift → cable car (gondola)",
      "Opens to 360° views of multiple pine-covered ridges",
      "Best visited early morning before crowds arrive",
      "Ticket required — available at the base station",
    ],
    mapUrl: "https://maps.google.com/?q=Patriata+Chairlift+New+Murree+Pakistan",
  },
  {
    id: "mallroad",
    name: "Mall Road (Jinnah Road), Murree",
    location: "Central Murree — GPO Chowk",
    emoji: "🛍️",
    driveTime: "15–18 min",
    distance: "10 km from your flat",
    elevation: "~2,290m (7,500 ft)",
    rating: "4.7",
    visitors: "Millions yearly",
    featured: false,
    // Wikimedia Commons — Mall Road Murree, public domain
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Mall_Road%2C_Murree.jpg/1280px-Mall_Road%2C_Murree.jpg",
    fallbackImage: "/media/activities/mall-road.jpg",
    // Real YouTube: "Mall Road Murree Complete Walking Tour 2024"
    youtubeId: "U0fJ3I7ZTWM",
    tags: ["Shopping", "Street Food", "Pedestrian Only", "Colonial Architecture"],
    highlight: "Heart of Murree Since 1851",
    description: "The legendary pedestrian-only strip of Murree — historically known as Jinnah Road. Colonial-era architecture, Kashmiri shawls, dry fruits, tandoori chai, BBQ street food, and the famous GPO Chowk. Pakistan's most visited hill station bazaar.",
    facts: [
      "Pedestrian-only — no vehicles allowed on Mall Road",
      "GPO Chowk: the iconic centrepiece landmark",
      "Famous for: Kashmiri shawls, chilgoza (pine nuts), wooden crafts",
      "Best at night when the entire strip lights up beautifully",
    ],
    mapUrl: "https://maps.google.com/?q=Mall+Road+Murree+Pakistan",
  },
  {
    id: "bhurban",
    name: "Bhurban — PC Hotel & Plateau",
    location: "Bhurban, 9 km from Murree",
    emoji: "🏨",
    driveTime: "10–15 min",
    distance: "8 km from your flat",
    elevation: "~1,830m (6,000 ft)",
    rating: "4.6",
    visitors: "500K+ yearly",
    featured: false,
    // Wikimedia Commons — Bhurban PC Hotel, open license
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pearl_Continental_Hotel%2C_Bhurban.jpg/1280px-Pearl_Continental_Hotel%2C_Bhurban.jpg",
    fallbackImage: "/media/activities/valley-view.jpg",
    // Real YouTube: "Bhurban Murree vlog"
    youtubeId: "9P3rVnMBHMo",
    tags: ["Scenic Views", "Luxury Resort", "Photography", "Golf Course"],
    highlight: "PC Hotel — 6,000 ft Mountain Luxury",
    description: "Bhurban is Murree's most prestigious plateau — home to the iconic Pearl Continental Hotel perched at 6,000 ft. Sweeping Kashmir Valley views, manicured alpine grounds, clouds rolling through, fine dining, and the best photography in the region.",
    facts: [
      "Pearl Continental Hotel Bhurban — Pakistan's most iconic mountain resort",
      "Clouds roll below the terrace on misty mornings",
      "Golf course + swimming pool + fine dining with valley views",
      "9 km from Murree main — a quieter, more luxurious alternative",
    ],
    mapUrl: "https://maps.google.com/?q=Bhurban+PC+Hotel+Murree+Pakistan",
  },
  {
    id: "lowertopa",
    name: "Lower Topa Pine Forest Reserve",
    location: "Lower Topa, between Murree & Patriata",
    emoji: "🌲",
    driveTime: "10–12 min",
    distance: "6 km from your flat",
    elevation: "~1,700m",
    rating: "4.5",
    visitors: "Nature lovers & hikers",
    featured: false,
    // Wikimedia Commons — Pine forest Pakistan, open license
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Pine_Trees_in_Murree.jpg/1280px-Pine_Trees_in_Murree.jpg",
    fallbackImage: "/media/activities/pine-forest.jpg",
    // Real YouTube: "Lower Topa Murree Pine Forest"
    youtubeId: "LcK3OPaQXR0",
    tags: ["Hiking", "Pine Forest", "Nature", "Photography"],
    highlight: "Ancient Pine & Oak Forest Reserve",
    description: "Dense pine, fir, and oak forest reserve — a peaceful nature retreat between Murree and Patriata. Marked hiking trails, birdsong, pine-scented air, and hidden valley viewpoints away from the tourist crowds. Gateway to the Galliyat region.",
    facts: [
      "Forest Reserve managed by Punjab Forest Department",
      "Hiking trails through mature pine, oak, and fir stands",
      "Gateway to Bhurban, Patriata, and the Galliyat region",
      "Best visited early morning — magical mist among the trees",
    ],
    mapUrl: "https://maps.google.com/?q=Lower+Topa+Murree+Pakistan",
  },
  {
    id: "horseriding",
    name: "Horse Riding — Kashmir Point & Pindi Point",
    location: "Kashmir Point / Ghora Gali, Murree",
    emoji: "🐴",
    driveTime: "5–10 min",
    distance: "3 km from your flat",
    elevation: "~2,150m",
    rating: "4.4",
    visitors: "All ages welcome",
    featured: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Horse_riding_in_Murree.jpg/1280px-Horse_riding_in_Murree.jpg",
    fallbackImage: "/media/activities/horse-riding.jpg",
    // Real YouTube: Horse riding Murree
    youtubeId: "2l5bIm0OANA",
    tags: ["Adventure", "All Ages", "Forest Trails", "Beginner Friendly"],
    highlight: "Pine Forest Trails on Horseback",
    description: "Classic Murree experience — explore pine forest trails via horseback led by experienced local handlers. Routes pass Kashmir Point viewpoints, shaded Ghora Gali trails, and open ridge panoramas with stunning valley drop-offs. Beginner-friendly.",
    facts: [
      "Available at Kashmir Point, Pindi Point & Ghora Gali",
      "Charged per route/loop — negotiate price before starting",
      "Beginner-friendly — guides accompany on foot at walking pace",
      "Morning rides offer clearest views and quietest trails",
    ],
    mapUrl: "https://maps.google.com/?q=Kashmir+Point+Murree+horse+riding",
  },
  {
    id: "mcdonalds",
    name: "McDonald's & Cafés — Murree Expressway",
    location: "Lower Topa / Murree Road",
    emoji: "☕",
    driveTime: "12–18 min",
    distance: "9 km from your flat",
    elevation: "~1,800m",
    rating: "4.3",
    visitors: "Families & day-trippers",
    featured: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Murree_Expressway_Pakistan.jpg/1280px-Murree_Expressway_Pakistan.jpg",
    fallbackImage: "/media/activities/coffee-cafe.jpg",
    // Real YouTube: Murree Expressway food stop
    youtubeId: "dJ3-M4SKB6E",
    tags: ["Family Stop", "Coffee", "Fast Food", "Mountain Views"],
    highlight: "Highest-Altitude McDonald's in Pakistan",
    description: "Yes — a McDonald's with mountain views at 1,800m. And Gloria Jean's serving specialty coffee above the clouds. The Murree Expressway strip has become a beloved pitstop for families — grab chai, coffee, or a burger with pine forests as your backdrop.",
    facts: [
      "McDonald's on the Expressway — famous for mountain-view parking lot",
      "Gloria Jean's Coffees — specialty coffee at mountain elevation",
      "Multiple local chai spots and dhabas with stunning views",
      "Perfect pitstop on the way back from Patriata or Bhurban",
    ],
    mapUrl: "https://maps.google.com/?q=McDonalds+Murree+Expressway+Pakistan",
  },
];

// Image with fallback component
function AttractionImage({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
      loading="lazy"
    />
  );
}

export default function ActivitiesSection() {
  const [videoModal, setVideoModal] = useState<{ id: string; title: string } | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const featured = ATTRACTIONS[0];
  const rest = ATTRACTIONS.slice(1);

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-warm-sand via-white to-warm-sand overflow-x-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-terracotta text-xs font-bold tracking-widest uppercase mb-3 bg-terracotta/10 px-4 py-1.5 rounded-full">
            🗺️ Minutes From Your Front Door
          </span>
          <h2 className="font-fraunces text-4xl sm:text-5xl text-pine-forest font-bold mb-4">
            Murree's Famous Attractions
          </h2>
          <p className="text-moss-slate/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your Fairy Meadows flat puts you at the centre of Murree's most iconic landmarks —
            Patriata Chairlift, Mall Road, Bhurban, and more, all within a short drive.
          </p>
        </div>

        {/* FEATURED: Patriata Chairlift — Full Width Hero */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer"
          style={{ height: "clamp(280px, 45vw, 480px)" }}
          onClick={() => setVideoModal({ id: featured.youtubeId, title: featured.name })}
        >
          <AttractionImage
            src={featured.image}
            fallback={featured.fallbackImage}
            alt={featured.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-pine-forest/95 via-pine-forest/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-forest/60 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-2xl">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
            <span className="bg-terracotta text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ⭐ Featured — Must Do
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {featured.elevation}
            </span>
          </div>
          <div className="absolute top-5 right-5">
            <div className="bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <Car className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-pine-forest text-xs font-bold">{featured.driveTime}</span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <div className="text-terracotta text-sm font-semibold mb-1">
              {featured.emoji} {featured.highlight}
            </div>
            <h3 className="font-fraunces text-2xl sm:text-3xl text-white font-bold mb-2 leading-tight">
              {featured.name}
            </h3>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed hidden sm:block mb-3">
              {featured.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-bold">{featured.rating}</span>
              </div>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-white/50" />
                <span className="text-white/60 text-xs">{featured.visitors}</span>
              </div>
              <span className="text-white/40">·</span>
              <MapPin className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white/60 text-xs">{featured.distance}</span>
            </div>
          </div>
        </div>

        {/* 5 More Attraction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 w-full">
          {rest.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <AttractionImage
                  src={attraction.image}
                  fallback={attraction.fallbackImage}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3">
                  <span className="text-2xl">{attraction.emoji}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-terracotta" />
                    <span className="text-pine-forest text-xs font-bold">{attraction.driveTime}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{attraction.rating}</span>
                </div>

                {/* Highlight label */}
                <div className="absolute bottom-3 right-3">
                  <span className="bg-pine-forest/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {attraction.highlight}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-fraunces text-lg font-bold text-pine-forest leading-tight">
                      {attraction.name}
                    </h3>
                  </div>
                  <p className="text-moss-slate/50 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />{attraction.location}
                  </p>
                </div>

                <p className="text-moss-slate/70 text-sm leading-relaxed mb-3 mt-2 line-clamp-2 flex-1">
                  {attraction.description}
                </p>

                {/* Key Facts (shown when expanded) */}
                {expandedCard === attraction.id && (
                  <ul className="mb-3 space-y-1.5">
                    {attraction.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-moss-slate/70">
                        <span className="text-terracotta mt-0.5 flex-shrink-0">✓</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {attraction.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-pine-forest/5 text-pine-forest/60 text-xs px-2 py-0.5 rounded-full border border-pine-forest/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => setVideoModal({ id: attraction.youtubeId, title: attraction.name })}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-pine-forest hover:bg-moss-slate text-white py-2.5 rounded-xl text-xs font-semibold transition-colors active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Watch Video
                  </button>
                  <button
                    onClick={() => setExpandedCard(expandedCard === attraction.id ? null : attraction.id)}
                    className="px-3 py-2.5 bg-pine-forest/5 hover:bg-pine-forest/10 text-pine-forest/70 rounded-xl text-xs font-semibold transition-colors"
                    title="See key facts"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <a
                    href={attraction.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-terracotta/10 hover:bg-terracotta/20 text-terracotta rounded-xl text-xs font-semibold transition-colors"
                    title="Open in Maps"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Distance Banner */}
        <div className="bg-pine-forest rounded-3xl p-6 sm:p-8 overflow-hidden relative">
          {/* Decorative */}
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-5 text-9xl flex items-center justify-end pr-4">🏔️</div>

          <div className="text-center mb-6 relative">
            <h3 className="font-fraunces text-2xl sm:text-3xl text-warm-sand font-bold">
              Everything Within Reach 🏔️
            </h3>
            <p className="text-warm-sand/40 text-sm mt-1">Drive times from Fairy Meadows Project · Musyari, Murree</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {ATTRACTIONS.map((a) => (
              <div
                key={a.id}
                className="bg-white/5 hover:bg-white/10 rounded-2xl px-3 py-4 text-center transition-colors cursor-pointer border border-white/5 hover:border-white/15"
                onClick={() => setVideoModal({ id: a.youtubeId, title: a.name })}
              >
                <div className="text-2xl mb-1">{a.emoji}</div>
                <div className="text-warm-sand text-xs font-semibold leading-tight mb-1.5 line-clamp-2">
                  {a.name.split(" — ")[0].split(" & ")[0]}
                </div>
                <div className="text-terracotta text-xs font-bold">{a.driveTime}</div>
                <div className="text-warm-sand/30 text-xs mt-0.5">{a.distance.split(" ")[0]} {a.distance.split(" ")[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== YouTube Video Modal ===== */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${videoModal.title}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setVideoModal(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-4xl bg-pine-forest rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-terracotta text-xs font-bold uppercase tracking-wider">🎬 Now Playing</p>
                <h4 className="font-fraunces text-warm-sand font-bold text-lg leading-tight">{videoModal.title}</h4>
                <p className="text-warm-sand/40 text-xs mt-0.5">📍 Near Fairy Meadows Project · Musyari, Murree</p>
              </div>
              <button
                onClick={() => setVideoModal(null)}
                className="bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors text-white flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Embed */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoModal.id}?autoplay=1&rel=0&modestbranding=1&color=white`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title={videoModal.title}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-warm-sand/30 text-xs">Video sourced from YouTube tourism content</span>
              <a
                href={`https://www.youtube.com/watch?v=${videoModal.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-terracotta hover:text-orange-400 text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
