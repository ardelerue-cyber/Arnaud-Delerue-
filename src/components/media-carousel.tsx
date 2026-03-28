"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MediaImage = {
  src: string;
  alt: string;
};

type MediaCarouselProps = {
  images: MediaImage[];
  className?: string;
};

const swipeConfidenceThreshold = 80;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

export function MediaCarousel({ images, className }: MediaCarouselProps) {
  const [[index, direction], setIndex] = React.useState([0, 0]);

  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      const nextIndex = (prevIndex + newDirection + images.length) % images.length;
      return [nextIndex, newDirection];
    });
  };

  const active = images[index];

  if (!active) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 900px, (min-width: 768px) 80vw, 100vw"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
            onClick={() => paginate(-1)}
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
            onClick={() => paginate(1)}
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2" role="tablist" aria-label="Sélecteur de photo">
          {images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full transition",
                dotIndex === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
              )}
              onClick={() => setIndex([dotIndex, dotIndex > index ? 1 : -1])}
              aria-label={`Aller à la photo ${dotIndex + 1}`}
              aria-current={dotIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
