"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Countdown } from "@/components/countdown";
import { Container } from "@/components/container";
import { FinalCta } from "@/components/final-cta";
import { ReassuranceStrip } from "@/components/reassurance-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VideoEmbed } from "@/components/video-embed";
import { videos } from "@/data/videos";
import { events } from "@/data/events";
import {
  canReserveEvent,
  formatDateFR,
  formatDateShortFR,
  getNextPublicEvent,
} from "@/lib/format";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const images = [
  "/images/scene-12.jpeg",
  "/images/scene-15.jpeg",
  "/images/scene-19.jpeg",
  "/images/scene-21.jpeg",
];

export function HomePageClient() {
  const shortVideo = videos.find((video) => video.kind === "short");
  const nextEvent = getNextPublicEvent(events);
  const hasBookableNextEvent = nextEvent ? canReserveEvent(nextEvent) : false;
  const primaryHref = hasBookableNextEvent ? "/dates#billetterie" : "/dates#notify";

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-20">
        <section className="relative isolate min-h-[90vh] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/scene-21.jpeg"
            alt="Arnaud Delerue sur scène"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />

          <div className="relative flex min-h-[90vh] flex-col justify-end px-6 pb-16 pt-24 sm:px-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <Badge className="mb-5">
                {nextEvent ? "Prochaine date" : "Dates 2026"}
              </Badge>
              <h1 className="text-4xl font-[var(--font-display)] text-white sm:text-5xl md:text-6xl">
                Une dernière pour la route
              </h1>
              <p className="mt-4 text-base text-neutral-200 sm:text-lg">
                Un piano. Des mots. Des verres. Et beaucoup d&apos;autodérision.
              </p>
              {nextEvent ? (
                <div className="mt-5 space-y-2 text-sm text-neutral-200 sm:text-base">
                  <p>{formatDateFR(nextEvent.dateTime)}</p>
                  <p>
                    {nextEvent.venue} · {nextEvent.city}
                  </p>
                </div>
              ) : (
                <div className="mt-5 max-w-2xl space-y-3">
                  <p className="text-2xl font-[var(--font-display)] text-white sm:text-3xl">
                    Nouvelles dates bientôt annoncées
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                    Le spectacle continue sa route. Laissez votre email pour être
                    informé en priorité des prochaines représentations.
                  </p>
                </div>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 w-full rounded-full bg-white px-7 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white sm:w-auto"
                >
                  <Link href={primaryHref}>
                    {hasBookableNextEvent ? "Réserver" : "Être prévenu"}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 sm:w-auto"
                >
                  <Link href={nextEvent ? "/dates" : "/contact"}>
                    {nextEvent ? "Voir toutes les dates" : "Programmer le spectacle"}
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-10 max-w-3xl"
            >
              {nextEvent ? (
                <Countdown eventDate={nextEvent.dateTime} />
              ) : (
                <Card className="border-white/10 bg-white/5 backdrop-blur">
                  <CardHeader className="max-w-2xl">
                    <CardTitle className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">
                      Nouvelles dates bientôt annoncées
                    </CardTitle>
                    <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                      Inscrivez-vous pour être informé des prochaines
                      représentations ou contactez l&apos;équipe pour une
                      programmation privée.
                    </p>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
                    >
                      <Link href="/dates#notify">Être prévenu</Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
                    >
                      <Link href="/contact">Programmer le spectacle</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </motion.div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
              {nextEvent ? "Prochaine représentation" : "Le spectacle poursuit sa route"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
              {nextEvent
                ? "Un rendez-vous intime et élégant. Réservez votre place pour la prochaine date publique."
                : "Les prochaines dates publiques sont en préparation. Le spectacle reste disponible pour les lieux, hôtels, restaurants et événements privés."}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <Badge variant="secondary">
                  {nextEvent ? formatDateShortFR(nextEvent.dateTime) : "Sur demande"}
                </Badge>
                <CardTitle className="font-[var(--font-display)] text-white">
                  {nextEvent
                    ? `${nextEvent.venue} — ${nextEvent.city}`
                    : "Programmation privée, lieu culturel ou événement premium"}
                </CardTitle>
                {!nextEvent ? (
                  <p className="text-sm leading-relaxed text-neutral-400">
                    Une forme adaptable pour des soirées intimistes et des
                    accueils sur mesure.
                  </p>
                ) : null}
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                  className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                >
                  <Link href={hasBookableNextEvent ? "/dates#billetterie" : "/contact"}>
                    {hasBookableNextEvent ? "Réserver" : "Programmer le spectacle"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </section>

        <ReassuranceStrip />

        {shortVideo ? (
          <section className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
                Teaser
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
                Un aperçu court pour entrer dans l&apos;univers du spectacle.
              </p>
              <Button
                asChild
                className="mt-6 h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
              >
                <Link href="/spectacle">Découvrir le spectacle</Link>
              </Button>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <VideoEmbed
                youtubeId={shortVideo.youtubeId}
                title={shortVideo.title}
                variant="short"
              />
            </motion.div>
          </section>
        ) : null}

        <section className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
              Le spectacle
            </h2>
            <Separator className="my-4 bg-white/10" />
            <div className="space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
              <p>
                Entre concert et stand-up, Arnaud Delerue déroule une soirée à la
                fois tendre et mordante. Il chante, il raconte, il improvise,
                toujours à fleur d&apos;émotion.
              </p>
              <p>
                Les notes s&apos;enchaînent comme des confidences, les punchlines
                claquent comme des bouchons de champagne. On rit, on respire, on
                se reconnaît.
              </p>
              <p>
                Une bulle élégante, un piano complice, et ce sentiment délicieux
                d&apos;avoir vécu quelque chose de rare.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {images.map((src, index) => (
              <div
                key={src}
                className="group relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:h-48"
              >
                <Image
                  src={src}
                  alt={`Photo de scène ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </motion.div>
        </section>

        <FinalCta variant="audience" />
        <FinalCta variant="programmers" />
      </div>
    </Container>
  );
}
