"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type WeezeventWindow = Window & {
  weezevent?: {
    refresh?: () => void;
    init?: () => void;
  };
  weez?: {
    refresh?: () => void;
    init?: () => void;
  };
};

type WeezeventWidgetProps = {
  url: string;
};

export function WeezeventWidget({ url }: WeezeventWidgetProps) {
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as WeezeventWindow;

    if (win.weezevent?.refresh) {
      win.weezevent.refresh();
    } else if (win.weezevent?.init) {
      win.weezevent.init();
    }

    if (win.weez?.refresh) {
      win.weez.refresh();
    } else if (win.weez?.init) {
      win.weez.init();
    }
  }, [url]);

  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <div className="min-h-[900px] w-full sm:min-h-[750px] md:min-h-[800px]">
          <a
            className="weezevent-widget-integration block h-full w-full"
            href={url}
            data-src={url}
            data-width="650"
            data-height="600"
            data-resize="1"
            data-width_auto="1"
            data-noscroll="0"
            data-use-container="yes"
            data-type="neo"
            aria-label="Billetterie Weezevent"
          >
            Billetterie Weezevent
          </a>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
          <Button
            asChild
            className="h-10 w-full rounded-full bg-white px-5 text-sm font-semibold text-neutral-900 sm:w-auto"
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir la billetterie dans un nouvel onglet"
            >
              Ouvrir la billetterie
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
