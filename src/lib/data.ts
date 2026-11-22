export const WHATSAPP_NUMBER = "923005183007";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Helper: build a WhatsApp URL with pre-filled message
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Format sale price (PKR Lac)
export function formatPrice(lac: number): string {
  return `PKR ${lac} Lac`;
}

// Format rent per night
export function formatRent(perNight: number): string {
  return `PKR ${perNight.toLocaleString()}/night`;
}

export const COLORS = {
  pineFord: "#0F241D",
  mossSlate: "#1B3B30",
  warmSand: "#F6F3EC",
  cedarWood: "#5C4033",
  terracotta: "#D97736",
} as const;

export const FLATS_DATA = [
  {
    id: 1,
    name: "The Pine Canopy Loft",
    layout: "2+1",
    type: "both",
    salePriceLac: 22,
    rentPerNight: 7500,
    description: "Panoramic forest ridge view with a wide balcony where you're literally at the treetop level of Murree's ancient pine canopy. Wake up to misty valleys, breathe mountain air, and watch clouds drift below you.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat1-a.jpg", "/media/flats/flat1-b.jpg"],
    videos: ["/media/videos/clip1.mp4"],
  },
  {
    id: 2,
    name: "Mist & Cedar Hideout",
    layout: "1+1",
    type: "both",
    salePriceLac: 14,
    rentPerNight: 4500,
    description: "Cozy mountain retreat nestled right in the pines. Cedar-scented mornings, misty afternoons, and the sound of wind through ancient trees. Your perfect mountain escape.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat2-a.jpg", "/media/flats/flat2-b.jpg"],
    videos: ["/media/videos/clip2.mp4"],
  },
  {
    id: 3,
    name: "Cloud-9 Valley Suite",
    layout: "2+1",
    type: "both",
    salePriceLac: 28,
    rentPerNight: 8500,
    description: "Elevated corner flat where clouds literally drift past your windows. The highest, most dramatic views in the complex. Cloud-level living at its most spectacular.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat3-a.jpg", "/media/flats/flat3-b.jpg"],
    videos: ["/media/videos/clip3.mp4"],
  },
  {
    id: 4,
    name: "Wild Fern Studio Flat",
    layout: "1+1",
    type: "rent",
    salePriceLac: null,
    rentPerNight: 4000,
    description: "Budget-friendly weekend escape for nature lovers. Compact, beautiful, and perfectly positioned for hiking trails and forest exploration.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat4-a.jpg", "/media/flats/flat4-b.jpg"],
    videos: ["/media/videos/clip4.mp4"],
  },
  {
    id: 5,
    name: "Whispering Oaks Corner",
    layout: "2+1",
    type: "sale",
    salePriceLac: 18,
    rentPerNight: null,
    description: "Prime family holiday home and rental-yield investment. Spacious corner unit with dual exposures, perfect for families who want both mountain adventure and rental income.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat5-a.jpg", "/media/flats/flat5-b.jpg"],
    videos: ["/media/videos/clip5.mp4"],
  },
  {
    id: 6,
    name: "Starlight Ridge Den",
    layout: "1+1",
    type: "both",
    salePriceLac: 12,
    rentPerNight: 5500,
    description: "Peaceful stargazing terrace above the valley. When the mountain air is clear, you're above the city light pollution — just you, the pine silhouettes, and a sky full of stars.",
    features: ["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"],
    images: ["/media/flats/flat6-a.jpg", "/media/flats/flat6-b.jpg"],
    videos: ["/media/videos/clip1.mp4"],
  },
];

