# NINE UI repository contract

- This repository is an independent Next.js UI library and documentation site. Do not alter or deploy the 9to6blog application while working here.
- Keep the complete component catalog in `apps/docs/src/lib/catalog.ts` synchronized with implementations, runnable examples, and support notes. Do not mark placeholders as implemented or describe catalog coverage as exhaustive feature validation.
- Static primitives must remain usable in Server Components. Preserve `"use client"` directives in emitted interactive modules. Keep per-component exports and tree shaking.
- Scope CSS with `n-` classes and `data-n-ui` tokens. Respect OS reduced motion, theme propagation through portals, keyboard operation, focus management, and forced colors. Complex interaction primitives use their maintained upstream packages.
- Build locally. No deployment, DNS changes, npm publishing, or production data mutations without a specific request.
- Never commit secrets, generated `dist`/`out`/registry output, test artifacts, or dependency directories.
- Validate changes with format, lint, type checks, production build, relevant browser behavior and accessibility checks. For broad shared changes, run the whole suite. Reproduce failures and fix the cause without weakening assertions.
- Report the actual tested browsers, viewport sizes, scope and remaining limitations. Automated accessibility checks do not certify full WCAG conformance or replace assistive-technology testing.
- Do not use sub-agents unless the owner explicitly requests them.
