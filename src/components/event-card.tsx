import Link from "next/link";
import type { Event } from "@/data/events";
import { canReserveEvent, formatDateFR } from "@/lib/format";
import { EventStatusBadge } from "@/components/event-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type EventCardProps = {
  event: Event;
  onNotifyClick?: () => void;
};

export function EventCard({ event, onNotifyClick }: EventCardProps) {
  const canReserve = canReserveEvent(event);

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-3">
          <EventStatusBadge status={event.status} />
          {event.featured ? (
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Mise en avant
            </span>
          ) : null}
        </div>
        <CardTitle className="font-[var(--font-display)] text-white">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-neutral-200">
          {formatDateFR(event.dateTime)}
        </div>
        <div className="text-sm text-neutral-400">
          {event.venue} {event.city ? `· ${event.city}` : ""}
        </div>
        {event.description ? (
          <p className="text-sm leading-relaxed text-neutral-400">
            {event.description}
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        {canReserve ? (
          <Button
            asChild
            className="h-10 rounded-full bg-white px-5 text-sm font-semibold text-neutral-900"
          >
            <a href={event.ticketUrl} target="_blank" rel="noreferrer">
              Réserver
            </a>
          </Button>
        ) : null}
        {event.status === "sold_out" ? (
          <Button
            type="button"
            onClick={onNotifyClick}
            className="h-10 rounded-full bg-white px-5 text-sm font-semibold text-neutral-900"
          >
            Être prévenu
          </Button>
        ) : null}
        {event.status === "private" ? (
          <Button
            asChild
            variant="secondary"
            className="h-10 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20"
          >
            <Link href="/contact">Programmer le spectacle</Link>
          </Button>
        ) : null}
        {event.status === "past" ? (
          <Button
            asChild
            variant="secondary"
            className="h-10 rounded-full border border-white/20 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Link href="/spectacle">Découvrir le spectacle</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
