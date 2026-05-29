<script setup lang="ts">
const { data: posts } = await useAsyncData('writings', () =>
  queryCollection('content')
  .where('path', 'like', '/writings/%')
  .all()
)

useSeoMeta({
  title: 'Writings',
  ogTitle: "Writings & Field Notes - Luka's Field Guide",
  description: 'Reflections, essays, and field notes on design, development, technology, and sustainability.',
  ogDescription: 'Reflections, essays, and field notes on design, development, technology, and sustainability.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'website'
})
</script>

<template>
  <FilteredLog :items="posts || []" title="Writings" />
</template>
