"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type VideoEmbedProps = {
  youtubeId: string;
  title: string;
  variant?: "short" | "full";
  className?: string;
};

export function VideoEmbed({
  youtubeId,
  title,
  variant = "full",
  className,
}: VideoEmbedProps) {
  const ratioClass = variant === "short" ? "aspect-[9/16]" : "aspect-[16/9]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-lg",
        ratioClass,
        className
      )}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
