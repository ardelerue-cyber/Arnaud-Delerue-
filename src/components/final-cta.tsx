import Link from "next/link";
import { contact } from "@/data/contact";
import { events } from "@/data/events";
import { canReserveEvent, getNextPublicEvent } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FinalCtaProps = {
  variant: "audience" | "programmers";
};

export function FinalCta({ variant }: FinalCtaProps) {
  const isAudience = variant === "audience";
  const nextEvent = getNextPublicEvent(events);
  const audienceHref = nextEvent && canReserveEvent(nextEvent)
    ? "/dates#billetterie"
    : "/dates#notify";
  const audienceLabel = nextEvent && canReserveEvent(nextEvent)
    ? "Réserver"
    : "Être prévenu";

  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {isAudience ? "Spectateurs" : "Programmateurs"}
          </p>
          <h2 className="mt-3 text-3xl font-[var(--font-display)] text-white sm:text-4xl">
            {isAudience
              ? "Ne manquez pas les prochaines représentations"
              : "Accueillez le spectacle dans votre lieu ou votre événement"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
            {isAudience
              ? "Recevez les nouvelles dates en priorité et réservez dès l'ouverture de la billetterie."
              : "Vous souhaitez accueillir &apos;Une dernière pour la route&apos; dans votre établissement ou votre événement privé ? Contactez l'équipe pour recevoir les disponibilités, les conditions techniques et les informations de programmation."}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          {isAudience ? (
            <>
              <Button
                asChild
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900"
              >
                <Link href={audienceHref}>{audienceLabel}</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-11 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
              >
                <Link href="/dates">Voir les dates</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900"
              >
                <Link href="/contact">Contacter l&apos;équipe</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-11 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
              >
                <Link
                  href={`mailto:${contact.email}?subject=Demande%20de%20fiche%20technique`}
                >
                  Demander la fiche technique
                </Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
