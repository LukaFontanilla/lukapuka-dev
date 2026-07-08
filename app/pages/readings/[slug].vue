<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { data } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

useSeoMeta({
  title: () => data.value?.title || 'Reading Entry',
  ogTitle: () => data.value?.title ? `${data.value.title} - Reading Log` : 'Reading Log',
  description: () => data.value?.description || 'Reading log entry in Luka\'s Field Guide.',
  ogDescription: () => data.value?.description || 'Reading log entry in Luka\'s Field Guide.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'article'
})
</script>

<template>
  <div class="article-container">
    <div v-if="data" class="article-card">
      <header class="article-header">
        <div class="eyebrow">{{ data.date }}</div>
        <h1 class="article-title">{{ data.title }}</h1>
        <h2 class="article-subtitle">by {{ data.subtitle }}</h2>
        <div class="tags">
          <span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>
      <hr class="style-divider" />
      <div class="article-content">
        <ContentRenderer :value="data" />
      </div>
    </div>
    <div v-else class="error-msg">Reading log not found</div>
  </div>
</template>

<style scoped>
.article-container {
  padding: var(--spacing-xl);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.article-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  width: 100%;
  box-sizing: border-box;
  box-shadow: var(--shadow-md);
}

.article-header {
  margin-bottom: var(--spacing-md);
}

.eyebrow {
  font-family: var(--font-family-mono);
  font-size: 0.8rem;
  color: var(--clr-text-muted);
  text-transform: uppercase;
}

.article-title {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 2.5rem;
  color: var(--clr-accent-primary);
  margin: 0.5rem 0 0.25rem 0;
}

.article-subtitle {
  font-family: 'Merriweather', serif;
  font-size: 1.2rem;
  color: var(--clr-text-secondary);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  background-color: var(--clr-bg-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  max-width: 100%;
  word-break: break-word;
}

.style-divider {
  border: none;
  border-top: medium double var(--clr-border);
  margin: var(--spacing-lg) 0;
}

@media (max-width: 768px) {
  .article-container {
    padding: var(--spacing-xs) !important;
  }

  .article-card {
    padding: 0.85rem !important;
    border-radius: var(--border-radius-md);
  }

  .article-title {
    font-size: 1.65rem;
    line-height: 1.25;
  }
}
</style>
