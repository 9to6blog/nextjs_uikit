"use client";
import type { ReactElement } from "react";
import {
  ChartContainer,
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  ComposedChart,
  Area,
  Bar,
  Line,
  Pie,
  Radar,
  RadialBar,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ChartTooltip,
} from "./chart.js";
export const chartKinds = [
  "line",
  "area",
  "bar",
  "horizontal-bar",
  "stacked-bar",
  "stacked-area",
  "pie",
  "donut",
  "radar",
  "radial",
  "scatter",
  "composed",
] as const;
export type ChartKind = (typeof chartKinds)[number];
export type ChartDatum = { [key: string]: string | number };
export type ChartSeries = { key: string; label: string; color?: string };
export type ChartViewProps = {
  kind: ChartKind;
  data: ChartDatum[];
  series: ChartSeries[];
  label: string;
  categoryKey?: string;
  /** Scatter uses this numeric key for its horizontal axis. */
  xKey?: string;
  height?: number;
  showTable?: boolean;
  className?: string;
};
const palette = [
  "var(--n-text)",
  "#538b86",
  "#9b7fc0",
  "#be8448",
  "#688bb2",
  "#b97583",
];
/** Twelve reusable compositions. Circular charts use the first numeric series. */
export function ChartView({
  kind,
  data,
  series,
  label,
  categoryKey = "name",
  xKey = "x",
  height = 280,
  showTable = true,
  className,
}: ChartViewProps) {
  const colors = series.map((s, i) => s.color ?? palette[i % palette.length]);
  const first = series[0];
  if (!first || !data.length)
    return (
      <div className="n-chart-empty" role="status">
        표시할 데이터가 없습니다.
      </div>
    );
  const config = Object.fromEntries(
    series.map((s, i) => [s.key, { label: s.label, color: colors[i] }]),
  );
  const horizontal = kind === "horizontal-bar";
  const circular = ["pie", "donut", "radial"].includes(kind);
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 4" vertical={false} />
      <XAxis
        dataKey={horizontal ? undefined : categoryKey}
        type={horizontal ? "number" : "category"}
        tickLine={false}
        axisLine={false}
        minTickGap={12}
      />
      <YAxis
        dataKey={horizontal ? categoryKey : undefined}
        type={horizontal ? "category" : "number"}
        width={horizontal ? 64 : 40}
        tickLine={false}
        axisLine={false}
      />
    </>
  );
  const tooltip = <ChartTooltip contentStyle={{ color: "var(--n-text)" }} />;
  const line = (s: ChartSeries, i: number) => (
    <Line
      key={s.key}
      dataKey={s.key}
      name={s.label}
      stroke={colors[i]}
      strokeWidth={2}
      dot={false}
      animationDuration={400}
    />
  );
  const bar = (s: ChartSeries, i: number) => (
    <Bar
      key={s.key}
      dataKey={s.key}
      name={s.label}
      fill={colors[i]}
      radius={kind === "stacked-bar" ? 0 : 3}
      stackId={kind === "stacked-bar" ? "total" : undefined}
      animationDuration={400}
    />
  );
  const area = (s: ChartSeries, i: number) => (
    <Area
      key={s.key}
      dataKey={s.key}
      name={s.label}
      stroke={colors[i]}
      fill={colors[i]}
      fillOpacity={0.14}
      strokeWidth={2}
      stackId={kind === "stacked-area" ? "total" : undefined}
      animationDuration={400}
    />
  );
  let plot: ReactElement;
  if (kind === "pie" || kind === "donut")
    plot = (
      <PieChart>
        {tooltip}
        <Pie
          data={data}
          dataKey={first.key}
          nameKey={categoryKey}
          innerRadius={kind === "donut" ? "52%" : 0}
          outerRadius="82%"
          paddingAngle={2}
          stroke="var(--n-surface)"
          animationDuration={400}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  else if (kind === "radar")
    plot = (
      <RadarChart data={data}>
        <PolarGrid stroke="var(--n-border)" />
        <PolarAngleAxis
          dataKey={categoryKey}
          tick={{ fill: "var(--n-muted)", fontSize: 11 }}
        />
        {tooltip}
        {series.map((s, i) => (
          <Radar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            stroke={colors[i]}
            fill={colors[i]}
            fillOpacity={0.12}
            animationDuration={400}
          />
        ))}
      </RadarChart>
    );
  else if (kind === "radial")
    plot = (
      <RadialBarChart
        data={data.map((d, i) => ({
          ...d,
          name: d[categoryKey],
          fill: palette[i % palette.length],
        }))}
        innerRadius="22%"
        outerRadius="92%"
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[
            0,
            Math.max(1, ...data.map((d) => Number(d[first.key]) || 0)),
          ]}
          tick={false}
        />
        <PolarRadiusAxis tick={false} axisLine={false} />
        {tooltip}
        <RadialBar
          dataKey={first.key}
          name={first.label}
          background={{ fill: "var(--n-raised)" }}
          cornerRadius={5}
          animationDuration={400}
        />
      </RadialBarChart>
    );
  else if (kind === "scatter")
    plot = (
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 4" />
        <XAxis
          type="number"
          dataKey={xKey}
          name={xKey}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="y"
          type="number"
          width={40}
          tickLine={false}
          axisLine={false}
        />
        {tooltip}
        {series.map((s, i) => (
          <Scatter
            key={s.key}
            name={s.label}
            data={data.map((d) => ({ ...d, y: d[s.key] }))}
            dataKey="y"
            fill={colors[i]}
            animationDuration={400}
          />
        ))}
      </ScatterChart>
    );
  else if (kind === "line")
    plot = (
      <LineChart data={data}>
        {axes}
        {tooltip}
        {series.map(line)}
      </LineChart>
    );
  else if (kind === "area" || kind === "stacked-area")
    plot = (
      <AreaChart data={data}>
        {axes}
        {tooltip}
        {series.map(area)}
      </AreaChart>
    );
  else if (kind === "composed")
    plot = (
      <ComposedChart data={data}>
        {axes}
        {tooltip}
        {series.map((s, i) => (i === 0 ? bar(s, i) : line(s, i)))}
      </ComposedChart>
    );
  else
    plot = (
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"}>
        {axes}
        {tooltip}
        {series.map(bar)}
      </BarChart>
    );
  return (
    <figure className={`n-chart-view ${className ?? ""}`} data-kind={kind}>
      <ChartContainer config={config} label={label} style={{ height }}>
        {plot}
      </ChartContainer>
      <figcaption className="n-chart-caption">
        <strong>{label}</strong>
        <ul aria-label="범례">
          {(circular
            ? data.map((d, i) => ({
                key: String(i),
                label: String(d[categoryKey]),
                color: palette[i % palette.length],
              }))
            : series.map((s, i) => ({ ...s, color: colors[i] }))
          ).map((s) => (
            <li key={s.key}>
              <i style={{ background: s.color }} aria-hidden="true" />
              {s.label}
            </li>
          ))}
        </ul>
      </figcaption>
      {showTable && (
        <details className="n-chart-table">
          <summary>데이터 표 보기</summary>
          <div tabIndex={0} role="region" aria-label={`${label} 데이터`}>
            <table>
              <caption>{label}</caption>
              <thead>
                <tr>
                  <th scope="col">항목</th>
                  {kind === "scatter" && <th scope="col">{xKey}</th>}
                  {series.map((s) => (
                    <th scope="col" key={s.key}>
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <th scope="row">{d[categoryKey]}</th>
                    {kind === "scatter" && <td>{d[xKey]}</td>}
                    {series.map((s) => (
                      <td key={s.key}>{d[s.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </figure>
  );
}
