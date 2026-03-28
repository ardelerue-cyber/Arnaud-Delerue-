import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Contact booking",
  description:
    "Contactez l'équipe d'Arnaud Delerue pour une programmation, une demande de renseignements ou un échange autour du spectacle.",
  openGraph: {
    title: "Contact booking | Arnaud Delerue",
    description:
      "Email, téléphone et contact direct pour la programmation du spectacle 'Une dernière pour la route'.",
  },
};

export default function ContactPage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-14">
        <section className="grid gap-4">
          <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
            Contact
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Une demande spectateur, une réservation privée ou un projet de
            programmation ? L&apos;équipe répond rapidement par email ou par téléphone.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Spectateurs
              </p>
              <h2 className="text-2xl font-[var(--font-display)] text-white">
                Une question avant de venir ?
              </h2>
              <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
                Billetterie, prochaines dates, informations pratiques ou demande
                générale: nous vous répondons rapidement.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                >
                  <Link href={`mailto:${contact.email}`}>Envoyer un email</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-10 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
                >
                  <Link href="/dates">Voir les dates</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Programmateurs / lieux / événements privés
              </p>
              <h2 className="text-2xl font-[var(--font-display)] text-white">
                Accueillir le spectacle
              </h2>
              <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
                Pour une programmation, une soirée privée ou un accueil en hôtel,
                restaurant ou lieu événementiel, contactez directement l&apos;équipe.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                >
                  <Link href={`mailto:${contact.email}`}>Demander les disponibilités</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-10 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
                >
                  <Link href="/presse">Voir la fiche presse</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Email
              </p>
              <div className="flex items-start gap-3 text-sm text-neutral-200">
                <Mail className="mt-0.5 size-4 shrink-0 text-neutral-400" aria-hidden="true" />
                <Link
                  href={`mailto:${contact.email}`}
                  className="break-all hover:text-white"
                  aria-label={`Envoyer un email à ${contact.name}`}
                >
                  {contact.email}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Téléphone & réseaux
              </p>
              <div className="flex items-center gap-3 text-sm text-neutral-200">
                <Phone className="size-4 text-neutral-400" aria-hidden="true" />
                <Link
                  href={`tel:${contact.phoneE164}`}
                  className="hover:text-white"
                  aria-label={`Appeler ${contact.name}`}
                >
                  {contact.phoneDisplay}
                </Link>
              </div>
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full rounded-full border-white/20 bg-transparent text-sm text-white hover:bg-white/10 sm:w-auto"
                >
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2"
                  >
                    <Instagram className="size-4" aria-hidden="true" />
                    Instagram
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}
