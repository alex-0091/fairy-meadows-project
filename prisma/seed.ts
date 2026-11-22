import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const FLATS = [
  {
    name: "The Pine Canopy Loft",
    layout: "2+1",
    type: "both",
    salePriceLac: 22,
    rentPerNight: 7500,
    description: "Panoramic forest ridge view with a wide balcony where you're literally at the treetop level of Murree's ancient pine canopy. Wake up to misty valleys, breathe mountain air, and watch clouds drift below you.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat1-a.jpg", "/media/flats/flat1-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip1.mp4"]),
  },
  {
    name: "Mist & Cedar Hideout",
    layout: "1+1",
    type: "both",
    salePriceLac: 14,
    rentPerNight: 4500,
    description: "Cozy mountain retreat nestled right in the pines. Cedar-scented mornings, misty afternoons, and the sound of wind through ancient trees. Your perfect mountain escape.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat2-a.jpg", "/media/flats/flat2-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip2.mp4"]),
  },
  {
    name: "Cloud-9 Valley Suite",
    layout: "2+1",
    type: "both",
    salePriceLac: 28,
    rentPerNight: 8500,
    description: "Elevated corner flat where clouds literally drift past your windows. The highest, most dramatic views in the complex. Cloud-level living at its most spectacular.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat3-a.jpg", "/media/flats/flat3-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip3.mp4"]),
  },
  {
    name: "Wild Fern Studio Flat",
    layout: "1+1",
    type: "rent",
    salePriceLac: null,
    rentPerNight: 4000,
    description: "Budget-friendly weekend escape for nature lovers. Compact, beautiful, and perfectly positioned for hiking trails and forest exploration.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat4-a.jpg", "/media/flats/flat4-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip4.mp4"]),
  },
  {
    name: "Whispering Oaks Corner",
    layout: "2+1",
    type: "sale",
    salePriceLac: 18,
    rentPerNight: null,
    description: "Prime family holiday home and rental-yield investment. Spacious corner unit with dual exposures, perfect for families who want both mountain adventure and rental income.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat5-a.jpg", "/media/flats/flat5-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip5.mp4"]),
  },
  {
    name: "Starlight Ridge Den",
    layout: "1+1",
    type: "both",
    salePriceLac: 12,
    rentPerNight: 5500,
    description: "Peaceful stargazing terrace above the valley. When the mountain air is clear, you're above the city light pollution — just you, the pine silhouettes, and a sky full of stars.",
    features: JSON.stringify(["Working Equipped Kitchen", "Reliable Electricity + Backup", "Hot Water Geyser & Heating", "High-Speed Wi-Fi", "Clean Water", "Private Valley-View Balcony"]),
    images: JSON.stringify(["/media/flats/flat6-a.jpg", "/media/flats/flat6-b.jpg"]),
    videos: JSON.stringify(["/media/videos/clip1.mp4"]),
  },
];

const BLOGS = [
  {
    title: "First Snowfall in Murree: A Fairytale Above the Clouds",
    slug: "snowfall-murree",
    excerpt: "When winter arrives in the pine hills, Murree transforms into a magical white wonderland.",
    content: "Winter in Murree is unlike anywhere else. Fresh snowfall transforms the pine canopy into a silent white wonderland. Wake up to misty valleys covered in snow, and watch clouds drift below your balcony. Property owners see PKR 8,000-12,000/night during peak snowfall weekends.",
    image: "/media/blogs/snowfall-murree.jpg",
  },
  {
    title: "Pine Forest Living: What Life Feels Like Above 2,000m",
    slug: "pine-forest-life",
    excerpt: "Living surrounded by ancient pine forests changes everything — your sleep, your breathing, your perspective.",
    content: "At 2,000+ meters, the air is clean, cool, and pine-scented. You fall asleep to wind through pine needles and wake to birdsong. No city noise — just the natural rhythm of the mountain. Properties here appreciate 40-60% over five years as Islamabad expands.",
    image: "/media/blogs/pine-forest-life.jpg",
  },
  {
    title: "Above the Clouds: The Psychology of High-Altitude Living",
    slug: "cloud-living",
    excerpt: "Research shows mountain living at altitude has measurable effects on mental health and creativity.",
    content: "Studies consistently show lower anxiety and depression rates in mountain communities. The combination of clean air, natural beauty, reduced noise, and nature connection creates measurable wellbeing improvements. Murree's pine hills at 2,100-2,500m hit the sweet spot.",
    image: "/media/blogs/cloud-living.jpg",
  },
  {
    title: "The Perfect Weekend Escape: Islamabad to Murree & Back",
    slug: "weekend-escape",
    excerpt: "Friday evening to Sunday night — the complete Murree weekend guide.",
    content: "Leave Islamabad after 6 PM when traffic eases. The Murree Expressway runs smooth — 65 km, about 90 minutes. Saturday: Patriata Chairlift, Mall Road, local restaurants. Sunday: Pine forest walks, valley viewpoints. With your own flat, every weekend is spontaneous.",
    image: "/media/blogs/weekend-escape.jpg",
  },
];

async function main() {
  console.log("🌲 Starting Murree DB seed...");

  // Clear existing
  await prisma.inquiry.deleteMany();
  await prisma.flat.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.siteConfig.deleteMany();

  // Create flats
  for (const flat of FLATS) {
    await prisma.flat.create({ data: flat });
  }
  console.log(`✅ Created ${FLATS.length} flats`);

  // Create blogs
  for (const blog of BLOGS) {
    await prisma.blog.create({ data: blog });
  }
  console.log(`✅ Created ${BLOGS.length} blog posts`);

  // Create admin user
  const hashedPwd = await bcrypt.hash("murree2026", 10);
  await prisma.adminUser.create({
    data: { username: "admin", password: hashedPwd },
  });
  console.log("✅ Created admin user (admin / murree2026)");

  // Site config
  await prisma.siteConfig.createMany({
    data: [
      { key: "whatsapp", value: "923005183007" },
      { key: "owner_name", value: "Mukhtar Ahmed Abbasi" },
      { key: "location", value: "Musyari, Murree" },
    ],
  });
  console.log("✅ Created site config");

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
