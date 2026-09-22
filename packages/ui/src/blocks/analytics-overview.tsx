"use client";
import { ChartView, type ChartDatum, type ChartSeries } from "../chart-view.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type AnalyticsOverviewProps = BlockProps & {
  metrics: { label: string; value: string; change: string }[];
  data: ChartDatum[];
  series: ChartSeries[];
};
export function AnalyticsOverview({
  metrics,
  data,
  series,
  ...props
}: AnalyticsOverviewProps) {
  return (
    <BlockShell {...props}>
      <dl className="n-block-metrics">
        {metrics.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>
              {m.value}
              <span>{m.change}</span>
            </dd>
          </div>
        ))}
      </dl>
      <ChartView kind="area" label={props.title} data={data} series={series} />
    </BlockShell>
  );
}
