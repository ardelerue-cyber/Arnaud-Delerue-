"use client";

import * as React from "react";

const TARGET_DAY = 14;
const TARGET_MONTH = 3;
const TARGET_HOUR = 20;
const TARGET_MINUTE = 0;
const TARGET_SECOND = 0;
const TARGET_TIME_ZONE = "Europe/Paris";

function getTimeZoneOffset(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const utcTime = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );

  return (utcTime - date.getTime()) / 60000;
}

function getTargetTimestamp(year: number) {
  const utcGuess = Date.UTC(
    year,
    TARGET_MONTH - 1,
    TARGET_DAY,
    TARGET_HOUR,
    TARGET_MINUTE,
    TARGET_SECOND
  );
  const offset = getTimeZoneOffset(new Date(utcGuess), TARGET_TIME_ZONE);
  return utcGuess - offset * 60000;
}

function getNextTargetDate(now: Date) {
  const currentYear = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TARGET_TIME_ZONE,
      year: "numeric",
    }).format(now)
  );

  const thisYearTarget = getTargetTimestamp(currentYear);
  if (now.getTime() < thisYearTarget) {
    return thisYearTarget;
  }

  return getTargetTimestamp(currentYear + 1);
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState(() =>
    formatCountdown(getNextTargetDate(new Date()) - Date.now())
  );

  React.useEffect(() => {
    const tick = () => {
      const target = getNextTargetDate(new Date());
      setTimeLeft(formatCountdown(target - Date.now()));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

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
