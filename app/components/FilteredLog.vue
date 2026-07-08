<script setup lang="ts">
import { ref, computed } from 'vue'

interface Item {
  path?: string
  title: string
  subtitle?: string // Can be author or other secondary info
  description?: string
  date: string
  tags: string[]
}

const props = withDefaults(
  defineProps<{
    items: Item[]
    title: string
    scopeKey?: string
  }>(),
  {
    scopeKey: ''
  }
)

const computedScopeKey = computed(() => props.scopeKey || props.title.toLowerCase().replace(/\s+/g, '-'))
const { selectedTag, searchQuery, isExpanded } = useLogFilterState(computedScopeKey.value)


const allTags = computed(() => {
  const tags = new Set<string>()
  props.items.forEach(item => {
    item.tags.forEach(tag => tags.add(tag))
  })
  return ['All', ...Array.from(tags)]
})

// Filtered list of tags matching search query
const filteredTags = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return allTags.value
  return allTags.value.filter(tag => tag.toLowerCase().includes(query))
})

const filteredItems = computed(() => {
  if (selectedTag.value === 'All') {
    return props.items
  }
  return props.items.filter(item => item.tags.includes(selectedTag.value))
})

function selectTag(tag: string) {
  selectedTag.value = tag
}
</script>

<template>
  <div class="filtered-log">
    
    <!-- Top bar containing Title -->
    <div class="log-header-top">
      <h1 class="log-title">{{ title }}</h1>
    </div>

    <!-- Collapsible & Searchable Legend Container -->
    <div class="legend-container" :class="{ 'is-expanded': isExpanded || searchQuery }">
      <div class="legend-header">
        <span>INDEX OF TAXONOMIES / TOPICS</span>
        
        <!-- Filter input styled as typewriter index card search -->
        <div class="search-box">
          <span class="search-label">FILTER:</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="type topic..."
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">×</button>
        </div>
      </div>

      <!-- Tags Grid with dynamic heights and smooth CSS mask fade-out -->
      <div class="legend-grid-wrapper">
        <div class="legend-grid">
          <button
            v-for="tag in filteredTags"
            :key="tag"
            class="legend-tag-pill"
            :class="{ active: tag === selectedTag }"
            @click="selectTag(tag)"
          >
            <span class="bullet">✦</span> {{ tag }}
          </button>
          <div v-if="filteredTags.length === 0" class="no-tags-found">
            No matching topics.
          </div>
        </div>
      </div>

      <!-- Pull-tab styled Expand Button at the bottom center -->
      <div v-if="allTags.length > 6 && !searchQuery" class="legend-footer">
        <button
          class="expand-btn"
          @click="isExpanded = !isExpanded"
        >
          <span class="expand-icon">{{ isExpanded ? '▲' : '▼' }}</span>
          {{ isExpanded ? 'COLLAPSE INDEX' : `EXPAND INDEX (${allTags.length} TOPICS)` }}
        </button>
      </div>
    </div>

    <!-- Field Log Library Card -->
    <div class="library-card">
      <div class="card-header">
        <span>FIELD LOG</span>
        <span>NO. 001</span>
      </div>
      <div class="table-container">
        <table class="reading-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>TITLE & DETAILS</th>
              <th>TAGS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.title">
              <td class="mono-font">{{ item.date }}</td>
              <td>
                <NuxtLink v-if="item.path" :to="item.path" class="item-link">
                  <span class="item-title">{{ item.title }}</span>
                </NuxtLink>
                <span v-else class="item-title">{{ item.title }}</span>
                <span v-if="item.subtitle" class="item-subtitle"> {{ item.subtitle }}</span>
                <p v-if="item.description" class="item-description">{{ item.description }}</p>
              </td>
              <td>
                <div class="item-tags">
                  <span v-for="tag in item.tags" :key="tag" class="small-tag">{{ tag }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filteredItems.length === 0" class="no-items">
          <p>No items found for this topic.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.filtered-log {
  padding: var(--spacing-md);
  font-family: var(--font-family-sans);
  position: relative;
  z-index: 1;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- Log Header Top --- */
.log-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-sm);
  flex-shrink: 0;
}

