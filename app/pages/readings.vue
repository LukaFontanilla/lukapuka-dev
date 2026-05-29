<script setup lang="ts">
// Mock data for readings with tags
const books = [
  { title: 'The Overstory', subtitle: 'Richard Powers', date: '2026-01-15', description: 'A beautiful exploration of trees and human connection.', tags: ['Fiction', 'Ecology'] },
  { title: 'Silent Spring', subtitle: 'Rachel Carson', date: '2025-11-20', description: 'Foundational text for the environmental movement.', tags: ['Non-Fiction', 'Ecology'] },
  { title: 'Braiding Sweetgrass', subtitle: 'Robin Wall Kimmerer', date: '2025-09-05', description: 'Indigenous wisdom and scientific knowledge combined.', tags: ['Non-Fiction', 'Culture'] },
]

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
