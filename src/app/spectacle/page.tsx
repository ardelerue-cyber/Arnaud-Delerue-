"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { events } from "@/data/events";
import { contact } from "@/data/contact";
import { show } from "@/data/show";
import { MediaCarousel } from "@/components/media-carousel";
import { Testimonials } from "@/components/testimonials";
import { TeaserSection } from "@/components/teaser-section";
import { formatDateFR, getNextEvent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function SpectaclePage() {
  const nextEvent = getNextEvent(events);

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="relative flex flex-col gap-20">
      <section className="relative isolate min-h-[80vh] overflow-hidden rounded-3xl border border-white/10">
        <Image
          src="/images/scene-19.jpeg"
          alt="Arnaud Delerue au piano"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />

        <div className="relative flex min-h-[80vh] flex-col justify-end px-6 pb-16 pt-24 sm:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge className="mb-5">Spectacle 2026</Badge>
            <h1 className="text-4xl font-[var(--font-display)] text-white sm:text-5xl md:text-6xl">
              {show.title}
            </h1>
            <p className="mt-4 text-base text-neutral-200 sm:text-lg">
              {show.subtitle}
            </p>
            <p className="mt-3 text-sm text-neutral-400">{show.tagline}</p>
            <div className="mt-6">
              <Button
                asChild
                className="h-11 w-full rounded-full bg-white px-7 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white sm:w-auto"
              >
                <Link href="/dates#billetterie">Réserver</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-3xl">
            Le concept
          </h2>
          <Separator className="my-4 bg-white/10" />
          <p className="text-sm text-neutral-300 sm:text-base leading-relaxed">
            {show.pitchShort}
          </p>
          <div className="mt-4 space-y-4 text-sm text-neutral-300 sm:text-base leading-relaxed">
            {show.pitchLong.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <TeaserSection />

      <section className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-3xl">
            Ce que vous allez vivre
          </h2>
          <Separator className="my-4 bg-white/10" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Card className="border-white/10 bg-white/5">
            <CardContent>
              <ul className="space-y-3 text-sm text-neutral-300 sm:text-base">
                {show.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 size-2 rounded-full bg-white/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="grid gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-3xl">
            Ils en parlent
          </h2>
          <Separator className="my-4 bg-white/10" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Testimonials />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Button
            asChild
            variant="secondary"
            className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
          >
            <Link href="/presse">Contact presse</Link>
          </Button>
        </motion.div>
      </section>

      <section className="grid gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-3xl">
            En images
          </h2>
          <Separator className="my-4 bg-white/10" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <MediaCarousel images={show.gallery} />
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="font-[var(--font-display)] text-white">
                Fiche technique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 text-sm text-neutral-300">
                <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Durée</span>
                  <span>{show.tech.duree}</span>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Format</span>
                  <span>{show.tech.format}</span>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Scène</span>
                  <span>{show.tech.scene}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-neutral-400">Son</span>
                  <span>{show.tech.son}</span>
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
          <Card className="border-white/10 bg-white/5">
            <CardContent className="flex h-full flex-col items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-[var(--font-display)] text-white sm:text-3xl lg:text-2xl">
                  Pour les programmateurs
                </h2>
                <p className="mt-3 text-sm text-neutral-400 sm:text-base leading-relaxed">
                  Dossier, fiche technique et disponibilités sur demande.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-300">
                  <Link
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 hover:text-white"
                    aria-label={`Envoyer un email à ${contact.name}`}
                  >
                    <Mail className="size-4 text-neutral-400" aria-hidden="true" />
                    {contact.email}
                  </Link>
                  <Link
                    href={`tel:${contact.phoneE164}`}
                    className="flex items-center gap-3 hover:text-white"
                    aria-label={`Appeler ${contact.name}`}
                  >
                    <Phone className="size-4 text-neutral-400" aria-hidden="true" />
                    {contact.phoneDisplay}
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  asChild
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="grid gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-3xl">
            Prochaine date
          </h2>
          <Separator className="my-4 bg-white/10" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Card className="border-white/10 bg-white/5">
            <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="text-sm text-neutral-400">
                  {nextEvent
                    ? formatDateFR(nextEvent.dateISO)
                    : "Nouvelles dates à venir"}
                </div>
                <div className="mt-2 text-lg font-[var(--font-display)] text-white">
                  {nextEvent
                    ? `${nextEvent.venue} — ${nextEvent.city}`
                    : "Inscrivez-vous pour être informé"}
                </div>
              </div>
              <div className="flex items-center">
                {nextEvent ? (
                  nextEvent.ticketUrl === "#" ? (
                    <Button
                      asChild
                      className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
                    >
                      <Link href="/dates#notify">Être prévenu</Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
                    >
                      <Link href="/dates#billetterie">Réserver</Link>
                    </Button>
                  )
                ) : (
                  <Button
                    asChild
                    className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
                  >
                    <Link href="/dates#notify">Être prévenu</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Link
            href="/dates"
            className="text-sm text-neutral-300 underline-offset-4 hover:underline"
          >
            Voir toutes les dates
          </Link>
        </motion.div>
      </section>

      <div className="fixed inset-x-4 bottom-4 z-40 rounded-full border border-white/10 bg-neutral-950/90 px-4 py-3 shadow-lg backdrop-blur md:hidden">
        <Button
          asChild
          className="h-11 w-full rounded-full bg-white text-sm font-semibold text-neutral-900"
        >
          <Link href="/dates#billetterie">Réserver</Link>
        </Button>
      </div>
      </div>
    </Container>
  );
}
