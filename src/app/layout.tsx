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
  title: "Benita Pets | Comida y productos para mascotas en Arequipa",
  description:
    "Los mejores precios en comida para perros y gatos en Arequipa. Compara precios y comprueba que somos más baratos. Delivery a toda la ciudad.",
  keywords: [
    "pet shop arequipa",
    "comida para perros arequipa",
    "comida para gatos arequipa",
    "benita pets",
    "mascotas arequipa",
  ],
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
