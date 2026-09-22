import type { ComponentProps } from "react";
const paths = {
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m6 15 6-6 6 6",
  "chevron-right": "m9 6 6 6-6 6",
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  "arrow-left": "M19 12H5m6-6-6 6 6 6",
  "arrow-up": "M12 19V5m-6 6 6-6 6 6",
  "arrow-down": "M12 5v14m-6-6 6 6 6-6",
  "arrow-up-down": "M8 20V4m-4 4 4-4 4 4m4-4v16m-4-4 4 4 4-4",
  "arrow-up-right": "M7 17 17 7M7 7h10v10",
  check: "m5 12 4 4L19 6",
  close: "m6 6 12 12M6 18 18 6",
  minus: "M5 12h14",
  grip: "M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01",
  upload: "M12 16V4m-5 5 5-5 5 5M4 16v4h16v-4",
  bookmark: "M6 4h12v17l-6-4-6 4Z",
  document: "M6 3h8l4 4v14H6ZM14 3v5h4M9 12h6M9 16h4",
  calendar:
    "M4 5h16v16H4ZM4 10h16M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01",
};
export type IconName = keyof typeof paths;
/** Decorative control icons share one SVG geometry and never depend on a font. */
export function Icon({
  name,
  className,
  ...props
}: ComponentProps<"svg"> & { name: IconName }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
      className={["n-icon", className].filter(Boolean).join(" ")}
    >
      <path d={paths[name]} />
    </svg>
  );
}
