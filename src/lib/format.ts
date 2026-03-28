import type { Event } from "@/data/events";

export function formatDateFR(dateISO: string) {
  const date = new Date(dateISO);
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = get("weekday");
  const day = get("day");
  const month = get("month");
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");

  return `${weekday} ${day} ${month} ${year} — ${hour}:${minute}`;
}

export function isPast(dateISO: string) {
  return new Date(dateISO).getTime() < Date.now();
}

export function sortByDateUpcomingFirst(events: Event[]) {
  const now = Date.now();
  return [...events].sort((a, b) => {
    const aTime = new Date(a.dateISO).getTime();
    const bTime = new Date(b.dateISO).getTime();
    const aPast = aTime < now;
    const bPast = bTime < now;

    if (aPast !== bPast) {
      return aPast ? 1 : -1;
    }

    return aTime - bTime;
  });
}

export function getNextEvent(events: Event[]) {
  const sorted = sortByDateUpcomingFirst(events);
  const next = sorted.find((event) => !isPast(event.dateISO));
  return next ?? null;
}
