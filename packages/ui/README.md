# @9to6/ui

Independent UI components for Next.js 16 and React 19.2+. This private preview is distributed as a local tarball or a source registry; it is not published to npm.

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
