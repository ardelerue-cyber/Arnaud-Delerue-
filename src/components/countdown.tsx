"use client";

import * as React from "react";

type CountdownProps = {
  eventDate?: string | null;
};

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function getTargetTimestamp(eventDate?: string | null) {
  if (!eventDate) {
    return null;
  }

  const target = new Date(eventDate).getTime();
  return Number.isNaN(target) ? null : target;
}

export function Countdown({ eventDate = null }: CountdownProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(() => formatCountdown(0));

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const target = getTargetTimestamp(eventDate);

    if (!target || target <= Date.now()) {
      setIsActive(false);
      setTimeLeft(formatCountdown(0));
      return;
    }

    const tick = () => {
      const next = target - Date.now();
      setIsActive(next > 0);
      setTimeLeft(formatCountdown(next));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [eventDate]);

  const target = getTargetTimestamp(eventDate);

  if (!mounted || !target || !isActive) {
    return null;
  }

  const items = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Secondes", value: timeLeft.seconds },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur"
        >
          <div className="text-3xl font-semibold text-white sm:text-4xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
