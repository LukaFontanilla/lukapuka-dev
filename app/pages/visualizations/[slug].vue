<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Capitalize and replace hyphens with spaces for display
const vizName = computed(() => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

useSeoMeta({
  title: () => vizName.value,
  ogTitle: () => `${vizName.value} - Visual Index`,
  description: () => `A primer on how to read and use the ${vizName.value} in visual communication.`,
  ogDescription: () => `A primer on how to read and use the ${vizName.value} in visual communication.`,
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'article'
})
</script>

<template>
  <div class="viz-stub-page">
    <div class="content-overlay centered-content">
      <div class="fixed-header">
        <h1>図鑑 / VISUAL INDEX</h1>
        <h2 class="cover-subtitle">{{ vizName }}</h2>
        <p class="cover-description">
          A primer on how to read and use the {{ vizName }} in visual communication.
        </p>
      </div>

      <div class="scrollable-text-container">
        <div class="about-me-section">
          <h3>HOW TO READ</h3>
          <p>
            This page is a stub for the <strong>{{ vizName }}</strong> entry in the visual index. In a full implementation, this section would explain the key components of a {{ vizName }}, how to interpret the data it displays, and common pitfalls to avoid.
          </p>
          
          <h3>WHEN TO USE</h3>
          <p>
            Use a {{ vizName }} when you want to show relationships, distributions, or hierarchies (depending on the specific chart type).
          </p>
          
          <div class="circular-cutout"></div>
          <p>
            Placeholder for an interactive example or a detailed diagram of the {{ vizName }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viz-stub-page {
  position: relative;
  height: 100%;
  padding: var(--spacing-xl);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-overlay {
  position: relative;
  z-index: 1;
  max-width: 600px;
  text-align: center;
  font-family: 'Merriweather', serif;
  color: var(--clr-text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fixed-header {
  width: 100%;
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 2;
}

.centered-content h1 {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 2rem;
  color: var(--clr-accent-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -1px;
}

.cover-subtitle {
  color: var(--clr-text-secondary);
  font-size: 1.2rem;
  font-weight: var(--font-weight-normal);
  font-style: italic;
  margin-bottom: var(--spacing-sm);
  margin-top: 0;
}

.cover-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  max-width: 50ch;
}

.scrollable-text-container {
  position: relative;
  width: 100%;
  height: 30rem;
  overflow-y: auto;
  padding: var(--spacing-md);
  z-index: 1;
}

.about-me-section {
  text-align: left;
  max-width: 50ch;
}

.about-me-section h3 {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-base);
  color: var(--clr-accent-primary);
  margin-bottom: var(--spacing-sm);
  margin-top: 1rem;
}

.about-me-section p {
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  font-size: 0.95rem;
}

.circular-cutout {
  float: right;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  shape-outside: circle(50%);
  margin-left: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  background-color: var(--clr-bg-secondary);
  border: 1px solid var(--clr-border);
}
</style>
