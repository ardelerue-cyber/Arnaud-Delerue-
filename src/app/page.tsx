import type { Metadata } from "next";
import { HomePageClient } from "@/components/pages/home-page";
import { events } from "@/data/events";
import { siteConfig } from "@/data/site";
import { getNextPublicEvent } from "@/lib/format";

const nextEvent = getNextPublicEvent(events);

export const metadata: Metadata = {
  title: `${siteConfig.title} | Dates, billetterie et programmation`,
  description:
    "Découvrez le spectacle 'Une dernière pour la route' d'Arnaud Delerue, les prochaines dates publiques et les informations de réservation ou de programmation.",
  openGraph: {
    title: `${siteConfig.title} | Arnaud Delerue`,
    description:
      "Spectacle musical et vivant d'Arnaud Delerue. Dates, billetterie, presse et contact booking.",
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.title} | Arnaud Delerue`,
    description:
      "Spectacle musical et vivant d'Arnaud Delerue. Dates, billetterie, presse et contact booking.",
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  const eventJsonLd =
    nextEvent && nextEvent.ticketUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: nextEvent.title,
          startDate: nextEvent.dateTime,
          eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: nextEvent.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: nextEvent.city,
              addressCountry: "FR",
            },
          },
          organizer: {
            "@type": "Person",
            name: "Arnaud Delerue",
            url: siteConfig.url,
          },
          offers: {
            "@type": "Offer",
            url: nextEvent.ticketUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : null;

  return (
    <>
      {eventJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      ) : null}
      <HomePageClient />
    </>
  );
}
