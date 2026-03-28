import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          Erreur 404
        </p>
        <h1 className="mt-4 text-4xl font-[var(--font-display)] text-neutral-100">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          La page demandée est introuvable. Revenez à l&apos;accueil pour découvrir
          les prochaines dates et le spectacle.
        </p>
        <Button
          asChild
          className="mt-8 h-11 rounded-full bg-neutral-100 px-6 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white"
        >
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
