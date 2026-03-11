import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

const jonesy = localFont({
  src: "../../public/fonts/Jonesy Script.ttf",
  variable: "--font-jonesy",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benitapets.com"),
  title: {
    default: "Benita Pets | Comida para mascotas al mejor precio en Arequipa",
    template: "%s | Benita Pets",
  },
  description:
    "Comida para perros y gatos con los precios mas bajos de Arequipa. Mas de 40 años en Avelino Caceres. Compara precios y ahorra hasta 20%. Dog Chow, Ricocat, Mimaskot, Thor y mas marcas. Delivery gratis en Arequipa.",
  keywords: [
    "pet shop arequipa",
    "comida para perros arequipa",
    "comida para gatos arequipa",
    "benita pets",
    "mascotas arequipa",
    "tienda mascotas arequipa",
    "dog chow arequipa",
    "ricocat arequipa",
    "mimaskot arequipa",
    "delivery mascotas arequipa",
    "comida mascotas barato",
    "avelino caceres mascotas",
    "alimento para perros arequipa",
    "alimento para gatos arequipa",
    "ricocan arequipa",
    "thor comida perros arequipa",
    "bosko arequipa",
    "proplan arequipa",
    "comida mascotas delivery arequipa",
    "pet shop avelino caceres",
    "tienda de mascotas cerca de mi",
    "comida para perros barata",
    "comida para gatos barata",
    "venta de comida para mascotas arequipa",
    "donde comprar comida para perros arequipa",
    "comida para mascotas a domicilio arequipa",
    "supercan arequipa",
    "michicat arequipa",
    "comida perros por mayor arequipa",
  ],
  authors: [{ name: "Benita Pets" }],
  creator: "Benita Pets",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://benitapets.com",
    siteName: "Benita Pets",
    title: "Benita Pets | Comida para mascotas al mejor precio en Arequipa",
    description:
      "Los precios mas bajos en comida para perros y gatos en Arequipa. Mas de 40 años de experiencia. Delivery a domicilio.",
    images: [
      {
        url: "/images/hero-dog.jpg",
        width: 1200,
        height: 630,
        alt: "Benita Pets - Comida para mascotas en Arequipa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benita Pets | Comida para mascotas al mejor precio en Arequipa",
    description:
      "Los precios mas bajos en comida para perros y gatos en Arequipa. Delivery a domicilio.",
    images: ["/images/hero-dog.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://benitapets.com",
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${jonesy.variable} ${poppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
