import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { events } from "@/data/events";
import { canReserveEvent, getNextPublicEvent } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const nextEvent = getNextPublicEvent(events);
  const primaryHref =
    nextEvent && canReserveEvent(nextEvent) ? "/dates#billetterie" : "/dates#notify";
  const primaryLabel =
    nextEvent && canReserveEvent(nextEvent) ? "Réserver" : "Être prévenu";

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <Separator className="mb-6 bg-white/10" />
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Une dernière pour la route
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
              Spectacle musical et vivant pour le grand public, les lieux
              culturels, les hôtels, les restaurants et les événements privés.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="h-9 rounded-full bg-white px-5 text-xs font-semibold text-neutral-900"
              >
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-9 rounded-full border-white/20 bg-transparent text-xs text-white hover:bg-white/10"
              >
                <Link href="/contact">Programmer le spectacle</Link>
              </Button>
            </div>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Arnaud Delerue. Tous droits réservés.
            </p>
          </div>

          <div className="space-y-6 text-sm text-neutral-300">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Contact / Booking
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:text-neutral-100"
                  aria-label={`Envoyer un email à ${contact.name}`}
                >
                  <Mail className="size-4 text-neutral-400" aria-hidden="true" />
                  {contact.email}
                </Link>
                <Link
                  href={`tel:${contact.phoneE164}`}
                  className="flex items-center gap-2 hover:text-neutral-100"
                  aria-label={`Appeler ${contact.name}`}
                >
                  <Phone className="size-4 text-neutral-400" aria-hidden="true" />
                  {contact.phoneDisplay}
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Réseaux
              </p>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-neutral-100"
              >
                <Instagram className="size-4 text-neutral-400" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
