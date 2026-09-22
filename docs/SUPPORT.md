# Support contract — v0.1

The catalog contains 79 documented components spanning primitives, forms, navigation, overlays, data presentation and motion patterns. These include File Upload, Tree, Sortable, Nav Link, Submit Button and the ten motion patterns documented in [REFERENCE-DESIGN.md](REFERENCE-DESIGN.md). This is a finite inventory; each component's documented API defines its supported behavior.

## Implemented

- Native form props and React refs, disabled/error/loading examples, controlled or uncontrolled Radix APIs where those primitives support them.
- Keyboard navigation, focus management, portal themes, light/dark/system themes, four accent presets (black by default), two density presets, reduced motion.
- Radial Menu opens with the pointer's context-menu action, not an ordinary left click. Keyboard activation includes Shift+F10, the context-menu key, Enter and Space; Escape restores focus to the trigger.
- SVG checkbox check/mixed strokes, radio springs, popup entrance/exit, moving highlights, blurred tabs, icon sidebar collapse, code typing/tabs, notification stacks, pinned/todo lists, radial menus, shine cards, multi-step dialogs and timezone clocks. See the reference matrix for individual APIs and limits.
- Calendar single/multiple/range modes through DayPicker. Date Picker is a single-date composition; use Calendar with Popover for a range picker.
- Data Table client filtering, sorting, paging, row selection, stable row IDs, column visibility and empty state.
- Recharts primitives for area/bar/line/pie/radar/radial/scatter charts, theme colors and reduced-motion aware marks. Applications provide appropriate textual data alternatives.
- Single-select tree with roving focus, arrows, Home/End, Enter/Space selection, expansion and typeahead.
- Vertical list sorting by pointer, touch or keyboard with dnd-kit announcements.
- File count/size/type checks, duplicate detection, local list and removal. No upload endpoint.
- Questionnaire text/email/textarea/select/radio fields, native validation, async pending and error handling.
- Dialog/menu/tooltip/popover/scroll/layout primitives with their exposed upstream props.

## Explicit limits

- Components expose NINE UI's own composition APIs, variants, tokens and motion settings.
- Data Table is not an enterprise virtualized data grid. Server pagination, cell editing, grouping, aggregation, pinning and virtualization require further composition or an additional API.
- Tree does not yet provide multiselection, checkbox cascading, virtualized rows, lazy loading or tree drag-and-drop. Sortable handles one vertical list, not nested/cross-container transfers.
- Combobox is single-select. Multi-select tokens, async remote querying and virtualized results are not part of this component API.
- Message primitives are presentation and scroll behavior. They do not implement AI provider calls, tool execution, token streaming transports, Markdown/HTML execution or persistence.
- File validation is only a client convenience. The consuming server must authenticate requests, verify file contents and enforce its own limits.
- Sidebar is a collapsible layout primitive. The documentation separately demonstrates a mobile dialog navigation. It is not an automatic app router or authorization system.
- Native screen reader output, touch hardware, high zoom, Windows high contrast and every RTL combination require additional manual device validation. Automated axe scans are not WCAG certification.
- No workload test of an AWS instance or Cloudflare cache has been performed. No claim of supporting 50 concurrent users is inferred from a UI library build.

## Acceptance rule

An item may be listed as implemented when it has working source, a runnable example, documented props and a recorded basic test. Production approval additionally requires the consuming application's actual states, input constraints, accessibility workflows, data scale and browser targets. Track missing features explicitly instead of hiding them behind the word "complete".

## React and static hosting

The `/react` entry supports React 19.2–19.x without a Next.js install. React 19.3 + Vite 8.3 is exercised by the isolated consumer check. Its NavLink accepts explicit active state; `/nav-link` retains the Next.js adapter. The legacy root barrel includes that adapter and is intended for Next.js. React 18 and native mobile runtimes are outside the current peer contract.

GitHub Pages uses a locally built `/nextjs_uikit` basePath export. See [PUBLISHING.md](PUBLISHING.md) for artifact and deployment verification.
