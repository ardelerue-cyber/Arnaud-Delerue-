"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { events } from "@/data/events";
import { contact } from "@/data/contact";
import {
  canReserveEvent,
  getNextPublicEvent,
  getPastEvents,
  getPrivateEvents,
  getUpcomingEvents,
  hasUpcomingEvents,
} from "@/lib/format";
import { Container } from "@/components/container";
import { EventCard } from "@/components/event-card";
import { FinalCta } from "@/components/final-cta";
import { NotifyForm } from "@/components/notify-form";
import { ReassuranceStrip } from "@/components/reassurance-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { WeezeventWidget } from "@/components/weezevent-widget";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function DatesPageClient() {
  const notifyRef = React.useRef<HTMLDivElement | null>(null);
  const upcomingEvents = React.useMemo(() => getUpcomingEvents(events), []);
  const pastEvents = React.useMemo(() => getPastEvents(events), []);
  const privateEvents = React.useMemo(() => getPrivateEvents(events), []);
  const nextEvent = React.useMemo(() => getNextPublicEvent(events), []);
  const hasUpcoming = React.useMemo(() => hasUpcomingEvents(events), []);

  const handleNotifyScroll = () => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col gap-16">
        <section className="grid gap-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="mb-4">
              {hasUpcoming ? "Billetterie ouverte" : "Agenda en préparation"}
            </Badge>
            <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
              Dates &amp; billetterie
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              {hasUpcoming
                ? "Retrouvez ici les prochaines représentations publiques et les informations de réservation."
                : "Les prochaines dates publiques seront annoncées prochainement. Vous pouvez déjà vous inscrire pour être informé ou contacter l'équipe pour une programmation privée."}
            </p>
          </motion.div>

          {hasUpcoming ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="grid gap-4"
            >
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onNotifyClick={handleNotifyScroll}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <Card className="border-white/10 bg-white/5">
                <CardContent className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
                      Nouvelles dates bientôt annoncées
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
                      Le spectacle continue sa route. Laissez votre email pour
                      être informé en priorité des prochaines représentations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <Button
                      asChild
                      className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900"
                    >
                      <Link href="#notify">Être prévenu</Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="h-11 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
                    >
                      <Link href="/contact">Programmer le spectacle</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {nextEvent && canReserveEvent(nextEvent) && nextEvent.ticketUrl ? (
          <section id="billetterie" className="grid gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
                Billetterie
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400 sm:text-base">
                Réservez vos places en ligne pour la prochaine date publique.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <WeezeventWidget url={nextEvent.ticketUrl} />
            </motion.div>
          </section>
        ) : null}

        <section ref={notifyRef} id="notify" className="grid gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
              Être prévenu des prochaines dates
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Laissez votre email pour recevoir les nouvelles dates en priorité.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <NotifyForm className="flex flex-col gap-3 sm:flex-row" />
          </motion.div>
        </section>

        <ReassuranceStrip />

        {privateEvents.length > 0 ? (
          <section className="grid gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
                Programmation privée
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                Pour les lieux, hôtels, restaurants ou événements privés, le
                spectacle peut être accueilli sur demande.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="grid gap-4"
            >
              {privateEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </section>
        ) : null}

        {pastEvents.length > 0 ? (
          <section className="grid gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
                Dates passées
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                Quelques dates déjà jouées, conservées ici comme repère de
                parcours et preuve sociale.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="grid gap-4"
            >
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </section>
        ) : null}

        <section className="grid gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
              FAQ
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="horaires">
                <AccordionTrigger>Horaires et durée</AccordionTrigger>
                <AccordionContent>
                  Accueil 19h15. Début du spectacle à 20h00. Durée environ 1h30.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="acces">
                <AccordionTrigger>Accès et placement</AccordionTrigger>
                <AccordionContent>
                  Un plan d&apos;accès est envoyé après réservation. Placement libre
                  selon votre arrivée.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="remboursement">
                <AccordionTrigger>Billetterie et remboursement</AccordionTrigger>
                <AccordionContent>
                  Les billets ne sont pas remboursables. En cas de date complète,
                  inscrivez-vous pour être informé des prochaines ouvertures.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="border-white/10 bg-white/5">
              <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl">
                    Vous êtes programmateur ?
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                    Vous souhaitez accueillir &apos;Une dernière pour la route&apos;
                    dans votre établissement ou votre événement privé ? Contactez
                    l&apos;équipe pour recevoir les disponibilités, les conditions
                    techniques et les informations de programmation.
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
                    <Link href="/contact">Contacter l&apos;équipe</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <FinalCta variant="audience" />
      </div>
    </Container>
  );
}
