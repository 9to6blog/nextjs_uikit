# @9to6/ui

Independent UI components for React 19.2+ and Next.js 16. Distributed as a GitHub Pages tarball, local tarball or source registry; not published to npm.

React/Vite apps without Next.js should use `@9to6/ui/react` or individual component paths. Next.js is an optional peer. The legacy root entry includes the Next.js NavLink; the React entry exposes an ordinary anchor NavLink with an explicit `active` prop.

```tsx
import "@9to6/ui/styles.css";
import { UIProvider } from "@9to6/ui/provider";
import { Button } from "@9to6/ui/button";

export default function Example() {
  return (
    <UIProvider theme="system">
      <Button>Start building</Button>
    </UIProvider>
  );
}
```

Use individual module paths. Static primitives remain server compatible; interactive modules preserve their client directives. The package includes the original source and typed declarations. UIProvider supports light/dark/system, black (default)/blue/violet/teal, comfortable/compact and full/reduced motion. Checkbox and radio indicators, popup transitions, moving highlights and the motion patterns share reduced-motion support without an extra animation runtime.

See the repository's README, support contract and validation report for catalog coverage, API limitations and actual test evidence. Upstream third-party licenses are included. No general claim of perfect accessibility or universal UI-library compatibility is made.

The package also contains 24 reusable compositions under `/blocks/<slug>`. Import `/blocks.css` after `/styles.css` when using them. Static compositions such as EditorialHero and StatsBand work in Server Components; stateful blocks require a client caller for their callbacks. `ChartView` from `/chart-view` offers 12 chart kinds, series configuration, legends and a collapsible data table. `Carousel` supports horizontal/vertical orientation, responsive slide size, dots, thumbnails and optional autoplay with pause controls and reduced-motion support. See the Blocks, Charts and Carousels galleries for complete runnable examples.

`ChartView` preserves `null` samples as gaps and displays them as “미수집” in its data table. Cartesian series can set `axis: "right"` for a separate unit/scale; `secondaryAxis` configures that axis's label, tick formatter and decimal ticks, while `allowDecimals` controls the primary axis. For example, a composed chart can display request counts on the left and response time in milliseconds on the right without treating missing latency as zero. `SidebarMenuButton` accepts an `endIcon` slot for a consistently sized disclosure indicator, separate from its primary icon and label.
