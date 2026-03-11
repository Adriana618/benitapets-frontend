import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual",
  description:
    "Libro de Reclamaciones Virtual de Benita Pets conforme a la Ley N° 29571. Registra tu reclamo o queja sobre nuestros productos o servicios.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
