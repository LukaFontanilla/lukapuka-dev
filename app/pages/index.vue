<script setup lang="ts">
import CoverAuthorBio from '~/components/CoverAuthorBio.vue'

useSeoMeta({
  title: 'Home',
  ogTitle: "Luka's Field Guide - Design & Development Portfolio",
  description: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and ecology.',
  ogDescription: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and ecology.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'website'
})
</script>

<template>
  <div class="cover-page">
    
    <div class="unified-card">
      
      <!-- Vintage Stamped Specimen Label Header -->
      <div class="unified-header">
        <div class="label-meta">
          <span>CATALOGUE NO. 805</span>
          <span>HABITAT: PACIFIC OCEAN</span>
        </div>
        <h1 class="main-title">FIELD GUIDE</h1>
        <h2 class="cover-subtitle">Design & Development Portfolio</h2>
        <p class="cover-description">
          A collection of writings, data, and interactive explorations.
        </p>
      </div>
      
      <hr class="ledger-divider" />

      <!-- Fixed Header Section -->
      <div class="about-author-header">
        <h3>ABOUT THE AUTHOR</h3>
      </div>

      <!-- Ruled Journal Notepaper scrolling content + Specimen Lens (Extracted Component) -->
      <CoverAuthorBio />

    </div>

  </div>
</template>

<style scoped>
/* --- BASE LAYOUT & WRAPPERS --- */
.cover-page {
  position: relative;
  height: 100%;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* --- UNIFIED CARD STRUCTURE --- */
.unified-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 45rem;
  height: 80%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.unified-header {
  padding: var(--spacing-md) var(--spacing-lg) 0 var(--spacing-lg);
  text-align: center;
}

.label-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  color: var(--clr-text-muted);
  margin-bottom: var(--spacing-xs);
  letter-spacing: 1.5px;
}

.main-title {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 2.2rem;
  color: var(--clr-accent-primary);
  margin: 0.2rem 0;
  text-transform: uppercase;
}

.cover-subtitle {
  color: var(--clr-text-secondary);
  font-size: 1.1rem;
  font-weight: var(--font-weight-normal);
  font-style: italic;
  margin: 0;
}

.cover-description {
  font-family: 'Merriweather', serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--clr-text-secondary);
  margin: var(--spacing-sm) auto;
  max-width: 80ch;
  opacity: 0.85;
}

.ledger-divider {
  border: none;
  border-top: 1px dashed var(--clr-border);
  margin: var(--spacing-sm) 0 0 0;
}

/* --- FIXED AUTHOR HEADER --- */
.about-author-header {
  padding: var(--spacing-md) var(--spacing-lg) 0 var(--spacing-lg);
  background-color: var(--clr-bg-primary);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.about-author-header h3 {
  font-family: var(--font-family-mono);
  font-size: 0.8rem;
  color: var(--clr-accent-primary);
  margin: 0;
  letter-spacing: 1.5px;
}

@media (max-width: 768px) {
  .cover-page {
    padding: var(--spacing-sm);
  }

  .unified-card {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
  }

  .unified-header {
    padding: var(--spacing-sm) var(--spacing-md) 0 var(--spacing-md);
  }

  .about-author-header {
    padding: var(--spacing-sm) var(--spacing-md) 0 var(--spacing-md);
  }

  .main-title {
    font-size: 1.65rem;
  }

  .cover-subtitle {
    font-size: 0.95rem;
  }
}
</style>