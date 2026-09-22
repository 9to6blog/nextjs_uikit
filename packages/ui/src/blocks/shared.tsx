import type { ReactNode } from "react";
import { Card } from "../card.js";
import { Icon } from "../icons.js";
export type BlockProps = {
  title: string;
  description?: string;
  className?: string;
};
export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  href: string;
  date?: string;
  readingTime?: string;
  artwork?: ReactNode;
};
export function BlockShell({
  title,
  description,
  className,
  children,
  action,
}: BlockProps & { children: ReactNode; action?: ReactNode }) {
  return (
    <Card className={`n-block ${className ?? ""}`}>
      <header className="n-block-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </Card>
  );
}
export function BlockLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className="n-button n-block-link"
      data-variant={secondary ? "outline" : "primary"}
      data-size="md"
      href={href}
    >
      <span className="n-button-label">
        {children}
        <Icon name="arrow-up-right" />
      </span>
    </a>
  );
}
export function ArticleTile({ article }: { article: Article }) {
  return (
    <article className="n-block-article">
      {article.artwork && (
        <div className="n-block-artwork">{article.artwork}</div>
      )}
      <div className="n-block-meta">
        <span>{article.category}</span>
        <span>{article.readingTime}</span>
      </div>
      <h3>
        <a href={article.href}>{article.title}</a>
      </h3>
      <p>{article.excerpt}</p>
      {article.date && <span className="n-block-muted">{article.date}</span>}
    </article>
  );
}
