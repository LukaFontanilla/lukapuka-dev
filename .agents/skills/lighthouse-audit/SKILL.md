---
name: lighthouse-audit
description: Conduct a rigorous Staff Software Engineer audit of a website or Lighthouse report. Analyzes Core Web Vitals (FCP, LCP, TBT, CLS), network payloads, accessibility, best practices, and SEO, collaborates on a detailed implementation plan, and executes prioritized optimizations.
---

# Lighthouse Audit & Remediation Workflow (`lighthouse-audit`)

Use this skill when the user provides a Lighthouse audit report, asks to review website performance, or requests optimization for Core Web Vitals (CLS, LCP, TBT, FCP), Accessibility, Best Practices, or SEO.

---

## 1. Phase 1: Diagnostic & Codebase Investigation (Staff Engineer Lens)

Never treat a Lighthouse report as abstract metrics. Always trace reported diagnostics to exact files, line numbers, and architectural patterns in the codebase.

1. **Correlate Diagnostics to Exact Source Code**:
   - Search the codebase (`grep_search`, `find_by_name`) for element selectors, CSS classes, URLs, or network requests flagged by Lighthouse.
   - For **Cumulative Layout Shift (CLS)**:
     - Identify non-composited animations (e.g., CSS `@keyframes` animating `padding`, `margin`, `width`, `height`, `top`, or `left`).
     - Inspect elements that shift size after hydration or client-side mounting (e.g., unconstrained images/iframes, responsive layout switches, FOUT/FOIT font swaps).
   - For **Enormous Network Payloads / Largest Contentful Paint (LCP)**:
     - Inspect client-side `onMounted`, `useFetch`, or data-fetching composables downloading oversized datasets (Parquet, large JSON, uncompressed CSV) on critical navigation paths.
     - Check hero images, render-blocking stylesheets, and unbundled third-party scripts.
   - For **Total Blocking Time (TBT) / Long Main-Thread Tasks**:
     - Identify heavy client-side data parsing, unmemoized reactive watchers, or synchronous script execution.

---

## 2. Phase 2: Categorized Best Practices Assessment

Evaluate and categorize findings across the four core Lighthouse dimensions. See `references/best_practices.md` for complete technical patterns.

### A. Performance & Core Web Vitals
- **CLS (< 0.05 Target)**:
  - Exclusively use GPU-composited properties (`transform: translateX/Y/scale`, `opacity`) for CSS animations and scroll-driven transitions (`animation-timeline`).
  - Pre-allocate space for dynamic UI components and define explicit aspect ratios for visual elements.
- **Payload & Network (< 300 KB Critical Path Target)**:
  - Eliminate heavy analytical or dataset downloads from homepage/navigation shells. Move data-heavy processing to server endpoints (`/api/...`) or dedicated lazy-loaded subpages.
  - Defer non-critical third-party libraries and leverage browser caching/compression.

### B. Accessibility (100 / 100 Target)
- **Contrast Ratios (WCAG AA Compliance)**:
  - Ensure all text meets at least `4.5:1` contrast against its background (`3:1` for large/bold text >= 18pt / 24px) in both light and dark themes.
- **Semantic Structure & ARIA**:
  - Enforce strict HTML semantics: `<dl>` must contain `<dt>`/`<dd>` pairs; page wrappers must define a primary `<main>` landmark.
  - Ensure all icon-only links (`<a>`) and interactive controls (`<button>`) have explicit `aria-label` attributes or discernible text.

### C. Best Practices (100 / 100 Target)
- Maintain strict Content Security Policy (CSP) headers, secure HTTPS origins, clean console logs (zero uncaught exceptions), and modern browser APIs.

### D. SEO (100 / 100 Target)
- Ensure descriptive `<title>`, unique page descriptions (`<meta name="description">`), proper heading hierarchy (single `<h1>`), and crawlable semantic links.

---

## 3. Phase 3: Collaboration & Planning (`/plan` Workflow)

Before making any source code edits, present a structured **Implementation Plan artifact** (`<plan_name>.md`) with `request_feedback = true` and `user_facing = true`.

### Plan Structure
1. **Executive Audit Summary**: Table comparing current Lighthouse scores and Core Web Vitals against Staff Engineer targets.
2. **Codebase Root Cause Analysis**: Specific file paths, line numbers, and technical diagnoses for every identified issue.
3. **Proposed Remediation by Category**:
   - Group files logically under *Performance (Payload & Network)*, *Performance (CLS & Main Thread)*, *Accessibility*, and *Best Practices/SEO*.
   - Include precise before/after code snippets and diffs.
4. **User Review Required & Open Questions**: Highlight architectural decisions (e.g., removing unused data fetches vs. relocating to subroutes) using GitHub alerts (`> [!IMPORTANT]`, `> [!WARNING]`).

**Do not proceed to execution until the user explicitly approves the implementation plan.**

---

## 4. Phase 4: Execution & Verification

1. **Precision Execution**:
   - Apply edits cleanly using `multi_replace_file_content` or `replace_file_content`.
   - Preserve existing unrelated comments and formatting.
2. **Automated Verification**:
   - Run the project's build command (`npm run build` or framework equivalent) to verify zero compilation or syntax errors.
3. **Walkthrough Documentation**:
   - Create or update a Walkthrough artifact (`walkthrough.md`) summarizing the applied remediations, verified build logs, and expected post-optimization Lighthouse score improvements.
