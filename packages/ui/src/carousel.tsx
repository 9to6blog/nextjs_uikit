"use client";
import { Icon } from "./icons.js";
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { Button } from "./button.js";
import { useReducedMotion } from "./use-reduced-motion.js";
import { cn } from "./utils.js";
export type CarouselProps = {
  slides: ReactNode[];
  label: string;
  loop?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
  /** Percentage width per slide on larger screens. Mobile uses a full slide. */
  slideSize?: string;
  height?: number;
  transition?: "slide" | "fade";
  controlLabels?: {
    previous: string;
    next: string;
    start: string;
    stop: string;
    reduced: string;
    choose: string;
    slide: (index: number) => string;
  };
  dots?: boolean;
  thumbnails?: ReactNode[];
  /** Focus and manual navigation pause until explicitly resumed. */
  autoplay?: boolean;
  interval?: number;
  onIndexChange?: (index: number) => void;
};
export function Carousel({
  slides,
  label,
  loop = false,
  className,
  orientation = "horizontal",
  slideSize = "100%",
  height = 300,
  transition = "slide",
  controlLabels,
  dots = false,
  thumbnails,
  autoplay = false,
  interval = 5000,
  onIndexChange,
}: CarouselProps) {
  const reducedMotion = useReducedMotion();
  const [ref, api] = useEmblaCarousel(
    {
      loop,
      axis: orientation === "vertical" ? "y" : "x",
      align: "start",
      inViewThreshold: 0.5,
      duration: reducedMotion ? 0 : 25,
    },
    transition === "fade" ? [Fade()] : [],
  );
  const [state, setState] = useState({
    previous: false,
    next: slides.length > 1,
    index: 0,
    snaps: slides.length,
    visible: [0],
  });
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const playing =
    autoplay &&
    !stopped &&
    !hovered &&
    !hidden &&
    visible &&
    !reducedMotion &&
    state.snaps > 1;
  const update = useCallback(() => {
    if (api)
      setState({
        previous: api.canScrollPrev(),
        next: api.canScrollNext(),
        index: api.selectedScrollSnap(),
        snaps: slides.length ? api.scrollSnapList().length : 0,
        visible: api.slidesInView(),
      });
  }, [api, slides.length]);
  useEffect(() => {
    if (!api) return;
    const changed = () => {
      update();
      onIndexChange?.(api.selectedScrollSnap());
    };
    const pause = () => setStopped(true);
    api
      .on("select", changed)
      .on("reInit", update)
      .on("slidesInView", update)
      .on("pointerDown", pause);
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      api
        .off("select", changed)
        .off("reInit", update)
        .off("slidesInView", update)
        .off("pointerDown", pause);
    };
  }, [api, update, onIndexChange]);
  useEffect(() => {
    const changed = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", changed);
    return () => document.removeEventListener("visibilitychange", changed);
  }, []);
  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setInterval(
      () => (api.canScrollNext() ? api.scrollNext() : api.scrollTo(0)),
      Number.isFinite(interval) ? Math.max(1000, interval) : 5000,
    );
    return () => window.clearInterval(timer);
  }, [api, playing, interval]);
  const move = (direction: "previous" | "next") => {
    setStopped(true);
    if (direction === "previous") api?.scrollPrev(reducedMotion);
    else api?.scrollNext(reducedMotion);
  };
  return (
    <section
      ref={root}
      className={cn("n-carousel", className)}
      aria-label={label}
      aria-roledescription="carousel"
      data-orientation={orientation}
      data-transition={transition}
      data-playing={playing}
      style={
        {
          "--n-slide-size": slideSize,
          "--n-carousel-height": `${height}px`,
        } as CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setStopped(true)}
      onKeyDown={(event) => {
        const target = event.target as HTMLElement;
        if (target.isContentEditable || target.closest("input,textarea,select"))
          return;
        const prev = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
        const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
        if (event.key === prev || event.key === next) {
          event.preventDefault();
          move(event.key === prev ? "previous" : "next");
        }
      }}
    >
      {autoplay && (
        <Button
          className="n-carousel-rotation"
          variant="ghost"
          size="sm"
          data-rotation-control
          disabled={reducedMotion || slides.length < 2}
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => setStopped(!stopped)}
        >
          {reducedMotion
            ? (controlLabels?.reduced ?? "자동 재생 꺼짐 · 모션 감소")
            : stopped
              ? (controlLabels?.start ?? "자동 재생 시작")
              : (controlLabels?.stop ?? "자동 재생 정지")}
        </Button>
      )}
      <div ref={ref} className="n-carousel-viewport">
        <div className="n-carousel-track">
          {slides.map((slide, i) => (
            <div
              className="n-carousel-slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              inert={!state.visible.includes(i)}
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
          aria-label={controlLabels?.previous ?? "이전 슬라이드"}
          disabled={!state.previous}
          onClick={() => move("previous")}
        >
          <Icon name={orientation === "vertical" ? "arrow-up" : "arrow-left"} />
        </Button>
        <span aria-live={playing ? "off" : "polite"} aria-atomic="true">
          {slides.length ? state.index + 1 : 0} / {state.snaps}
        </span>
        <Button
          variant="outline"
          size="sm"
          aria-label={controlLabels?.next ?? "다음 슬라이드"}
          disabled={!state.next}
          onClick={() => move("next")}
        >
          <Icon
            name={orientation === "vertical" ? "arrow-down" : "arrow-right"}
          />
        </Button>
      </div>
      {(dots || thumbnails) && (
        <div
          className={thumbnails ? "n-carousel-thumbnails" : "n-carousel-dots"}
          role="group"
          aria-label={controlLabels?.choose ?? "슬라이드 선택"}
        >
          {Array.from({ length: state.snaps }, (_, i) => (
            <button
              type="button"
              key={i}
              aria-label={
                controlLabels?.slide(i + 1) ?? `${i + 1}번 슬라이드 보기`
              }
              aria-current={state.index === i ? "true" : undefined}
              onClick={() => {
                setStopped(true);
                api?.scrollTo(i, reducedMotion);
              }}
            >
              {thumbnails ? (thumbnails[i] ?? i + 1) : <span />}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
