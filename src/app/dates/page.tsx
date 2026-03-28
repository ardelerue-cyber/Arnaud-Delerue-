import type { Metadata } from "next";
import { DatesPageClient } from "@/components/pages/dates-page";

export const metadata: Metadata = {
  title: "Dates & billetterie",
  description:
    "Consultez les prochaines dates d'Une dernière pour la route, accédez à la billetterie et demandez une programmation privée.",
  openGraph: {
    title: "Dates & billetterie | Une dernière pour la route",
    description:
      "Prochaines représentations, billetterie et demandes de programmation pour le spectacle d'Arnaud Delerue.",
  },
};

export default function DatesPage() {
  return <DatesPageClient />;
}