export const ACTIVITIES = [
  {
    name: "Horse Riding",
    image: "/media/activities/horse-riding.jpg",
    driveTime: "5-10 min",
    description: "Explore pine forest trails on horseback. Local guides take you through scenic mountain paths with stunning valley views.",
    youtubeId: "LcK3OPaQXR0",
  },
  {
    name: "Patriata Chairlift",
    image: "/media/activities/chairlift.jpg",
    driveTime: "15-20 min",
    description: "Pakistan's most iconic chairlift soaring above the pine forest canopy with breathtaking panoramic mountain views.",
    youtubeId: "RO4yF4a3Ndc",
  },
  {
    name: "Mall Road",
    image: "/media/activities/mall-road.jpg",
    driveTime: "15-18 min",
    description: "Murree's famous bazaar strip with shops, restaurants, and the ultimate mountain town atmosphere.",
    youtubeId: "9P3rVnMBHMo",
  },
  {
    name: "Pine Forest Walk",
    image: "/media/activities/pine-forest.jpg",
    driveTime: "2 min walk",
    description: "Step out your door into ancient pine forest. Marked hiking trails through misty woods right at your doorstep.",
  },
  {
    name: "Coffee & Cafés",
    image: "/media/activities/coffee-cafe.jpg",
    driveTime: "12-18 min",
    description: "McDonald's, Gloria Jean's, Hardees and local cafés serving hot chai and mountain specialties in the town center.",
  },
  {
    name: "Valley Viewpoints",
    image: "/media/activities/valley-view.jpg",
    driveTime: "5 min",
    description: "Scenic viewpoints overlooking vast Murree valleys. Perfect for golden hour photography and cloud watching.",
  },
];

