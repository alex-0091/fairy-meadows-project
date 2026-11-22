# 🏔️ Fairy Meadows Project
### By **Multi Stars · M&E Corporation**
**Contact: Mukhtar Ahmed Abbasi — +92 300 5183007**

> Exclusive 1+1 and 2+1 mountain flats in Musyari, Murree — buy or rent above the pine forest canopy.

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — add your Neon PostgreSQL DATABASE_URL

# 3. Push database schema & seed
npx prisma db push
npx prisma generate
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

**Admin Dashboard:** http://localhost:3000/admin  
**Login:** `admin` / `murree2026` *(change after first deploy!)*

---

## 🗄️ Database Setup (Free — Neon PostgreSQL)

1. Go to **[neon.tech](https://neon.tech)** → Sign up free
2. Create a project → copy the **Connection String**
3. Paste it as `DATABASE_URL` in Vercel Environment Variables
4. Run `npx prisma db push` after connecting

---

## 📦 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import on [vercel.com/new](https://vercel.com/new)
3. Add Environment Variables:
   - `DATABASE_URL` — your Neon PostgreSQL URL
   - `NEXTAUTH_SECRET` — any random 32-char string
   - `NEXTAUTH_URL` — your Vercel domain (e.g. `https://fairy-meadows.vercel.app`)
4. Deploy → Done!

---

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom pine-forest palette
- **Database:** Prisma ORM + PostgreSQL (Neon)
- **Auth:** bcryptjs session cookies
- **Fonts:** Fraunces (editorial serif) + Plus Jakarta Sans
- **Media:** Color-graded MP4 clips + WhatsApp photos

## 📱 Features

- 🏠 **6 flat listings** — Pine Canopy Loft, Mist & Cedar Hideout, Cloud-9 Valley Suite, Wild Fern Studio, Whispering Oaks Corner, Starlight Ridge Den
- 💰 **Installment Calculator** — sliders for down payment % and period
- 🌙 **Rent Calculator** — nights/guests cost + WhatsApp booking
- 📈 **TrustSection** — investment stats & 6 "Why Invest" cards  
- 🎬 **VideoGallery** — 7 color-graded mountain footage clips
- 🗺️ **SVG Location Explorer** — Musyari, Murree with nearby pins
- 🚡 **Activities** — Patriata Chairlift, Mall Road, Bhurban, YouTube modals
- 📰 **Blog/Journal** — 4 Murree lifestyle articles
- 💬 **WhatsApp Lead Engine** — floating button + lead capture form → DB
- 🔐 **Admin Dashboard** — CRM: Leads, Flats Manager, Blog Manager

---

*© 2026 Fairy Meadows Project · Multi Stars · M&E Corporation*
