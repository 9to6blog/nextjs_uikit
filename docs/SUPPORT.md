# Support contract — v0.1

The catalog baseline is all 64 names shown in the Shadcn documentation on 2026-09-22, plus File Upload, Tree, Sortable, Nav Link and Submit Button. This is a finite inventory, not compatibility with every existing or future UI library.

## Implemented

- Native form props and React refs, disabled/error/loading examples, controlled or uncontrolled Radix APIs where those primitives support them.
- Keyboard navigation, focus management, portal themes, light/dark/system themes, three accent presets, two density presets, reduced motion.
- Calendar single/multiple/range modes through DayPicker. Date Picker is a single-date composition; use Calendar with Popover for a range picker.
- Data Table client filtering, sorting, paging, row selection, stable row IDs, column visibility and empty state.
- Recharts primitives for area/bar/line/pie/radar/radial/scatter charts, theme colors and reduced-motion aware marks. Applications provide appropriate textual data alternatives.
- Single-select tree with roving focus, arrows, Home/End, Enter/Space selection, expansion and typeahead.
- Vertical list sorting by pointer, touch or keyboard with dnd-kit announcements.
- File count/size/type checks, duplicate detection, local list and removal. No upload endpoint.
- Questionnaire text/email/textarea/select/radio fields, native validation, async pending and error handling.
- Dialog/menu/tooltip/popover/scroll/layout primitives with their exposed upstream props.

## Explicit limits

- The composition style is familiar to Shadcn users, but this is not a drop-in replacement for every Shadcn variant, slot, recipe, or version.
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
