"use client";
import type { ComponentProps, CSSProperties } from "react";
import { ResponsiveContainer } from "recharts";
import {
  Area as ReArea,
  Bar as ReBar,
  Line as ReLine,
  Pie as RePie,
  Radar as ReRadar,
  RadialBar as ReRadialBar,
  Scatter as ReScatter,
} from "recharts";
import { useReducedMotion } from "./use-reduced-motion.js";
import { cn } from "./utils.js";
export {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  ComposedChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "recharts";
export function Area(props: ComponentProps<typeof ReArea>) {
  const reduced = useReducedMotion();
  return (
    <ReArea
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function Bar(props: ComponentProps<typeof ReBar>) {
  const reduced = useReducedMotion();
  return (
    <ReBar
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function Line(props: ComponentProps<typeof ReLine>) {
  const reduced = useReducedMotion();
  return (
    <ReLine
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function Pie(props: ComponentProps<typeof RePie>) {
  const reduced = useReducedMotion();
  return (
    <RePie
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function Radar(props: ComponentProps<typeof ReRadar>) {
  const reduced = useReducedMotion();
  return (
    <ReRadar
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function RadialBar(props: ComponentProps<typeof ReRadialBar>) {
  const reduced = useReducedMotion();
  return (
    <ReRadialBar
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export function Scatter(props: ComponentProps<typeof ReScatter>) {
  const reduced = useReducedMotion();
  return (
    <ReScatter
      {...props}
      isAnimationActive={!reduced && props.isAnimationActive !== false}
    />
  );
}
export type ChartConfig = Record<string, { label: string; color: string }>;
export function ChartContainer({
  config,
  children,
  className,
  style,
  label,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  config: ChartConfig;
  label: string;
  children: ComponentProps<typeof ResponsiveContainer>["children"];
}) {
  const variables = Object.fromEntries(
    Object.entries(config).map(([key, { color }]) => [`--color-${key}`, color]),
  ) as CSSProperties;
  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      className={cn("n-chart", className)}
      style={{ ...variables, ...style }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        initialDimension={{ width: 500, height: 240 }}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}
