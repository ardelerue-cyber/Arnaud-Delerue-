export type Event = {
  id: string;
  title: string;
  dateISO: string;
  city: string;
  venue: string;
  ticketUrl: string;
  status: "soon" | "open" | "onSale" | "soldout" | "cancelled";
};

export const events: Event[] = [
  {
    id: "le-touquet-2026-03-14",
    title: "Une dernière pour la route",
    dateISO: "2026-03-14T20:00:00+01:00",
    city: "Le Touquet",
    venue: "Domaine de la Petite Forêt",
    ticketUrl:
      "https://widget.weezevent.com/ticket/E1724407/?code=11172&locale=fr-FR&width_auto=1&color_primary=00AEEF",
    status: "onSale",
  },
];
