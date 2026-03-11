import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haz tu pedido",
  description:
    "Pide comida para perros y gatos online con delivery en Arequipa. Dog Chow, Ricocan, Ricocat, Thor, Mimaskot y más al mejor precio. Paga con Yape, Mercado Pago o efectivo.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
