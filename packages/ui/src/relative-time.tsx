"use client";
import { useEffect, useState } from "react";
export type TimeZoneEntry = { label: string; timeZone: string };
const defaultZones: TimeZoneEntry[] = [
  { label: "EST", timeZone: "Etc/GMT+5" },
  { label: "GMT", timeZone: "UTC" },
  { label: "JST", timeZone: "Asia/Tokyo" },
];
/** Pass a serialized initialTime for deterministic SSR; ticks start after hydration. */
export function RelativeTime({
  initialTime,
  zones = defaultZones,
  locale = "en-US",
  live = true,
  label = "시간대별 현재 시각",
}: {
  initialTime: string;
  zones?: TimeZoneEntry[];
  locale?: string;
  live?: boolean;
  label?: string;
}) {
  const [now, setNow] = useState(initialTime);
  useEffect(() => {
    if (!live) return;
    const timer = setInterval(() => setNow(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, [live]);
  const date = new Date(now);
  if (Number.isNaN(date.getTime()))
    return <p role="status">유효하지 않은 날짜입니다.</p>;
  return (
    <div className="n-relative-time" role="group" aria-label={label}>
      {zones.map((zone) => {
        try {
          const day = new Intl.DateTimeFormat(locale, {
            timeZone: zone.timeZone,
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(date);
          const time = new Intl.DateTimeFormat(locale, {
            timeZone: zone.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).format(date);
          return (
            <div className="n-time-row" key={zone.label}>
              <abbr title={zone.timeZone}>{zone.label}</abbr>
              <span>{day}</span>
              <time dateTime={date.toISOString()}>{time}</time>
            </div>
          );
        } catch {
          return <p key={zone.label}>{zone.label}: 지원하지 않는 시간대</p>;
        }
      })}
    </div>
  );
}
