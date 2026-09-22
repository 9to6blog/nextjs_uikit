import { Badge } from "../badge.js";
import { BlockLink, type Article } from "./shared.js";
export type FeaturedStoryProps = {
  article: Article;
  eyebrow?: string;
  className?: string;
};
export function FeaturedStory({
  article,
  eyebrow = "추천 글",
  className,
}: FeaturedStoryProps) {
  return (
    <article className={`n-block n-block-featured ${className ?? ""}`}>
      <div className="n-block-featured-art">{article.artwork}</div>
      <div>
        <Badge>{eyebrow}</Badge>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="n-block-meta">
          <span>{article.category}</span>
          <span>{article.readingTime}</span>
        </div>
        <BlockLink href={article.href}>이야기 읽기</BlockLink>
      </div>
    </article>
  );
}
