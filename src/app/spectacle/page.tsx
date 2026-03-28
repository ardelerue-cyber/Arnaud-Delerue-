import type { Metadata } from "next";
import { SpectaclePageClient } from "@/components/pages/spectacle-page";

export const metadata: Metadata = {
  title: "Le spectacle",
  description:
    "Présentation du spectacle 'Une dernière pour la route' d'Arnaud Delerue: concept, univers, fiche technique et informations de programmation.",
  openGraph: {
    title: "Le spectacle | Une dernière pour la route",
    description:
      "Découvrez l'univers du spectacle, la fiche technique et les informations booking d'Arnaud Delerue.",
  },
};

export default function SpectaclePage() {
  return <SpectaclePageClient />;
}
