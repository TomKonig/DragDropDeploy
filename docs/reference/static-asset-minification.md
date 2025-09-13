---
title: Static Asset Minification
---

This page documents the built‑in static asset minification pass and how to control it.

## Overview

After a successful (or no-op) build, the executor invokes the `MinifyService` to shrink HTML, CSS, and JS assets unless disabled. It applies lightweight regex-based reductions (comment stripping, whitespace collapse, tag gap removal) without heavy bundler dependencies.

## File Types Processed

- `.html`, `.htm`
- `.css`
- `.js`

Files ending in `.min.js` or `.min.css` are skipped.

## Opt-Out Per Project

Flag: `ProjectSetting.optOutMinify` (boolean). When `true`, minification is skipped unless `FORCE_MINIFY=1`.

Example PATCH:

```http
PATCH /projects/:id
```

Body:

```json
{ "optOutMinify": true }
```

## Global Overrides

Environment variable: `FORCE_MINIFY`

- `1`: Force minification even if a project opted out
- `0`: Disable minification globally
- Unset: Respect per-project setting (default)

## Logging & Observability

Sample log lines:

```text
minify: starting pass
minify: complete processed=42 skipped=18 errors=0
```

Errors for individual files don’t fail the build; they increment an `errors` counter.

## Performance Considerations

Single-threaded synchronous I/O for simplicity. Large sites may later benefit from parallel traversal, streaming, or real minifier libraries. Reductions are conservative to avoid breakage.

## Skipped Files

- Non-target extensions
- Already minified (`.min.js` / `.min.css`)
- Output not smaller than input

## Error Handling

- Missing artifact directory -> log and abort pass
- Read/write failures -> log and continue

## Future Enhancements

- Source map preservation / regeneration
- Pluggable minifier strategy (terser / lightningcss / html-minifier-terser)
- Metrics export (processed/skipped/errors gauges)
