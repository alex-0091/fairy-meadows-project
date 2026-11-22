import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fairy Meadows Project | Multi Stars — M&E Corporation | Murree",
  description: "Fairy Meadows Project by Multi Stars, part of M&E Corporation. Exclusive 1+1 and 2+1 mountain flats in Murree's pine forest. Buy or rent above the clouds with stunning valley views. Contact Mukhtar Ahmed Abbasi — +92 300 5183007.",
  keywords: "Fairy Meadows Project, Multi Stars, M&E Corporation, Murree flats, buy flat Murree, rent flat Murree, mountain property Pakistan, pine forest flat, Musyari Murree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased overflow-x-hidden max-w-[100vw]">
        <main className="overflow-x-hidden w-full max-w-[100vw]">
        {children}
        </main>
      </body>
    </html>
  );
}
