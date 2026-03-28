import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";

const mediaImages = [
  "/images/scene-12.jpeg",
  "/images/scene-15.jpeg",
  "/images/scene-19.jpeg",
  "/images/scene-21.jpeg",
];

const downloads = [
  { label: "Dossier presse", href: "/press/dossier-presse.pdf" },
  { label: "Bio longue", href: "/press/bio-longue.pdf" },
  { label: "Pitch", href: "/press/pitch.pdf" },
];

export default function MediaPage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-12">
        <section className="grid gap-4">
          <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
            Espace média
          </h1>
          <p className="max-w-2xl text-sm text-neutral-400 sm:text-base leading-relaxed">
            Visuels officiels haute définition et téléchargements presse.
          </p>
        </section>

        <section className="grid gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
              Photos
            </h2>
            <Link
              href="/presse"
              className="text-sm text-neutral-300 underline-offset-4 hover:underline"
            >
              Retour Presse
            </Link>
          </div>
          <Separator className="bg-white/10" />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mediaImages.map((src, index) => (
              <div
                key={src}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <Image
                  src={src}
                  alt={`Visuel presse ${index + 1}`}
                  fill
                  className="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="font-[var(--font-display)] text-white">
                Téléchargements presse
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {downloads.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="secondary"
                  className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
                >
                  <a href={item.href} download>
                    <Download className="size-4" />
                    {item.label}
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <Button
            asChild
            variant="outline"
            className="h-10 w-full rounded-full border-white/20 bg-transparent text-sm text-white hover:bg-white/10 sm:w-auto"
          >
            <Link href="/presse">Retour Presse</Link>
          </Button>
        </section>
      </div>
    </Container>
  );
}
