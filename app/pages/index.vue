<script setup lang="ts">
import SpecimenLens from '~/components/SpecimenLens.vue'
import CoverAuthorBio from '~/components/CoverAuthorBio.vue'

useSeoMeta({
  title: 'Home',
  ogTitle: "Luka's Field Guide - Design & Development Portfolio",
  description: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and randomness.',
  ogDescription: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and randomness.',
  ogImage: '/favicon.svg',
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

        <div class="header-hero-lockup">
          <SpecimenLens />
          <div class="header-text-block">
            <h1 class="main-title title-lower">a field guide.</h1>
            <h2 class="cover-subtitle">Design & Development Portfolio</h2>
            <p class="cover-description">
              A collection of writings, data, and interactive explorations.
            </p>
          </div>
        </div>
      </div>
      
      <hr class="ledger-divider" />

      <!-- Fixed Header Section -->
      <div class="about-author-header">
        <h3>ABOUT THE AUTHOR</h3>
      </div>

      <!-- Ruled Journal Notepaper scrolling content -->
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
  max-width: 46rem;
  height: 85%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.unified-header {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xs) var(--spacing-lg);
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

.header-hero-lockup {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xs);
  text-align: left;
}

.header-text-block {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.main-title {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 2.2rem;
  color: var(--clr-accent-primary);
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-align: left;
}

.title-lower {
  text-transform: lowercase;
}

.cover-subtitle {
  color: var(--clr-text-secondary);
  font-size: 1.05rem;
  font-weight: var(--font-weight-normal);
  font-style: italic;
  margin: 0.25rem 0 0 0;
  text-align: left;
}

.cover-description {
  font-family: 'Merriweather', serif;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--clr-text-secondary);
  margin: var(--spacing-xs) 0 0 0;
  opacity: 0.85;
  text-align: left;
}

.ledger-divider {
  border: none;
  border-top: 1px dashed var(--clr-border);
  margin: var(--spacing-xs) 0 0 0;
}

/* --- FIXED AUTHOR HEADER --- */
.about-author-header {
  padding: var(--spacing-xs) var(--spacing-lg) 0 var(--spacing-lg);
  background-color: var(--clr-bg-primary);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-xs);
}

.about-author-header h3 {
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  color: var(--clr-accent-primary);
  margin: 0;
  letter-spacing: 1.5px;
}

@media (max-width: 640px) {
  .cover-page {
    padding: var(--spacing-sm);
  }

  .unified-card {
    height: 100%;
    max-height: 100%;
  }

  .unified-header {
    padding: var(--spacing-sm) var(--spacing-md) 0 var(--spacing-md);
  }

  .header-hero-lockup {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: var(--spacing-xs);
  }

  .header-text-block {
    text-align: left;
    width: 100%;
  }

  .cover-subtitle,
  .cover-description {
    text-align: left;
  }

  .about-author-header {
    padding: var(--spacing-xs) var(--spacing-md) 0 var(--spacing-md);
  }

  .main-title {
    font-size: 1.65rem;
  }

  .cover-subtitle {
    font-size: 0.92rem;
  }
}
</style>