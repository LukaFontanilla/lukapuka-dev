# Lighthouse Best Practices & Architectural Remediation Patterns

This reference document provides authoritative patterns for addressing Lighthouse audit findings across all four categories: **Performance**, **Accessibility**, **Best Practices**, and **SEO**.

---

## 1. Performance & Core Web Vitals (FCP, LCP, TBT, CLS)

### A. Cumulative Layout Shift (CLS) — Remediation Patterns
Lighthouse penalizes any layout shift where visible elements change position without user interaction.
- **Rule 1: Use GPU-Composited Animations Only**
  - *Anti-Pattern (Triggers Reflow & CLS)*:
    ```css
    @keyframes shift {
      0% { padding-left: 0; margin-top: 0; }
      100% { padding-left: 20px; margin-top: 10px; }
    }
    ```
  - *Staff Engineer Pattern (Composited on GPU)*:
    ```css
    @keyframes shift {
      0% { transform: translate(0, 0); }
      100% { transform: translate(20px, 10px); }
    }
    ```
- **Rule 2: Reserve Explicit Dimensions for Media & Iframes**
  - Always specify `width` and `height` attributes or use modern CSS `aspect-ratio` on `<img>`, `<video>`, `<svg>`, and `<iframe>` elements to prevent document shifts when media loads.

### B. Network Payloads & Largest Contentful Paint (LCP)
- **Rule 1: Never Fetch Heavy Datasets on Initial Navigation Shells**
  - Client-side downloading of raw Parquet, large JSON (>200 KB), or CSV files in navigation components (`onMounted`, top-level composables) blocks network threads and wastes data.
  - Move aggregation to backend endpoints (`/api/...`) or only fetch raw datasets inside specific interactive subpages behind user intent.
- **Rule 2: Optimize Hero Images & Preloading**
  - Ensure above-the-fold hero images use `fetchpriority="high"`, modern formats (`WebP`/`AVIF`), and explicit sizing.

### C. Total Blocking Time (TBT) & Main Thread Work
- Minimize synchronous JavaScript execution during initial page mount.
- Defer non-essential third-party analytics and scripts using `defer` or web workers.

---

## 2. Accessibility (100 / 100 Target)

### A. Color Contrast Ratios (WCAG 2.1 AA)
- Normal body text and small labels (< 18pt / 24px) must have a contrast ratio of at least **4.5:1** against their background color.
- Large or bold headings (>= 18pt / 24px, or >= 14pt / 18.5px bold) must have a contrast ratio of at least **3:1**.
- Verify variables for **both light and dark color schemes**.

### B. Valid HTML List Semantics
- Ensure definition lists (`<dt>` / `<dd>`) are always wrapped in a parent `<dl>` tag:
  ```html
  <dl class="socials-list">
    <dt class="sr-only">Profiles</dt>
    <dd><a href="..." aria-label="LinkedIn Profile">...</a></dd>
  </dl>
  ```

### C. Accessible Names & Landmarks
- Ensure every icon button or link has an explicit `aria-label` or visually hidden text (`sr-only`).
- Wrap primary page content in `<main id="main-content">` and navigational headers in `<header>` / `<nav>`.

---

## 3. Best Practices (100 / 100 Target)

- **Console & Error Resilience**: Ensure zero uncaught runtime exceptions or warnings in production builds.
- **HTTPS & Origin Security**: Ensure proper `rel="noopener noreferrer"` on external `target="_blank"` links.
- **Modern APIs**: Avoid deprecated browser features and outdated polyfills.

---

## 4. SEO (100 / 100 Target)

- **Metadata Structure**: Every route must define `<title>`, `<meta name="description">`, and OpenGraph tags.
- **Heading Hierarchy**: Exactly one `<h1>` per page, followed sequentially by `<h2>`, `<h3>`, etc.
- **Crawlability**: Ensure interactive links use genuine `href` attributes rather than purely script-driven `click` handlers.
