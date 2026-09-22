"use client";
import { Icon } from "./icons.js";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "./button.js";
import { useReducedMotion } from "./use-reduced-motion.js";
export type CarouselProps = {
  slides: ReactNode[];
  label: string;
  loop?: boolean;
  className?: string;
};
export function Carousel({
  slides,
  label,
  loop = false,
  className,
}: CarouselProps) {
  const reducedMotion = useReducedMotion();
  const [ref, api] = useEmblaCarousel({
    loop,
    duration: reducedMotion ? 0 : 25,
  });
  const [state, setState] = useState({
    previous: false,
    next: slides.length > 1,
    index: 0,
  });
  const update = useCallback(() => {
    if (api)
      setState({
        previous: api.canScrollPrev(),
        next: api.canScrollNext(),
        index: api.selectedScrollSnap(),
      });
  }, [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", update).on("reInit", update);
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      api.off("select", update).off("reInit", update);
    };
  }, [api, update]);
  return (
    <section
      className={className}
      aria-label={label}
      aria-roledescription="carousel"
    >
      <div ref={ref} className="n-carousel-viewport">
        <div className="n-carousel-track">
          {slides.map((slide, i) => (
            <div
              className="n-carousel-slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              inert={i !== state.index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className="n-carousel-controls">
        <Button
          variant="outline"
          size="sm"
          aria-label="이전 슬라이드"
          disabled={!state.previous}
          onClick={() => api?.scrollPrev(reducedMotion)}
        >
          <Icon name="arrow-left" />
        </Button>
        <span aria-live="polite">
          {slides.length ? state.index + 1 : 0} / {slides.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          aria-label="다음 슬라이드"
          disabled={!state.next}
          onClick={() => api?.scrollNext(reducedMotion)}
        >
          <Icon name="arrow-right" />
        </Button>
      </div>
    </section>
  );
}
