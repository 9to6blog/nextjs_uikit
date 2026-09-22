"use client";
import dynamic from "next/dynamic";
import type { BlockSlug } from "@/lib/blocks";
const demos = {
  "editorial-hero": dynamic(() => import("@/demos/blocks/editorial-hero")),
  "article-grid": dynamic(() => import("@/demos/blocks/article-grid")),
  "featured-story": dynamic(() => import("@/demos/blocks/featured-story")),
  "reading-list": dynamic(() => import("@/demos/blocks/reading-list")),
  "author-profile": dynamic(() => import("@/demos/blocks/author-profile")),
  "article-outline": dynamic(() => import("@/demos/blocks/article-outline")),
  "analytics-overview": dynamic(
    () => import("@/demos/blocks/analytics-overview"),
  ),
  "activity-feed": dynamic(() => import("@/demos/blocks/activity-feed")),
  "project-board": dynamic(() => import("@/demos/blocks/project-board")),
  "task-panel": dynamic(() => import("@/demos/blocks/task-panel")),
  "team-directory": dynamic(() => import("@/demos/blocks/team-directory")),
  "command-workspace": dynamic(
    () => import("@/demos/blocks/command-workspace"),
  ),
  "sign-in": dynamic(() => import("@/demos/blocks/sign-in")),
  newsletter: dynamic(() => import("@/demos/blocks/newsletter")),
  contact: dynamic(() => import("@/demos/blocks/contact")),
  "profile-settings": dynamic(() => import("@/demos/blocks/profile-settings")),
  "notification-settings": dynamic(
    () => import("@/demos/blocks/notification-settings"),
  ),
  "upload-panel": dynamic(() => import("@/demos/blocks/upload-panel")),
  pricing: dynamic(() => import("@/demos/blocks/pricing")),
  faq: dynamic(() => import("@/demos/blocks/faq")),
  testimonials: dynamic(() => import("@/demos/blocks/testimonials")),
  "feature-grid": dynamic(() => import("@/demos/blocks/feature-grid")),
  "stats-band": dynamic(() => import("@/demos/blocks/stats-band")),
  "release-notes": dynamic(() => import("@/demos/blocks/release-notes")),
};
export function BlockDemo({ slug }: { slug: BlockSlug }) {
  const Demo = demos[slug];
  return (
    <div className="block-demo" data-block={slug}>
      <Demo />
    </div>
  );
}
