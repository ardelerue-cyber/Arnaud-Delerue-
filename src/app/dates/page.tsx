"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { events } from "@/data/events";
import { formatDateFR, sortByDateUpcomingFirst } from "@/lib/format";
import { contact } from "@/data/contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import { WeezeventWidget } from "@/components/weezevent-widget";
import { Container } from "@/components/container";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function DatesPage() {
  const notifyRef = React.useRef<HTMLDivElement | null>(null);
  const sorted = React.useMemo(() => sortByDateUpcomingFirst(events), []);

  const handleNotifyScroll = () => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNotifySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Merci ! Vous serez prévenu des prochaines dates.");
    event.currentTarget.reset();
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
          <h1 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-5xl">
            Dates &amp; Billetterie
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base leading-relaxed">
            Réservez vos places pour les prochaines dates. Les jauges sont
            limitées, soyez les premiers à confirmer votre présence.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid gap-4"
        >
          {sorted.map((event) => {
            const isSoon = event.ticketUrl === "#";
            const badgeLabel = isSoon ? "Prochainement" : "Réserver";

            return (
              <Card
                key={event.id}
                className="border-white/10 bg-white/5 backdrop-blur"
              >
                <CardHeader>
                  <Badge variant={isSoon ? "secondary" : "default"}>
                    {badgeLabel}
                  </Badge>
                  <CardTitle className="font-[var(--font-display)] text-white">
                    {event.title}
                  </CardTitle>
                  <div className="text-sm text-neutral-400">
                    {formatDateFR(event.dateISO)} · {event.venue} — {event.city}
                  </div>
                </CardHeader>
                <CardFooter>
                  {isSoon ? (
                    <Button
                      onClick={handleNotifyScroll}
                      className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                    >
                      Réserver
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
                    >
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Réserver
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </motion.div>
      </section>

      <section id="billetterie" className="grid gap-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
            Billetterie
          </h2>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base leading-relaxed">
            Réservez vos places en ligne.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <WeezeventWidget />
        </motion.div>
      </section>

      <section ref={notifyRef} id="notify" className="grid gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
            Être prévenu des prochaines dates
          </h2>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base leading-relaxed">
            Laissez votre email pour recevoir les nouvelles dates en avant
            première.
          </p>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          onSubmit={handleNotifySubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            name="email"
            required
            placeholder="Votre email"
            aria-label="Votre email"
          />
          <Button
            type="submit"
            className="h-11 w-full rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 sm:w-auto"
          >
            Être prévenu
          </Button>
        </motion.form>
      </section>

      <section className="grid gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
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
              <AccordionTrigger>Remboursement</AccordionTrigger>
              <AccordionContent>
                Les billets ne sont pas remboursables, mais échangeables selon
                disponibilités.
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
                <h2 className="text-3xl font-[var(--font-display)] text-white sm:text-4xl lg:text-4xl">
                  Programmateurs / Bookings
                </h2>
                <p className="mt-2 text-sm text-neutral-400 sm:text-base leading-relaxed">
                  Pour organiser une date, contactez l&apos;équipe artistique.
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
      </div>
    </Container>
  );
}
