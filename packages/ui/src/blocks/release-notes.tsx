import { Badge } from "../badge.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type ReleaseNotesProps = BlockProps & {
  releases: {
    version: string;
    date: string;
    title: string;
    changes: string[];
  }[];
};
export function ReleaseNotes({ releases, ...props }: ReleaseNotesProps) {
  return (
    <BlockShell {...props}>
      <ol className="n-block-releases">
        {releases.map((r) => (
          <li key={r.version}>
            <div>
              <Badge>{r.version}</Badge>
              <time dateTime={r.date}>{r.date}</time>
            </div>
            <section>
              <h3>{r.title}</h3>
              <ul>
                {r.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ol>
    </BlockShell>
  );
}
