"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import { Calendar, type DateRange } from "@9to6/ui/calendar";
import { DatePicker } from "@9to6/ui/date-picker";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@9to6/ui/table";
import { DataTable, type ColumnDef } from "@9to6/ui/data-table";
import {
  ChartContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  ChartTooltip,
} from "@9to6/ui/chart";
import { Carousel } from "@9to6/ui/carousel";
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@9to6/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@9to6/ui/resizable";
import { Badge } from "@9to6/ui/badge";
const rows = [
  {
    id: "1",
    title: "디자인 시스템 시작하기",
    status: "Published",
    views: 1240,
  },
  { id: "2", title: "모션의 기본 원칙", status: "Draft", views: 0 },
  {
    id: "3",
    title: "Next.js와 Server Components",
    status: "Published",
    views: 860,
  },
  { id: "4", title: "좋은 여백의 기준", status: "Published", views: 540 },
  { id: "5", title: "키보드 접근성 가이드", status: "Draft", views: 0 },
  { id: "6", title: "브랜드 토큰 정리", status: "Published", views: 210 },
];
const columns: ColumnDef<(typeof rows)[number]>[] = [
  { accessorKey: "title", header: "제목" },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <Badge tone={row.original.status === "Published" ? "success" : "neutral"}>
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: "views", header: "조회수" },
];
const chartData = [
  { day: "Mon", visitors: 24 },
  { day: "Tue", visitors: 48 },
  { day: "Wed", visitors: 36 },
  { day: "Thu", visitors: 72 },
  { day: "Fri", visitors: 56 },
  { day: "Sat", visitors: 94 },
  { day: "Sun", visitors: 82 },
];
export function DataDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [date, setDate] = useState<Date>();
  const [range, setRange] = useState<DateRange>();
  switch (name) {
    case "calendar":
      return (
        <div className="demo-stack">
          <Calendar
            mode="range"
            defaultMonth={new Date(2026, 8, 1)}
            selected={range}
            onSelect={setRange}
          />
          <p role="status" className="demo-note">
            {range?.from
              ? `${range.from.toLocaleDateString("ko-KR")} – ${range.to?.toLocaleDateString("ko-KR") ?? "종료일 선택"}`
              : "시작일과 종료일을 선택하세요."}
          </p>
        </div>
      );
    case "date-picker":
      return (
        <DatePicker
          value={date}
          onValueChange={setDate}
          label="게시일"
          calendarProps={{ defaultMonth: new Date(2026, 8, 1) }}
        />
      );
    case "table":
      return (
        <div className="n-table-scroll">
          <Table>
            <TableCaption>예시 게시물 목록</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>조회수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <Badge>{row.status}</Badge>
                  </TableCell>
                  <TableCell>{row.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    case "data-table":
      return (
        <DataTable
          label="게시물"
          data={rows}
          columns={columns}
          selectable
          getRowId={(row) => row.id}
          pageSize={4}
        />
      );
    case "chart":
      return (
        <div className="demo-stack">
          <div className="demo-between">
            <strong>Weekly visits</strong>
            <Badge>Sample data</Badge>
          </div>
          <ChartContainer
            label="일별 예시 방문자 수"
            config={{ visitors: { label: "방문자", color: "var(--n-accent)" } }}
          >
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 10, top: 12, bottom: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--n-accent)"
                    stopOpacity={0.24}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--n-accent)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 4" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
              />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--n-accent)"
                strokeWidth={2.5}
                fill="url(#chart-fill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
          <details className="demo-note">
            <summary>차트 데이터 보기</summary>
            <ul>
              {chartData.map((row) => (
                <li key={row.day}>
                  {row.day}: {row.visitors}
                </li>
              ))}
            </ul>
          </details>
        </div>
      );
    case "carousel":
      return (
        <Carousel
          label="디자인 원칙"
          slides={["Thoughtful.", "Fluid.", "Yours."].map((title, i) => (
            <div className={`carousel-art art-${i}`} key={title}>
              <span>0{i + 1}</span>
              <strong>{title}</strong>
            </div>
          ))}
        />
      );
    case "scroll-area":
      return (
        <ScrollArea className="scroll-demo">
          <ScrollAreaViewport tabIndex={0} aria-label="컴포넌트 목록">
            {[
              "Button",
              "Input",
              "Card",
              "Dialog",
              "Tabs",
              "Select",
              "Calendar",
              "Command",
              "Data Table",
              "Chart",
              "Tree",
              "Sortable",
              "Popover",
              "Switch",
              "Slider",
            ].map((label) => (
              <div key={label} className="scroll-row">
                {label}
              </div>
            ))}
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      );
    case "resizable":
      return (
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="35%" minSize="20%">
            <div className="resize-demo">Navigation</div>
          </ResizablePanel>
          <ResizableHandle aria-label="패널 너비 조절" />
          <ResizablePanel minSize="25%">
            <div className="resize-demo">Your canvas</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    default:
      return null;
  }
}
