import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <Separator className="mb-6 bg-white/10" />
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-4 text-sm text-neutral-400">
            <p>© {new Date().getFullYear()} Arnaud Delerue. Tous droits réservés.</p>
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
              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="h-9 rounded-full border-white/20 bg-transparent text-xs text-white hover:bg-white/10"
                >
                  <Link href={`mailto:${contact.email}`}>Écrire</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-9 rounded-full text-xs text-white hover:bg-white/10"
                >
                  <Link href={`tel:${contact.phoneE164}`}>Appeler</Link>
                </Button>
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
