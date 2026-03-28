"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Countdown } from "@/components/countdown";
import { Container } from "@/components/container";
import { FinalCta } from "@/components/final-cta";
import { NotifyForm } from "@/components/notify-form";
import { ReassuranceStrip } from "@/components/reassurance-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VideoEmbed } from "@/components/video-embed";
import { videos } from "@/data/videos";
import { events } from "@/data/events";
import { show } from "@/data/show";
import { testimonials } from "@/data/testimonials";
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
  const heroTestimonials = testimonials.slice(0, 2);

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
              <p className="mt-4 text-lg font-medium text-white/90 sm:text-xl">
                Un seul en scène musical où l&apos;on rit, l&apos;on trinque et
                l&apos;on se reconnaît.
              </p>
              <p className="mt-3 text-base text-neutral-200 sm:text-lg">
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
                    Une parenthèse vive, élégante et profondément humaine
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                    Le spectacle prépare ses prochaines escales. Laissez votre
                    email pour recevoir les prochaines dates en priorité et ne
                    pas manquer la prochaine représentation publique.
                  </p>
                </div>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 w-full rounded-full bg-white px-7 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white sm:w-auto"
                >
                  <Link href={primaryHref}>
                    {hasBookableNextEvent ? "Réserver" : "Être informé"}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 sm:w-auto"
                >
                  <Link href={nextEvent ? "/dates" : "/contact"}>
                    {nextEvent ? "Voir toutes les dates" : "Accueillir le spectacle"}
                  </Link>
                </Button>
              </div>
              {!nextEvent ? (
                <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
                  <p className="mb-3 text-sm leading-relaxed text-neutral-300">
                    Recevez les prochaines dates en priorité, dès l&apos;ouverture
                    des nouvelles représentations.
                  </p>
                  <NotifyForm
                    className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                    submitLabel="Être informé"
                    pendingLabel="Envoi en cours..."
                    successTitle="Demande enregistrée"
                    successMessage="Merci. Vous recevrez en priorité les prochaines dates dès leur mise en ligne."
                    inlineFeedback
                    inputClassName="border-white/15 bg-white/10 text-white placeholder:text-neutral-500"
                    buttonClassName="sm:w-auto"
                    successClassName="border-white/10 bg-white/5"
                  />
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-10 max-w-3xl"
            >
              {nextEvent ? <Countdown eventDate={nextEvent.dateTime} /> : null}
            </motion.div>
          </div>
        </section>

        {!nextEvent ? (
          <section className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="border-white/10 bg-white/5">
                <CardContent className="space-y-5">
                  <p className="text-sm leading-relaxed text-neutral-300">
                    Déjà accueilli dans des bars, hôtels et lieux
                    événementiels, le spectacle s&apos;adapte à des contextes
                    intimistes sans rien perdre de son élégance.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Format
                      </p>
                      <p className="mt-2 text-sm text-neutral-200">
                        Piano, récit, humour, émotion
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Public
                      </p>
                      <p className="mt-2 text-sm text-neutral-200">
                        Soirées intimistes, lieux vivants, événements privés
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Accueil
                      </p>
                      <p className="mt-2 text-sm text-neutral-200">
                        Théâtres, hôtels, restaurants, lieux d&apos;exception
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {heroTestimonials.map((item) => (
                  <Card key={item.quote} className="border-white/10 bg-white/5">
                    <CardContent className="space-y-3">
                      <p className="text-sm leading-relaxed text-neutral-200">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                        {item.author} · {item.source}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </section>
        ) : null}

        <section className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
              Le spectacle
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Une forme légère, chaleureuse et élégante, conçue pour créer une
              vraie proximité avec le public.
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
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Durée
                  </p>
                  <p className="mt-2 text-sm text-neutral-200">{show.tech.duree}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Format
                  </p>
                  <p className="mt-2 text-sm text-neutral-200">{show.tech.format}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Type de lieu
                  </p>
                  <p className="mt-2 text-sm text-neutral-200">
                    Théâtres, hôtels, restaurants, lieux événementiels
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Ambiance
                  </p>
                  <p className="mt-2 text-sm text-neutral-200">
                    Intime, drôle, musicale et raffinée
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
                    {hasBookableNextEvent ? "Réserver" : "Accueillir le spectacle"}
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
