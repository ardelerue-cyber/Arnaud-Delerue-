import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/container";

export default function ContactPage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-12">
        <section className="grid gap-4">
          <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
            Contact
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400 sm:text-base leading-relaxed">
            Réponse rapide par email ou téléphone. Parlons de votre événement.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardContent className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Email
            </p>
            <div className="flex items-center gap-3 text-sm text-neutral-200">
              <Mail className="size-4 text-neutral-400" aria-hidden="true" />
              <Link
                href={`mailto:${contact.email}`}
                className="hover:text-white"
                aria-label={`Envoyer un email à ${contact.name}`}
              >
                {contact.email}
              </Link>
            </div>
            <div className="flex items-center">
              <Button
                asChild
                className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
              >
                <Link href={`mailto:${contact.email}`}>Envoyer un email</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Téléphone
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
            <div className="flex items-center">
              <Button
                asChild
                className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
              >
                <Link href={`tel:${contact.phoneE164}`}>Appeler</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </section>

        <section>
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
        </section>
      </div>
    </Container>
  );
}
