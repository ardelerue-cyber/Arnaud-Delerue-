import Link from "next/link";
import { Download, Instagram, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { pressDownloads } from "@/data/press";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";

export default function PressePage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-16">
        <section className="grid gap-4">
          <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
            Presse
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400 sm:text-base leading-relaxed">
            Ressources officielles pour médias, programmateurs et partenaires.
            Téléchargez les éléments essentiels pour parler du spectacle.
          </p>
        </section>

        <section className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pressDownloads.map((item) => (
            <Card
              key={item.title}
              className="border-white/10 bg-white/5 backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="font-[var(--font-display)] text-white">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                  className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                >
                  <a href={item.href} download target="_blank" rel="noreferrer">
                    <Download className="size-4" />
                    Télécharger
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
          Photos
        </h2>
        <Separator className="bg-white/10" />
        <p className="text-sm text-neutral-400 sm:text-base leading-relaxed">
          Retrouvez les visuels presse haute définition dans l&apos;espace media.
        </p>
        <Button
          asChild
          variant="secondary"
          className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
        >
          <Link href="/media">Accéder à l&apos;espace media</Link>
        </Button>
      </section>

      <section>
        <Card className="border-white/10 bg-white/5">
          <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
                Contact presse / booking
              </h2>
              <p className="mt-2 text-sm text-neutral-400 sm:text-base leading-relaxed">
                Pour toute demande média, interviews ou programmation.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-neutral-400" aria-hidden="true" />
                <Link
                  href={`mailto:${contact.email}`}
                  className="hover:text-white"
                  aria-label={`Envoyer un email à ${contact.name}`}
                >
                  {contact.email}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-neutral-400" aria-hidden="true" />
                <Link
                  href={`tel:${contact.phoneE164}`}
                  className="hover:text-white"
                  aria-label={`Appeler ${contact.name}`}
                >
                  {contact.phoneDisplay}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="size-4 text-neutral-400" aria-hidden="true" />
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      </div>
    </Container>
  );
}
