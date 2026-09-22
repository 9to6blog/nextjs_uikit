import type { ReactNode } from "react";
import { BlockShell, type BlockProps } from "./shared.js";
export type FeatureGridProps = BlockProps & {
  features: {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    href?: string;
  }[];
};
export function FeatureGrid({ features, ...props }: FeatureGridProps) {
  return (
    <BlockShell {...props}>
      <div className="n-block-grid n-block-features">
        {features.map((f) => (
          <article key={f.id}>
            <span className="n-block-symbol" aria-hidden="true">
              {f.icon}
            </span>
            <h3>{f.href ? <a href={f.href}>{f.title}</a> : f.title}</h3>
            <p>{f.description}</p>
          </article>
        ))}
      </div>
    </BlockShell>
  );
}
