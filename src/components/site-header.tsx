"use client";

import Link from "next/link";
import { Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { contact } from "@/data/contact";
import { events } from "@/data/events";
import { canReserveEvent, getNextPublicEvent } from "@/lib/format";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Spectacle", href: "/spectacle" },
  { label: "Dates", href: "/dates" },
  { label: "Presse", href: "/presse" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const nextEvent = getNextPublicEvent(events);
  const primaryHref =
    nextEvent && canReserveEvent(nextEvent) ? "/dates#billetterie" : "/dates#notify";
  const primaryLabel =
    nextEvent && canReserveEvent(nextEvent) ? "Réserver" : "Être informé";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-[var(--font-display)] tracking-[0.18em] text-neutral-100 uppercase sm:text-base"
        >
          Arnaud Delerue
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-neutral-200 transition hover:border-white/40 hover:text-white"
          >
            <Instagram className="size-4" aria-hidden="true" />
          </a>
          <Button
            asChild
            className="h-10 rounded-full bg-neutral-100 px-6 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-100 hover:bg-white/10"
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-950 text-neutral-100">
              <SheetHeader>
                <SheetTitle className="text-left font-[var(--font-display)] tracking-[0.2em] uppercase">
                  Arnaud Delerue
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4 bg-white/10" />
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-300 transition-colors hover:text-neutral-100"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-neutral-100"
                  >
                    <Instagram className="size-4" aria-hidden="true" />
                    Instagram
                  </a>
                </SheetClose>
              </div>
              <Separator className="my-6 bg-white/10" />
              <SheetClose asChild>
                <Button
                  asChild
                  className="h-11 rounded-full bg-neutral-100 px-6 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white"
                >
                  <Link href={primaryHref}>{primaryLabel}</Link>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
