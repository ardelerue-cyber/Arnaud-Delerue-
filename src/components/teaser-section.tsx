"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { videos } from "@/data/videos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoEmbed } from "@/components/video-embed";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function TeaserSection() {
  const shortVideo = videos.find((video) => video.kind === "short");
  const fullVideo = videos.find((video) => video.kind === "full");

  return (
    <section className="grid gap-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-[var(--font-display)] text-white">
          Teasers
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-400">
          Découvrez l&apos;énergie du spectacle avant de réserver votre place.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {shortVideo && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="space-y-3">
                <Badge variant="secondary">Teaser court</Badge>
                <CardTitle className="flex items-center gap-2 font-[var(--font-display)] text-white">
                  <Play className="size-4 text-neutral-300" />
                  {shortVideo.title}
                </CardTitle>
                <p className="text-sm text-neutral-400">
                  {shortVideo.durationLabel}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <VideoEmbed
                  youtubeId={shortVideo.youtubeId}
                  title={shortVideo.title}
                  variant="short"
                />
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
                >
                  <Link
                    href={`https://youtube.com/shorts/${shortVideo.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Voir sur YouTube
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {fullVideo && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="space-y-3">
                <Badge>Teaser long</Badge>
                <CardTitle className="flex items-center gap-2 font-[var(--font-display)] text-white">
                  <Play className="size-4 text-neutral-300" />
                  {fullVideo.title}
                </CardTitle>
                <p className="text-sm text-neutral-400">
                  {fullVideo.durationLabel}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <VideoEmbed
                  youtubeId={fullVideo.youtubeId}
                  title={fullVideo.title}
                  variant="full"
                />
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
                >
                  <Link
                    href={`https://youtu.be/${fullVideo.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Voir sur YouTube
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
