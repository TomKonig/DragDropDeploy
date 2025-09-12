# Documentation Style & Consistency Checklist

Use this checklist when creating or updating any page. Keep edits small and focused.

## Front Matter / Top Section

* Optional badges only if they clarify status or audience (avoid clutter)
* First sentence: clear purpose in plain language (no marketing fluff)
* If feature not fully shipped: add **Status: Planned** or **Status: In Progress** inline

## Structure

* Max heading depth: h3 in most user pages; architecture specs may use h4
* Prefer short paragraphs (≤4 lines rendered)
* Lists: use asterisks `*` for unordered (markdown lint rule)
* Tables: concise headers; no empty columns

## Terminology

* Use consistent terms: "build flags", "minification", "metrics endpoint", "project", "deployment"
* Avoid future tense for shipped features (use present tense)
* Avoid internal code names

## Cross-linking

* Link first mention of: configuration, roadmap, architecture spec, threat model, metrics
* Do not repeat large tables; link to canonical reference instead

## Feature Status

* Shipped features: no status badge needed
* Planned / In Progress / Experimental: clearly labeled once near top
* Remove outdated claims; move future scope to roadmap

## Examples & Code

* Show minimal viable example; link to repo path if longer
* Use fenced code blocks with language hints

## Security

* Call out security-sensitive steps (e.g., secrets, auth tokens) with bold NOTE
* Never include real secrets or keys

## Accessibility & Readability

* Descriptive link text (avoid "here")
* Avoid long inline code spans (>80 chars); wrap or reference

## Validation Before Commit

* Markdown lint passes (MD004 list style etc.)
* All internal links resolve (run mkdocs build locally if possible)
* No TODO or FIXME left in rendered content

## Anti-Patterns (Avoid)

* Duplicated configuration tables
* Mixing user and operator concerns on same page (split or clearly section)
* Roadmap speculation in core guides

## When to Split a Page

Split if one of:

* >120 lines raw markdown (excluding tables)
* >3 distinct audiences mixed
* Both conceptual overview and deep implementation details (move deep parts to architecture)

---
Maintained by Documentation stewardship role. Update this checklist when conventions evolve.
