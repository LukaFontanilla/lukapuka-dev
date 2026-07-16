<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string
const { data } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

const activePath = useState<string | null>("active-transition-path", () => null);
activePath.value = route.path;

const isCoverOpen = ref(false)

const openCoverLightbox = () => {
  isCoverOpen.value = true
}

const closeCoverLightbox = () => {
  isCoverOpen.value = false
}

// Recursively find the first img or prose-img src in the Nuxt Content AST body
const findFirstImageSrc = (node: any): string | null => {
  if (!node) return null
  if (node.tag === 'img' || node.tag === 'prose-img') {
    return node.props?.src || null
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findFirstImageSrc(child)
      if (found) return found
    }
  }
  return null
}

const coverImageUrl = computed(() => {
  if (!data.value) return null
  if (data.value.image) return data.value.image
  if ((data.value as any).cover) return (data.value as any).cover
  if ((data.value as any).meta?.image) return (data.value as any).meta.image
  return findFirstImageSrc(data.value.body)
})

useSeoMeta({
  title: () => data.value?.title || 'Reading Entry',
  ogTitle: () => data.value?.title ? `${data.value.title} - Reading Log` : 'Reading Log',
  description: () => data.value?.description || 'Reading log entry in Luka\'s Field Guide.',
  ogDescription: () => data.value?.description || 'Reading log entry in Luka\'s Field Guide.',
  ogImage: () => coverImageUrl.value || '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'article'
})
</script>

<template>
  <div class="folio-container">
    <div v-if="data" class="folio-binding-frame">
      <div class="folio-spread">
        <!-- LEFT PANEL: ARCHIVAL BOOK DOSSIER & MOUNTED COVER -->
        <aside class="folio-profile-panel">
          <div class="archival-stamp">
            <span class="stamp-dot">●</span>
            <span>LIBRARY ARCHIVE // SPECIMEN LEDGER</span>
          </div>

          <div v-if="coverImageUrl" class="cover-mount" @click="openCoverLightbox" role="button" aria-label="Enlarge book cover">
            <img :src="coverImageUrl" :alt="data.title" class="cover-image" />
            <div class="cover-inspect-badge">
              <span>🔍 INSPECT COVER</span>
            </div>
          </div>


          <div class="book-metadata">
            <h1
              class="book-title"
              :style="{
                viewTransitionName: 'title-transition',
                viewTransitionClass: 'title-transition',
              }"
            >
              {{ data.title }}
            </h1>
            <h2 class="book-author">by {{ data.subtitle }}</h2>
            <div class="book-log-date">CATALOGUED: {{ data.date }}</div>
            <div class="book-tags">
              <span v-for="tag in data.tags" :key="tag" class="library-tag">✦ {{ tag }}</span>
            </div>
          </div>
        </aside>

        <!-- RIGHT PANEL: NATURALIST'S READING LEDGER TEXT -->
        <main class="folio-ledger-panel">
          <div class="ledger-topbar">
            <span class="ledger-label"></span>
            <NuxtLink to="/readings" class="back-link">◂ BACK TO READINGS LOG</NuxtLink>
          </div>

          <div class="ledger-content article-content">
            <ContentRenderer :value="data" />
          </div>

          <div class="ledger-footer">
            <span>↳ ENTRY VERIFIED</span>
            <span>[ ARCHIVE FILE END ]</span>
          </div>
        </main>
      </div>
    </div>
    <div v-else class="error-msg">Reading log not found</div>

    <!-- Fullscreen Cover Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isCoverOpen && coverImageUrl" class="cover-lightbox" @click="closeCoverLightbox">
          <div class="lightbox-topbar">
            <span>✦ {{ data.title.toUpperCase() }} // ARCHIVAL COVER PLATE</span>
            <button class="lightbox-close-btn" @click="closeCoverLightbox">[ ✕ CLOSE ]</button>
          </div>
          <img :src="coverImageUrl" :alt="data.title" class="lightbox-cover-img" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.folio-container {
  padding: 1.25rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Sleek Archival Ledger Card (Single Outer Frame) */
.folio-binding-frame {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: 0;
  border-radius: 14px;
  width: 100%;
  max-width: 1180px;
  max-height: calc(100vh - 65px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45),
              0 10px 20px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Open Two-Panel Library Spread */
.folio-spread {
  background-color: var(--clr-bg-primary);
  border: none;
  border-radius: 14px;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  flex: 1;
  overflow: hidden;
}

/* Left Profile Panel */
.folio-profile-panel {
  padding: 2rem 1.75rem;
  background-color: var(--clr-bg-secondary);
  border-right: 1px dashed var(--clr-border);
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  overflow-y: auto;
}

.archival-stamp {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  font-weight: var(--font-weight-bold);
  color: var(--clr-accent-primary);
  letter-spacing: 0.5px;
}

.stamp-dot {
  color: var(--clr-accent-primary);
}

/* Mounted Cover (Clean shadow without double box borders) */
.cover-mount {
  position: relative;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: zoom-in;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cover-mount:hover {
  transform: translateY(-2px);
}

.cover-image {
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--clr-border);
  box-shadow: none;
}

.cover-inspect-badge {
  margin-top: 0.65rem;
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  font-weight: var(--font-weight-bold);
  color: var(--clr-text-muted);
  transition: color 0.2s ease;
}

.cover-mount:hover .cover-inspect-badge {
  color: var(--clr-accent-primary);
}

/* Book Metadata Dossier */
.book-metadata {
  display: flex;
  flex-direction: column;
}

.book-title {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 1.85rem;
  color: var(--clr-accent-primary);
  margin: 0 0 0.2rem 0;
  line-height: 1.15;
  letter-spacing: 0.5px;
}

.book-author {
  font-family: 'Merriweather', serif;
  font-size: 0.98rem;
  color: var(--clr-text-secondary);
  font-style: italic;
  margin: 0 0 0.75rem 0;
}

.book-log-date {
  font-family: var(--font-family-mono);
  font-size: 0.72rem;
  color: var(--clr-text-muted);
  margin-bottom: 0.65rem;
}

.book-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.library-tag {
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: var(--clr-text-primary);
}

/* Single Archival Spine Crease (Soft, subtle book gutter crease) */
.folio-spine-hinge {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.03) 0%,
    rgba(0, 0, 0, 0.07) 48%,
    rgba(0, 0, 0, 0.11) 50%,
    rgba(0, 0, 0, 0.07) 52%,
    rgba(0, 0, 0, 0.02) 100%
  );
  box-shadow: none;
}

