export type EventStatus = "upcoming" | "sold_out" | "past" | "private";

export type Event = {
  id: string;
  title: string;
  venue: string;
  city: string;
  dateTime: string | null;
  ticketUrl?: string;
  status: EventStatus;
  featured?: boolean;
  description?: string;
};

export const events: Event[] = [
  {
    id: "le-touquet-2026-03-14",
    title: "Une dernière pour la route",
    venue: "Domaine de la Petite Forêt",
    city: "Le Touquet",
    dateTime: "2026-03-14T20:00:00+01:00",
    ticketUrl:
      "https://widget.weezevent.com/ticket/E1724407/?code=11172&locale=fr-FR&width_auto=1&color_primary=00AEEF",
    status: "past",
    featured: true,
    description: "Soirée de lancement dans un cadre intimiste face à la mer.",
  },
  {
    id: "programmation-privee",
    title: "Programmation privée ou sur demande",
    venue: "Hôtels, restaurants, lieux de réception",
    city: "France",
    dateTime: null,
    status: "private",
    description:
      "Disponible pour des soirées privées, programmations culturelles et événements sur mesure.",
  },
];
