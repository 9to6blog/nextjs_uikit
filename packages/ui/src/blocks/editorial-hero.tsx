import type { ReactNode } from "react";
import { Badge } from "../badge.js";
import { BlockLink, type BlockProps } from "./shared.js";
export type EditorialHeroProps = BlockProps & {
  eyebrow?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  artwork?: ReactNode;
};
export function EditorialHero({
  title,
  description,
  eyebrow,
  primary,
  secondary,
  artwork,
  className,
}: EditorialHeroProps) {
  return (
    <section className={`n-block n-block-hero ${className ?? ""}`}>
      <div>
        {eyebrow && <Badge>{eyebrow}</Badge>}
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="n-block-actions">
          <BlockLink href={primary.href}>{primary.label}</BlockLink>
          {secondary && (
            <BlockLink href={secondary.href} secondary>
              {secondary.label}
            </BlockLink>
          )}
        </div>
      </div>
      {artwork && <div className="n-block-hero-art">{artwork}</div>}
    </section>
  );
}
