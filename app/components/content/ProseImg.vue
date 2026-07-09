<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  title: { type: String, default: undefined },
  caption: { type: String, default: undefined }
})

const isOpen = ref(false)
const hasError = ref(false)

const captionText = computed(() => {
  return props.caption || props.alt || props.title || ''
})

const openLightbox = () => {
  if (!hasError.value) {
    isOpen.value = true
  }
}

const closeLightbox = () => {
  isOpen.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeLightbox()
  }
}

const handleImgError = () => {
  hasError.value = true
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <figure class="specimen-plate">
    <!-- Top Naturalist Header Bar -->
    <div class="plate-header">
      <div class="plate-badge">
        <span class="indicator-diamond">✦</span>
        <span class="plate-title">SPECIMEN ARCHIVE // FIG.</span>
      </div>
      <button
        v-if="!hasError"
        type="button"
        class="inspect-btn"
        @click="openLightbox"
        aria-label="Inspect high-resolution specimen image"
      >
        <span class="btn-icon">🔍</span>
        <span class="btn-text">INSPECT PLATE</span>
      </button>
    </div>

    <!-- Image Mounted Viewport -->
    <div class="plate-viewport" :class="{ 'has-error': hasError }" @click="openLightbox">
      <img
        v-if="!hasError"
        :src="props.src"
        :alt="props.alt || 'Field guide specimen figure'"
        :title="props.title"
        class="plate-img"
        loading="lazy"
        @error="handleImgError"
      />
      <div v-else class="img-error-fallback">
        <span class="error-icon">◬</span>
        <span class="error-text">[ ARCHIVE PLATE MISSING OR OFFLINE ]</span>
        <span class="error-sub">{{ props.src }}</span>
      </div>
    </div>

    <!-- Footer Caption Bar -->
    <figcaption v-if="captionText || $slots.default" class="plate-footer">
      <div class="caption-content">
        <span class="caption-text">
          <slot>{{ captionText }}</slot>
        </span>
      </div>
    </figcaption>

    <!-- Teleport Fullscreen Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="isOpen"
          class="specimen-lightbox"
          @click.self="closeLightbox"
          role="dialog"
          aria-modal="true"
        >
          <div class="lightbox-toolbar">
            <div class="toolbar-info">
              <span class="indicator-diamond">✦</span>
              <span>FIELD SPECIMEN HIGH-RESOLUTION INSPECTION</span>
            </div>
            <button type="button" class="lightbox-close" @click="closeLightbox">
              [ ✕ CLOSE ]
            </button>
          </div>

          <div class="lightbox-stage" @click.self="closeLightbox">
            <img
              :src="props.src"
              :alt="props.alt || 'Enlarged specimen image'"
              class="lightbox-img"
            />
          </div>

          <div v-if="captionText" class="lightbox-caption-bar">
            <span class="lightbox-caption-text">{{ captionText }}</span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </figure>
</template>

<style scoped>
.specimen-plate {
  margin: 2.2rem 0;
  background-color: var(--clr-bg-secondary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-duration) var(--transition-timing),
              border-color var(--transition-duration) var(--transition-timing),
              transform var(--transition-duration) var(--transition-timing);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.specimen-plate:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--clr-accent-primary);
  transform: translateY(-2px);
}

.plate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--clr-border);
  font-family: var(--font-family-mono);
  font-size: 0.72rem;
  color: var(--clr-text-muted);
}

.plate-badge {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
  color: var(--clr-accent-primary);
}

.indicator-diamond {
  color: var(--clr-accent-primary);
  font-size: 0.8rem;
}

.inspect-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.55rem;
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: all 0.2s ease;
}

.inspect-btn:hover {
  background-color: var(--clr-accent-primary);
  border-color: var(--clr-accent-primary);
  color: #ffffff;
}

.plate-viewport {
  position: relative;
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--clr-bg-primary);
  cursor: zoom-in;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plate-viewport.has-error {
  cursor: default;
}

.plate-img {
  width: 100%;
  height: auto;
  max-height: 760px;
  display: block;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.plate-viewport:hover .plate-img {
  transform: scale(1.018);
}

.img-error-fallback {
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--clr-accent-danger);
  font-family: var(--font-family-mono);
  text-align: center;
}

.error-icon {
  font-size: 1.5rem;
}

.error-text {
  font-size: 0.8rem;
  font-weight: var(--font-weight-bold);
}

.error-sub {
  font-size: 0.7rem;
  color: var(--clr-text-muted);
  word-break: break-all;
}

.plate-footer {
  margin-top: 0.75rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--clr-border);
}

.caption-content {
  display: flex;
  justify-content: center;
  text-align: center;
}

.caption-text {
  font-family: 'Merriweather', serif;
  font-size: 0.88rem;
  font-style: italic;
  color: var(--clr-text-primary);
  line-height: 1.55;
  max-width: 85%;
}

/* Teleport Lightbox Modal */
.specimen-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  box-sizing: border-box;
}

.lightbox-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: 0.75rem;
}

.toolbar-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: var(--font-weight-bold);
  color: #f97316;
}

.lightbox-close {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #f8fafc;
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lightbox-close:hover {
  background: #ea580c;
  border-color: #ea580c;
  color: #ffffff;
}

.lightbox-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem 0;
}

.lightbox-img {
  max-width: 92vw;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
}

.lightbox-caption-bar {
  text-align: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.lightbox-caption-text {
  font-family: 'Merriweather', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: #e2e8f0;
}

/* Lightbox Transitions */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .specimen-plate {
    margin: 1.5rem 0;
    padding: 0.75rem;
  }
  .caption-text {
    max-width: 100%;
    font-size: 0.82rem;
  }
  .plate-badge {
    font-size: 0.65rem;
  }
  .inspect-btn {
    padding: 0.18rem 0.45rem;
  }
}
</style>
