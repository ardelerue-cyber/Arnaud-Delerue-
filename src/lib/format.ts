import type { Event, EventStatus } from "@/data/events";

type BadgeVariant = "default" | "secondary" | "outline";

function parseEventDate(dateTime: string | null | undefined) {
  if (!dateTime) {
    return null;
  }

  const parsed = new Date(dateTime);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDateFR(dateTime: string | null | undefined) {
  const date = parseEventDate(dateTime);

  if (!date) {
    return "Sur demande";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  }).format(date);
}

export function formatDateShortFR(dateTime: string | null | undefined) {
  const date = parseEventDate(dateTime);

  if (!date) {
    return "Sur demande";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);
}

export function isPast(dateTime: string | null | undefined) {
  const date = parseEventDate(dateTime);
  return date ? date.getTime() < Date.now() : false;
}

function getSortWeight(status: EventStatus) {
  if (status === "private") {
    return 2;
  }

  if (status === "past") {
    return 3;
  }

  return 1;
}

export function sortEventsByDate(events: Event[]) {
  return [...events].sort((a, b) => {
    const aDate = parseEventDate(a.dateTime);
    const bDate = parseEventDate(b.dateTime);
    const aWeight = getSortWeight(a.status);
    const bWeight = getSortWeight(b.status);

    if (aWeight !== bWeight) {
      return aWeight - bWeight;
    }

    if (!aDate && !bDate) {
      return a.title.localeCompare(b.title, "fr");
    }

    if (!aDate) {
      return 1;
    }

    if (!bDate) {
      return -1;
    }

    if (a.status === "past" && b.status === "past") {
      return bDate.getTime() - aDate.getTime();
    }

    return aDate.getTime() - bDate.getTime();
  });
}

export function getUpcomingEvents(events: Event[]) {
  return sortEventsByDate(
    events.filter((event) => {
      if (event.status === "private" || event.status === "past") {
        return false;
      }

      const date = parseEventDate(event.dateTime);
      return Boolean(date && date.getTime() >= Date.now());
    })
  );
}

export function getPastEvents(events: Event[]) {
  return sortEventsByDate(
    events.filter((event) => {
      if (event.status === "past") {
        return true;
      }

      const date = parseEventDate(event.dateTime);
      return Boolean(date && date.getTime() < Date.now());
    }).map((event) => ({ ...event, status: "past" as const }))
  );
}

export function getPrivateEvents(events: Event[]) {
  return events.filter((event) => event.status === "private");
}

export function getNextPublicEvent(events: Event[]) {
  return (
    getUpcomingEvents(events).find(
      (event) => event.status !== "private" && Boolean(parseEventDate(event.dateTime))
    ) ?? null
  );
}

export function hasUpcomingEvents(events: Event[]) {
  return getUpcomingEvents(events).length > 0;
}

export function canReserveEvent(event: Event) {
  return (
    event.status === "upcoming" &&
    Boolean(event.ticketUrl) &&
    !isPast(event.dateTime)
  );
}

export function getEventStatusLabel(status: EventStatus) {
  switch (status) {
    case "upcoming":
      return "À venir";
    case "sold_out":
      return "Complet";
    case "past":
      return "Passé";
    case "private":
      return "Privé / sur demande";
    default:
      return status;
  }
}

export function getEventStatusVariant(status: EventStatus): BadgeVariant {
  switch (status) {
    case "upcoming":
      return "default";
    case "sold_out":
      return "secondary";
    case "past":
      return "outline";
    case "private":
      return "secondary";
    default:
      return "outline";
  }
}