export const BLOGS = [
  {
    title: "First Snowfall in Murree: A Fairytale Above the Clouds",
    slug: "snowfall-murree",
    excerpt: "When winter arrives in the pine hills, Murree transforms into a magical white wonderland. Here's what it's really like to wake up to fresh snowfall from your mountain flat.",
    image: "/media/blogs/snowfall-murree.jpg",
    content: `
# First Snowfall in Murree: A Fairytale Above the Clouds

There's nothing quite like waking up to the first snowfall of the season in Murree. You step out onto your balcony, and the entire pine forest has been transformed overnight into a silent white world.

## The Magic of Mountain Winters

The pines hold snow like nature's own sculptures. Each branch becomes a work of art, and the valley below disappears into soft clouds. From your flat window, you're watching a painting that changes every hour.

## Morning Rituals in the Snow

Start your day with a hot cup of chai as snow drifts past the window. The fireplace crackles, the mountains are absolutely still except for the occasional sound of snow sliding off pine branches.

## Why Buy a Flat for the Winter Season

Winter rentals in Murree command premium rates. Families from Lahore, Islamabad, and Rawalpindi book weeks in advance. As a flat owner, you can earn PKR 8,000-12,000 per night during snowfall weekends.

## Getting Around in the Snow

The road to lower Topa and Mall Road is well-maintained. Local shops stock everything you need, and the mountain community comes together beautifully during snowfall season.

Your mountain flat isn't just a property — it's a front-row seat to one of Pakistan's most spectacular natural shows.
    `,
  },
  {
    title: "Pine Forest Living: What Life Feels Like Above 2,000m",
    slug: "pine-forest-life",
    excerpt: "Living surrounded by ancient pine forests changes everything — your sleep, your breathing, your perspective on city life. Here's the honest account of pine forest flat life.",
    image: "/media/blogs/pine-forest-life.jpg",
    content: `
# Pine Forest Living: What Life Feels Like Above 2,000m

## The Air is Different Here

At 2,000+ meters, the air has a quality that's hard to describe until you've experienced it. Clean, cool, pine-scented. Your lungs open up differently. City pollution feels like a distant memory.

## Sounds of the Forest

You fall asleep to wind through pine needles. You wake up to birdsong. No car horns, no construction, just the natural rhythm of the mountain.

## The Pine Community

Musyari in Murree is a tight-knit community. Neighbors know each other. The local tea stall owner knows your order. Kids play in the forest clearing. It's the Pakistan of a generation ago — peaceful and genuine.

## Investment Perspective

Properties here appreciate steadily. As Islamabad and Rawalpindi expand, Murree becomes more accessible, and demand for quality mountain properties grows. Early investors in Musyari's pine-view flats have seen 40-60% appreciation over five years.

## Practical Mountain Life

- Water: Clean mountain spring water
- Power: 20-hour electricity with UPS backup
- Connectivity: Good 4G coverage, fiber internet available
- Heating: Gas heaters and electric backup
- Shopping: Local market 10 min away, Murree city 15-18 min

The mountains give you perspective. And a flat here gives you the mountains.
    `,
  },
  {
    title: "Above the Clouds: The Psychology of High-Altitude Living",
    slug: "cloud-living",
    excerpt: "Research shows that mountain living at altitude has measurable effects on mental health, creativity, and sleep quality. Murree's pine hills hit the sweet spot.",
    image: "/media/blogs/cloud-living.jpg",
    content: `
# Above the Clouds: The Psychology of High-Altitude Living

## What Research Says

Studies from mountain communities consistently show lower rates of anxiety and depression. The combination of clean air, natural beauty, reduced noise pollution, and connection to nature creates measurable improvements in mental wellbeing.

## The Creativity Effect

Many writers, artists, and entrepreneurs seek mountain retreats precisely for this reason. The mental clarity that comes from pine forest air and valley views is real and documented.

## Sleep Quality Transformation

City dwellers who move to or regularly visit mountain flats report dramatically improved sleep quality within days. The cool air, complete darkness, and natural quiet create ideal sleep conditions.

## Your Mountain Retreat Strategy

Whether you're buying as a primary residence or a holiday home with rental income, the psychological benefits of having a mountain retreat available are substantial. Knowing you can escape to your flat above the clouds whenever the city gets too much is worth something beyond its financial value.

## Murree's Sweet Spot

At 2,100-2,500 meters, Murree's pine hills are high enough to be above the smog and noise, but accessible enough for a quick weekend escape from Islamabad (just 65 km away). It's the perfect altitude balance.
    `,
  },
  {
    title: "The Perfect Weekend Escape: Islamabad to Murree & Back",
    slug: "weekend-escape",
    excerpt: "Friday evening to Sunday night — the complete Murree weekend guide. What to do, where to eat, the best viewpoints, and why a flat here makes every weekend better.",
    image: "/media/blogs/weekend-escape.jpg",
    content: `
# The Perfect Weekend Escape: Islamabad to Murree & Back

## Friday Evening: Arrival

Leave Islamabad after 6 PM when traffic eases. The Murree Expressway runs smooth — 65 km, about 90 minutes. Arrive to mountain air and your pine-view balcony just as sunset turns the valley gold.

## Saturday: Full Mountain Day

**Morning (7-9 AM):** Early walk in the pine forest. The air is extraordinary at this hour.

**Late Morning (10 AM):** Drive to Patriata Chairlift. Take the chairlift for panoramic views.

**Afternoon (1-3 PM):** Lunch at a Murree restaurant. Try Karahi here — the mountain cooks know their craft.

**Late Afternoon (3-5 PM):** Mall Road for shopping, chai, and the famous Murree atmosphere.

**Evening:** Back to your flat. Cook dinner in your kitchen with fresh mountain air coming through the balcony.

**Night:** Stargazing from your balcony or terrace. Above city light pollution, the stars are magnificent.

## Sunday: Forest & Valley Day

**Morning:** Hike through the pine trails. Horse riding if you haven't done it.

**Afternoon:** Valley viewpoints. Photography. Pure peace.

**Evening:** Head back to Islamabad refreshed, recharged, and already planning the next weekend.

## Why Having Your Own Flat Changes Everything

Hotels are expensive and impersonal. Your own mountain flat means spontaneous escapes — leave Friday, arrive to your space. No booking, no check-in, just your mountain home waiting.

A flat in Musyari, Murree pays for itself through weekend rentals. And it gives you a lifestyle upgrade that money can't fully quantify.
    `,
  },
];