.hinge-line {
  display: none;
}

/* Right Ledger Panel */
.folio-ledger-panel {
  padding: 1.75rem 2.25rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.ledger-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-family-mono);
  font-size: 0.72rem;
  border-bottom: 1px solid var(--clr-border);
  padding-bottom: 0.6rem;
  margin-bottom: 1.25rem;
}

.ledger-label {
  color: var(--clr-accent-primary);
  font-weight: var(--font-weight-bold);
}

.back-link {
  color: var(--clr-text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--clr-accent-primary);
}

.ledger-content {
  flex: 1;
}

/* On Desktop: Hide the duplicate top image from markdown since it is mounted in the Archival Profile Panel! */
:deep(.ledger-content p:first-child:has(img)),
:deep(.ledger-content p:first-child:has(.specimen-plate)),
:deep(.ledger-content .specimen-plate:first-of-type) {
  display: none !important;
}

/* Match writing pages header styling exactly */
:deep(.ledger-content h1),
:deep(.ledger-content h2),
:deep(.ledger-content h3),
:deep(.ledger-content h4) {
  font-family: 'Oswald', var(--font-family-sans);
  color: var(--clr-accent-primary);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
}

:deep(.ledger-content h1) {
  font-size: var(--font-size-3xl);
}

:deep(.ledger-content h2) {
  font-size: var(--font-size-2xl);
}

:deep(.ledger-content h3) {
  font-size: var(--font-size-xl);
}

/* Ensure top heading starts cleanly at the top of the right panel */
:deep(.ledger-content h1:first-of-type),
:deep(.ledger-content h2:first-of-type),
:deep(.ledger-content h3:first-of-type) {
  margin-top: 0 !important;
}

.ledger-footer {
  margin-top: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--clr-border);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  color: var(--clr-text-muted);
}

/* Fullscreen Lightbox */
.cover-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  box-sizing: border-box;
}

.lightbox-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-family-mono);
  font-size: 0.78rem;
  color: #f8fafc;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.lightbox-close-btn {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}

.lightbox-cover-img {
  margin: auto;
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
}

/* ==========================================================================
   📱 SMALL SCREENS (<900px): SINGLE-COLUMN FOLIO LAYOUT
   ========================================================================== */
@media (max-width: 899px) {
  .folio-binding-frame {
    max-height: none;
    padding: 8px;
    border-radius: 12px;
  }

  .folio-spread {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
  }

  .folio-spine-hinge {
    display: none;
  }

  .folio-profile-panel {
    border-right: none;
    border-bottom: 1px solid var(--clr-border);
    padding: 1.25rem;
  }

  /* On mobile: show the markdown image or mounted cover cleanly */
  :deep(.ledger-content p:first-child:has(img)),
  :deep(.ledger-content p:first-child:has(.specimen-plate)) {
    display: block !important;
  }

  .folio-ledger-panel {
    padding: 1.25rem;
  }
}
</style>
