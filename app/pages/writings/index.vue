<script setup lang="ts">
import { ref, computed } from 'vue' // We need these for filtering

// Your original script
const { data } = await useAsyncData(() => queryCollection('content').all())

// Mock data structure, now with 'tags'
const mockData = [
  { path: '/writings/jaja', title: 'First Page', description: 'A short description of the first blog post.', date: 'NOV 02, 2025', tags: ['Vue', 'Design'] },
  { path: '/writings/yaya', title: 'Second Page', description: 'This is another post, exploring a different topic.', date: 'OCT 28, 2025', tags: ['Dev', 'Writing'] },
  { path: '/blog/third-post', title: 'A Third Creative Entry', description: 'Exploring the artistic side of development and design.', date: 'OCT 15, 2025', tags: ['Design', 'Writing'] },
  { path: '/blog/fourth-post', title: 'Nuxt and View Transitions', description: 'Exploring the new View Transitions API with Nuxt.', date: 'OCT 10, 2025', tags: ['Vue', 'Dev'] },
  { path: '/blog/third-post', title: 'A Third Creative Entry', description: 'Exploring the artistic side of development and design.', date: 'OCT 15, 2025', tags: ['Design', 'Writing'] },
  { path: '/blog/fourth-post', title: 'Nuxt and View Transitions', description: 'Exploring the new View Transitions API with Nuxt.', date: 'OCT 10, 2025', tags: ['Vue', 'Dev'] },
]

// --- Filtering Logic ---

const selectedTag = ref('All')

// Get all unique tags from all posts
const allTags = computed(() => {
  const tags = new Set<string>()
  mockData.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return ['All', ...Array.from(tags)]
})

// Filter posts based on the selected tag
const filteredPosts = computed(() => {
  if (selectedTag.value === 'All') {
    return mockData
  }
  return mockData.filter(post => post.tags.includes(selectedTag.value))
})

function selectTag(tag: string) {
  selectedTag.value = tag
}
</script>

<template>
  <div class="writing-page-layout-1">
    
    <!-- Left Column: Title & Tags (FIXED typo 'classs' to 'class') -->
    <div class="page-header">
      <h1 class="page-title">Writing</h1>
      <div class="tag-selector-container">
        <button
          v-for="tag in allTags"
          :key="tag"
          class="tag-pill"
          :class="{ active: tag === selectedTag }"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Right Column: Post List -->
    <div class="blog-list-container">
      <ul v-if="filteredPosts.length > 0">
        <li v-for="post in filteredPosts" :key="post.path">
          <NuxtLink class="nav-link" activeClass="nav-link-active" :to="post.path" :style="{'view-transition-name': 'heading' + post.path.replaceAll('/','-')}">
            
            <span class="post-date">{{ post.date }}</span>
            
            <div class="post-content">
              <h2 class="animate-title">{{ post.title }}</h2>
              <p>{{ post.description }}</p>
            </div>

          </NuxtLink>
        </li>
      </ul>
      <div v-else class="no-posts">
        <p>No posts found for this topic.</p>
      </div>
    </div>
  </div>
</template>

<style lang="css">
/* --- Base Styles (From Option 3) --- */
.animate-title {
  view-transition-class: animate-title;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

li {
  width: 100%;
  margin-bottom: calc(var(--spacing-xl) + var(--spacing-sm)); /* 2.5rem */
}

.nav-link {
  text-decoration: none;
  color: var(--clr-text-primary);
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  transition: all var(--transition-duration) var(--transition-timing);
}

.nav-link h2 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-xl); /* 1.25rem, close to 1.4rem */
  font-weight: var(--font-weight-semibold);
  color: var(--clr-accent-primary);
  transition: color var(--transition-duration) var(--transition-timing);
}

.nav-link p {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--clr-text-secondary);
  line-height: 1.5;
}

.post-date {
  display: block;
  font-size: var(--font-size-sm); /* 0.875rem, close to 0.9rem */
  color: var(--clr-text-muted);
  padding-top: var(--spacing-xs); /* 0.25rem, close to 0.2rem */
  width: 110px;
  flex-shrink: 0;
  font-family: var(--font-family-mono);
}

.post-content {
  flex-grow: 1;
  /* NOTE: The border is removed from here in Layout 1
    and applied to the whole '.blog-list-container' instead.
  */
}

.nav-link:hover h2 {
  /* Using filter to darken the accent color on hover */
  filter: brightness(0.9);
}

.no-posts {
  color: var(--clr-text-muted);
  padding: var(--spacing-xl) 0;
  font-style: italic;
}

/* --- LAYOUT 1: "THE MARGINAL HEADER" --- */
/* This is the new default layout */

.writing-page-layout-1 {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  width: 100%;
  max-width: 960px; /* Wider max-width for the 2-col layout */
  margin: var(--spacing-md); /* 1rem, close to 1.2rem */
  font-family: var(--font-family-sans);
}

.page-header {
  width: 110px; /* Same width as post-date */
  flex-shrink: 0;
  padding-top: 0.1rem; /* Keeping this small alignment */
}

.page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--clr-accent-primary);
  margin: 0 0 var(--spacing-lg) 0;
  font-family: var(--font-family-mono);
  line-height: 1.2;
}

.tag-selector-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns tags to the left */
  gap: var(--spacing-sm);
}

.tag-pill {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  transition: color var(--transition-duration) var(--transition-timing);
}

.tag-pill:hover {
  color: var(--clr-text-primary);
}

.tag-pill.active {
  color: var(--clr-accent-primary);
  font-weight: var(--font-weight-semibold);
}

.blog-list-container {
  flex-grow: 1;
  border-left: 3px solid var(--clr-border);
  padding-left: var(--spacing-lg);
  transition: border-color var(--transition-duration) var(--transition-timing);
}

/* Hover effect for the whole list */
.writing-page-layout-1:hover .blog-list-container {
  border-left-color: var(--clr-accent-primary);
}
</style>

