import type { ReactNode } from "react";
import { Badge } from "../badge.js";
import { BlockLink } from "./shared.js";
export type AuthorProfileProps = {
  name: string;
  bio: string;
  initials: string;
  topics: string[];
  stats: { label: string; value: string }[];
  link: { label: string; href: string };
  portrait?: ReactNode;
  className?: string;
};
export function AuthorProfile({
  name,
  bio,
  initials,
  topics,
  stats,
  link,
  portrait,
  className,
}: AuthorProfileProps) {
  return (
    <section className={`n-block n-block-profile ${className ?? ""}`}>
      <div className="n-block-profile-cover" aria-hidden="true" />
      <div className="n-block-profile-body">
        <div className="n-block-portrait">{portrait ?? initials}</div>
        <h2>{name}</h2>
        <p>{bio}</p>
        <div className="n-block-chips">
          {topics.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <dl className="n-block-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <BlockLink href={link.href}>{link.label}</BlockLink>
      </div>
    </section>
  );
}
