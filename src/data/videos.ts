export type Video = {
  id: string;
  title: string;
  youtubeId: string;
  kind: "short" | "full";
  durationLabel: string;
};

export const videos: Video[] = [
  {
    id: "teaser-2",
    title: "Teaser — 2 min",
    youtubeId: "DNeeg6n494E",
    kind: "short",
    durationLabel: "2 min",
  },
  {
    id: "teaser-5",
    title: "Teaser — 5 min",
    youtubeId: "Vc4nV9wS3T0",
    kind: "full",
    durationLabel: "5 min",
  },
];