.log-title {
  color: var(--clr-accent-primary);
  font-family: 'Oswald', var(--font-family-sans);
  font-size: var(--font-size-3xl);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

/* --- LEGEND CONTAINER (Searchable, Collapsible) --- */
.legend-container {
  background-color: var(--clr-bg-secondary);
  border: 1px dashed var(--clr-border);
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-xs) var(--spacing-md); /* Pull button overlaps bottom */
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.legend-header {
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  color: var(--clr-text-muted);
  margin-bottom: var(--spacing-sm);
  letter-spacing: 1.5px;
  border-bottom: 1px dashed var(--clr-border);
  padding-bottom: var(--spacing-xs);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

/* Search Input Style */
.search-box {
  display: flex;
  align-items: center;
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  font-size: 0.7rem;
}

.search-label {
  color: var(--clr-text-secondary);
  margin-right: 4px;
  font-weight: var(--font-weight-semibold);
}

.search-input {
  background: none;
  border: none;
  color: var(--clr-text-primary);
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  outline: none;
  width: 100px;
  transition: width 0.2s ease;
}

.search-input:focus {
  width: 150px;
}

.clear-search-btn {
  background: none;
  border: none;
  color: var(--clr-text-muted);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 2px;
}

.clear-search-btn:hover {
  color: var(--clr-accent-danger);
}

/* Wrapper for Grid & Heights */
.legend-grid-wrapper {
  position: relative;
  max-height: 72px; /* Approx 2 rows of tags */
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Apply CSS mask image to smoothly fade out tags in the second row when collapsed */
  -webkit-mask-image: linear-gradient(to bottom, black 45%, transparent 95%);
  mask-image: linear-gradient(to bottom, black 45%, transparent 95%);
}

.is-expanded .legend-grid-wrapper {
  max-height: 400px; /* Big enough to contain all tags */
  overflow-y: auto;
  
  /* Remove the fade mask when expanded */
  -webkit-mask-image: none;
  mask-image: none;
}

.legend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md); /* Ensures last items don't stick to bottom */
}

.no-tags-found {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-muted);
  font-style: italic;
  padding: var(--spacing-xs) 0;
}

.legend-tag-pill {
  background: none;
  border: 1px solid transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-secondary);
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
}

.legend-tag-pill .bullet {
  font-size: 0.6rem;
  opacity: 0.5;
  transition: transform 0.2s ease;
}

.legend-tag-pill:hover {
  color: var(--clr-accent-primary);
  border-color: var(--clr-border);
  background-color: var(--clr-bg-primary);
}

.legend-tag-pill:hover .bullet {
  transform: rotate(45deg);
  opacity: 1;
}

.legend-tag-pill.active {
  color: var(--clr-bg-primary);
  background-color: var(--clr-text-primary);
  border-color: var(--clr-text-primary);
}

.legend-tag-pill.active .bullet {
  color: var(--clr-accent-primary);
  opacity: 1;
}

/* Pull-Tab Expand Button */
.legend-footer {
  position: absolute;
  bottom: -13px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.expand-btn {
  font-family: var(--font-family-mono);
  font-size: 0.65rem;
  color: var(--clr-text-secondary);
  background-color: var(--clr-bg-secondary);
  border: 1px dashed var(--clr-border);
  border-top: 1px solid var(--clr-bg-secondary); /* Hides upper border line */
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 4px;
}

.expand-btn:hover {
  color: var(--clr-accent-primary);
  background-color: var(--clr-bg-primary);
  border-style: solid;
  box-shadow: var(--shadow-sm);
}

.expand-icon {
  font-size: 0.5rem;
  transition: transform 0.3s ease;
}

/* --- DEFAULT LIBRARY CARD STYLES --- */
.library-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-muted);
  border-bottom: 2px solid var(--clr-border);
  padding-bottom: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-shrink: 0;
}

.table-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: auto;
}

.reading-table {
  width: 100%;
  border-collapse: collapse;
}

.reading-table th,
.reading-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--clr-border);
}

.reading-table th {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-secondary);
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: var(--clr-bg-primary);
  box-shadow: inset 0 -1px 0 var(--clr-border);
}

.mono-font {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}

.item-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
}

.item-link:hover .item-title {
  color: var(--clr-accent-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.item-title {
  font-weight: var(--font-weight-bold);
  display: block;
}

.item-subtitle {
  font-size: var(--font-size-sm);
  color: var(--clr-text-secondary);
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--clr-text-primary);
  margin-top: var(--spacing-xs);
  line-height: 1.4;
}

.item-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.small-tag {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--clr-text-muted);
  border: 1px solid var(--clr-border);
  padding: 0.1rem 0.3rem;
  border-radius: var(--border-radius-sm);
}

.no-items {
  color: var(--clr-text-muted);
  padding: var(--spacing-xl) 0;
  font-style: italic;
  text-align: center;
}

@media (max-width: 768px) {
  .filtered-log {
    padding: var(--spacing-sm);
  }

  .log-title {
    font-size: 1.6rem;
  }

  .legend-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .search-box {
    width: 100%;
  }

  .search-input {
    flex: 1;
  }

  .ledger-card {
    padding: var(--spacing-md);
  }

  .reading-table th,
  .reading-table td {
    padding: var(--spacing-sm);
  }

  .table-container {
    padding-bottom: 2.5rem !important;
  }
}
</style>
