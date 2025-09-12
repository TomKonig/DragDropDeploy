---
title: Build Performance & Minification
---

\n## Static Asset Minification  
**Status:** Shipped (lightweight implementation) – Advanced adapters Planned

By default the build executor performs a lightweight minification pass over HTML, CSS, and JS artifacts after a successful build (or simulation) to reduce payload size. The current implementation uses simple regex-based shrinking (comments + excess whitespace). This is intentionally minimal and fast; it can be swapped for full parsers (terser, html-minifier-terser, clean-css) in a future optimization phase.

### Control Flags

Precedence order (highest first):

1. `FORCE_MINIFY=1` – Force-enable minification even if a project opted out.
2. Project setting `optOutMinify=true` – Skip minification if not overridden.
3. Default – Minification runs.
4. `FORCE_MINIFY=0` – Force-disable globally (highest precedence when set).

### Project Setting

`optOutMinify` is stored in `ProjectSetting` (column `optOutMinify BOOLEAN DEFAULT false`). Update via PATCH `/projects/:id` with:

```jsonc
{ "optOutMinify": true }
```

Listing or fetching a project includes its `settings` object (if present) allowing the UI to reflect current preference.

### Skipped Files

Files already ending with `.min.js` or `.min.css` are skipped. Non HTML/CSS/JS files are ignored.

### Logging

Build logs include summary lines such as:

```text
minify: starting pass
minify: skipped (project optOutMinify=true)
minify: complete processed=12 skipped=5 errors=0
```

### Future Enhancements (Planned)

* Pluggable minifier adapters (terser, esbuild) with size stats.
* Source map preservation.
* Per-asset metrics exported alongside build duration.

### Security & Safety

The minification pass operates only within the project artifact directory (`ARTIFACTS_DIR/<projectId>`). It does not execute user-provided code; it performs string transformations only.
