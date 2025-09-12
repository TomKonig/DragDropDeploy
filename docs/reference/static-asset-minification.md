---
title: Static Asset Minification
---

This page documents the built‑in static asset minification pass and how to control it.

## Overview

After a successful (or no-op) build, the executor invokes the `MinifyService` to shrink HTML, CSS, and JS assets for each project unless disabled. The service walks the project artifact directory and applies lightweight regex-based reductions (comment stripping, whitespace collapse, tag gap removal) without introducing heavy bundler dependencies.

## File Types Processed

- `.html`, `.htm`
- `.css`
- `.js`

Files already ending in `.min.js` or `.min.css` are skipped.

## Opt-Out Per Project

Each project has a `ProjectSetting.optOutMinify` flag. When `true`, minification is skipped unless `FORCE_MINIFY=1` is set globally.

API (PATCH `/projects/:id`):

```json
{ "optOutMinify": true }
```

## Global Overrides

Environment variable: `FORCE_MINIFY`

- `1` => Force minification even if a project opted out.
- `0` => Disable minification globally regardless of project settings.
- Unset => Respect per-project setting (default behavior).

## Logging & Observability

The executor log file includes lines like:

```text
minify: starting pass
minify: complete processed=42 skipped=18 errors=0
```
 
Errors for individual files are logged but do not fail the build; they increment an `errors` counter.

## Performance Considerations

The current implementation is single-threaded and performs synchronous file I/O for simplicity. For large sites consider future enhancements (parallel traversal, streaming, real minifier libraries). Reductions are conservative to avoid breaking scripts/styles.

## Skipped Files

- Non-target extensions
- Already minified (`.min.js`/`.min.css`)
- Files where the minified output is not smaller than original (counts as skipped)

## Error Handling

- Missing project artifacts directory -> logged and aborts pass
- Read/write failures -> logged per file; processing continues

## Future Enhancements

- Source map preservation / regeneration
- Pluggable minifier strategy (swap in terser/lightningcss/html-minifier-terser via feature flag)
- Metrics export (processed/skipped/errors gauges)
