<script setup lang="ts">
import { ref, computed } from "vue";

// Fetch all markdown logs inside the content/listenings folder
const { data: listenings } = await useAsyncData("listenings", () =>
  queryCollection("content").where("path", "like", "/listenings/%").all(),
);

// Active filter category
const selectedType = ref<string>("All");
const searchQuery = ref<string>("");

const typesList = ["All", "song", "interview", "live performance"];

const filteredItems = computed(() => {
  let list = listenings.value || [];
  if (selectedType.value !== "All") {
    list = list.filter((item) => item.type === selectedType.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)),
    );
  }
  return list;
});

const getBadgeColor = (type: string) => {
  switch (type) {
    case "song":
      return "badge--song";
    case "interview":
      return "badge--interview";
    case "live performance":
      return "badge--live";
    default:
      return "";
  }
};

useSeoMeta({
  title: "Audio-Visual Listenings Log",
  ogTitle: "Audio-Visual Listenings Log - Luka's Field Guide",
  description:
    "A vintage field ledger documenting curated songs, acoustic sessions, and interviews.",
  ogImage: "/field_guide_stag.png",
  ogType: "website",
});
</script>

<template>
  <div class="ledger-layout fade-in">
    <!-- Header -->
    <div class="log-header-top">
      <h1 class="log-title">Listening Log</h1>
    </div>

    <!-- Taxonomies Filter Pillbox -->
    <div class="legend-container">
      <div class="legend-header">
        <span>INDEX OF SONIC RECORDINGS</span>

        <!-- Filter input styled as typewriter index search -->
        <div class="search-box">
          <span class="search-label">TUNE FREQ:</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="type artist, tag, name..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            class="clear-search-btn"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Tag grid selection -->
      <div class="legend-grid">
        <button
          v-for="type in typesList"
          :key="type"
          class="legend-tag-pill"
          :class="{ active: type === selectedType }"
          @click="selectedType = type"
        >
          <span class="bullet">✦</span>
          {{ type === "All" ? "All Bandwidths" : type.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Ledger Card -->
    <div class="ledger-card">
      <div class="card-header">
        <span>FIELD AUDIO OBSERVATIONS</span>
        <span>NO. 080</span>
      </div>

      <table class="ledger-table">
        <thead>
          <tr>
            <th style="width: 15%">DATE</th>
            <th style="width: 65%">IDENTITY & NOTES</th>
            <th style="width: 20%">RECORDING TYPE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.title"
            class="ledger-row"
          >
            <td class="mono-font">{{ item.date }}</td>
            <td>
              <NuxtLink :to="item.path" class="ledger-link">
                <span class="specimen-title">{{ item.title }}</span>
              </NuxtLink>
              <span class="specimen-sub"
                >by {{ item.subtitle || "Unknown Artist" }}</span
              >
              <p class="specimen-desc">{{ item.description }}</p>
              <div class="specimen-tags">
                <span v-for="tag in item.tags" :key="tag" class="mini-tag"
                  >#{{ tag }}</span
                >
              </div>
            </td>
            <td>
              <span class="stamp-badge" :class="getBadgeColor(item.type || '')">
                {{ item.type || "Specimen" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredItems.length === 0" class="no-signals">
        <span>[!] NO OBSERVATION SIGNALS DETECTED IN THIS BANDWIDTH</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ledger-layout {
  padding: var(--spacing-md);
  font-family: var(--font-family-sans);
  position: relative;
  z-index: 1;
  animation: fadeIn 0.4s ease;
}

/* --- Header --- */
.log-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-sm);
}

.log-title {
  color: var(--clr-accent-primary);
  font-family: "Oswald", var(--font-family-sans);
  font-size: var(--font-size-3xl);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

/* --- FILTER / LEGEND CONTAINER --- */
.legend-container {
  background-color: var(--clr-bg-secondary);
  border: 1px dashed var(--clr-border);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
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
  width: 120px;
  transition: width 0.2s ease;
}

.search-input:focus {
  width: 170px;
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

.legend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
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

/* --- LEDGER LIBRARY CARD --- */
.ledger-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
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
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
}

.ledger-table th,
.ledger-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--clr-border);
}

.ledger-table th {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-secondary);
}

.ledger-row {
  transition: background-color 0.2s ease;
}

.ledger-row:hover {
  background-color: rgba(224, 215, 198, 0.25); /* Light hover tint */
}

.mono-font {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-text-secondary);
}

.ledger-link {
  text-decoration: none;
  color: inherit;
  outline: none;
}

.ledger-link:hover .specimen-title {
  color: var(--clr-accent-primary);
  border-bottom: 1px dashed var(--clr-accent-primary);
}

.specimen-title {
  font-weight: var(--font-weight-bold);
  font-family: "Oswald", var(--font-family-sans);
  font-size: 1.25rem;
  display: inline-block;
  margin-right: 8px;
  transition: color 0.2s ease;
}

.specimen-sub {
  font-family: "Merriweather", serif;
  font-style: italic;
  color: var(--clr-text-secondary);
  font-size: 0.85rem;
}

.specimen-desc {
  font-family: "Merriweather", serif;
  font-size: var(--font-size-sm);
  color: var(--clr-text-primary);
  margin-top: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
  line-height: 1.5;
}

.specimen-tags {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.mini-tag {
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  color: var(--clr-text-muted);
}

/* --- STAMP BADGES --- */
.stamp-badge {
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
  border: 2px solid currentColor;
  letter-spacing: 0.5px;
  display: inline-block;
  transform: rotate(-2deg);
  box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.05);
  user-select: none;
}

.badge--song {
  color: var(--clr-accent-secondary); /* Forest Green */
  background-color: rgba(88, 129, 87, 0.07);
}

.badge--interview {
  color: var(--clr-accent-warning); /* Muted Gold */
  background-color: rgba(181, 137, 0, 0.07);
}

.badge--live {
  color: var(--clr-accent-primary); /* Vibrant Orange */
  background-color: rgba(217, 111, 46, 0.07);
}

/* --- NO SIGNALS --- */
.no-signals {
  font-family: var(--font-family-mono);
  text-align: center;
  padding: var(--spacing-xl) 0;
  font-style: italic;
  color: var(--clr-text-muted);
  border: 2px dashed var(--clr-border);
  border-radius: var(--border-radius-md);
  background-color: var(--clr-bg-secondary);
  margin-top: var(--spacing-md);
}

@keyframes fadeIn {
  from {
    opacity: 0.15;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
