import { BlockShell, type BlockProps } from "./shared.js";
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};
export type TestimonialsProps = BlockProps & { items: Testimonial[] };
export function Testimonials({ items, ...props }: TestimonialsProps) {
  return (
    <BlockShell {...props}>
      <div className="n-block-grid n-block-quotes">
        {items.map((i) => (
          <figure key={i.id}>
            <span aria-hidden="true" className="n-block-quote-mark">
              “
            </span>
            <blockquote>{i.quote}</blockquote>
            <figcaption>
              <span className="n-block-initial" aria-hidden="true">
                {i.name.slice(0, 1)}
              </span>
              <div>
                <strong>{i.name}</strong>
                <p>{i.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </BlockShell>
  );
}
