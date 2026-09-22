import type { BlockProps } from "./shared.js";
export type StatsBandProps = BlockProps & {
  stats: { label: string; value: string; detail: string }[];
};
export function StatsBand({
  title,
  description,
  stats,
  className,
}: StatsBandProps) {
  return (
    <section className={`n-block n-block-stats-band ${className ?? ""}`}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <dl>
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              {s.value}
              <small>{s.detail}</small>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
