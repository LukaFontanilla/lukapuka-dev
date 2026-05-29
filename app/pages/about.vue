<script setup lang="ts">
useSeoMeta({
  title: 'About',
  ogTitle: "About the Author - Luka's Field Guide",
  description: 'The journey so far. Learn more about the author, our design and development explorations, and the inspiration behind the Field Guide.',
  ogDescription: 'The journey so far. Learn more about the author, our design and development explorations, and the inspiration behind the Field Guide.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'profile'
})
</script>

<template>
  <div class="about-page">
    <div class="journal-container">
      <div class="journal-header">
        <span class="date">DATE: 2026-04-16</span>
        <span class="location">LOC: FIELD STATION</span>
      </div>
      <h1 class="journal-title">The Journey So Far</h1>
      <div class="journal-body">
        <p>
          I started this site as a way to document my explorations in design and development. I've always been drawn to the intersection of art and programming, and I wanted to create a digital space that reflects that. In short: handwritten CSS and Javascript components no frameworks, very clear and cohesive design system with a focus on a central theme (National Park Field Guide), a little bit personal and work writing, some random projects and other explorations.
        </p>
        <p>
          There's a lot of influence that I've take from other developers whether it be their <a href="https://chsmc.org/">site design</a>, <a href="https://www.joshwcomeau.com/animation/scroll-driven-animations/">writings</a>, OR unique <a href="https://sxywu.github.io/">SVG art</a> as it relates to this site design and I hope it can serve as a nice reflection of something authentic, different, but still relatable.
        </p>
        <p>
          This site is still very much a work in progress, but I plan to stay active in it's evolution. Thanks for visiting.
        </p>
      </div>
      <div class="scrapbook-elements">
        <div class="polaroid">
          <div class="image-placeholder">Self Portrait</div>
          <p class="caption">A sketch of the author.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: var(--spacing-xl);
  font-family: var(--font-family-sans);
}

.journal-container {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
}

.journal-header {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-muted);
  margin-bottom: var(--spacing-lg);
}

.journal-title {
  color: var(--clr-accent-primary);
  font-family: var(--font-family-mono);
  margin-bottom: var(--spacing-md);
}

.journal-body p {
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.scrapbook-elements {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
}

.polaroid {
  background: white;
  padding: 1rem 1rem 2rem 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: rotate(-3deg);
  border: 1px solid #ddd;
}

.image-placeholder {
  width: 200px;
  height: 200px;
  background-color: var(--clr-bg-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--clr-text-secondary);
  font-family: var(--font-family-mono);
}

.caption {
  text-align: center;
  font-family: 'Merriweather', serif;
  font-size: var(--font-size-sm);
  margin-top: 0.5rem;
}
</style>