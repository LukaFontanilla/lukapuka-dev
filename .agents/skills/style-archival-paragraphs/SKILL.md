---
name: style-archival-paragraphs
description: Apply Archival Monograph typographic styling (small-caps lead-ins, naturalist ink shifts, tracked small-caps, and internal page links) whenever modifying or adding paragraphs in app/pages/index.vue.
---

# Style Archival Paragraphs (`style-archival-paragraphs`)

Use this skill whenever editing, expanding, or adding new content to the `paragraphs` array in `app/pages/index.vue`. This ensures all cover-page biographical text adheres strictly to the **National Park Field Guide / Archival Monograph** design system.

---

## 1. Core Archival Design Philosophy

1. **No Background Boxes or UI Badges**:
   - **Do NOT** use solid background colors or borders around inline words (`background-color`, `border`).
   - Boxed UI badges disrupt the 30px horizontal ruled journal lines and create awkward line-break chunks.
2. **Ruled Line Grid Harmony**:
   - All inline styling must respect `line-height: 30px` and flow organically across line breaks without displacing baselines.
3. **Curated Naturalist Palette**:
   - Rely purely on typographic weight, small-caps (`font-variant: small-caps`), and earthy ink shifts (`rust`, `green`, `gold`).

---

## 2. Mandatory Typographic Patterns

When crafting HTML strings inside `const paragraphs = [...]`:

### A. Paragraph Lead-In (`archival-lead`)
Start the opening phrase (first 3–4 words) of significant introductory paragraphs with small-caps:
```html
<span class="archival-lead">I started this site</span> as a way to document my explorations...
```

### B. Catalog Taxonomy & Keywords (`archival-caps`)
Format domain topics, technologies, or classifications as tracked small-caps with optional ink tinting (`rust`, `green`, `gold`):
```html
My writings will mostly be about <span class="archival-caps rust">technology</span>, <span class="archival-caps green">development</span>, and <span class="archival-caps gold">design</span>.
```

### C. Botanical & Specimen Accents (`ink-rust`, `ink-green`, `ink-gold`)
Highlight key concepts, titles, or thematic points using serif italics or semi-bold ink shifts:
```html
...building a cohesive design system with a focus on a central theme (<em class="ink-rust">National Park Field Guide</em>)...
...attempt to share <em class="ink-green">sonic recordings and live performances</em>...
```

### D. Site Route Linking (`<a href="...">`)
Whenever the text references another page or section on the site, wrap it in an anchor link:
```html
My <a href="/writings">writings</a> will mostly be about...
The <a href="/listenings">listenings page</a> is my attempt...
You'll find that my <a href="/readings">readings</a> are eclectic...
```

---

## 3. Scoped CSS Reference in `app/pages/index.vue`

Ensure the target paragraphs are rendered via `v-html="para"` inside `.about-me-section` and styled by these scoped `:deep(...)` rules:

```css
/* PRESET I: ARCHIVAL MONOGRAPH (Ink Shifts & Tracked Small-Caps) */
.about-me-section p :deep(.archival-lead) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section p :deep(.archival-caps) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section p :deep(.archival-caps.rust) {
  color: var(--clr-accent-primary);
}

.about-me-section p :deep(.archival-caps.green) {
  color: var(--clr-accent-secondary);
}

.about-me-section p :deep(.archival-caps.gold) {
  color: var(--clr-accent-warning);
}

.about-me-section p :deep(.ink-rust) {
  color: var(--clr-accent-primary);
  font-weight: 600;
}

.about-me-section p :deep(.ink-green) {
  color: var(--clr-accent-secondary);
  font-weight: 600;
}

.about-me-section p :deep(.ink-gold) {
  color: var(--clr-accent-warning);
  font-weight: 600;
}
```

---

## 4. Checklist Before Committing Changes

- [ ] Does every paragraph flow cleanly along the 30px ruled lines without inline background boxes?
- [ ] Are internal page mentions (`writings`, `listenings`, `readings`) properly linked?
- [ ] Do highlighted words use `archival-lead`, `archival-caps`, or `ink-*` classes appropriately?
- [ ] Are HTML entities correctly escaped inside the TypeScript array strings?
