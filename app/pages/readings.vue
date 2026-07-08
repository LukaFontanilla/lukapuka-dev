<script setup lang="ts">
const { data: rawReadings } = await useAsyncData('readings', () =>
  queryCollection('content').where('path', 'like', '/readings/%').all()
)

const books = computed(() => {
  const list = rawReadings.value || []
  return list
    .map(item => ({
      path: item.path,
      title: item.title || 'Untitled',
      subtitle: item.subtitle || '',
      date: item.date || '',
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags : []
    }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
})

useSeoMeta({
  title: 'Reading Log',
  ogTitle: "Reading Log - Luka's Field Guide",
  description: 'A curated list of books, essays, and resources that inspire our work and shape our thoughts on design, culture, and ecology.',
  ogDescription: 'A curated list of books, essays, and resources that inspire our work and shape our thoughts on design, culture, and ecology.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'website'
})
</script>

<template>
  <FilteredLog :items="books" title="Reading Log" />
</template>
