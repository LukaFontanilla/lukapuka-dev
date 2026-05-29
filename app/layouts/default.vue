<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSpiralState } from '~/composables/useSpiralState'
const { spiralRotation } = useSpiralState()

const wrapperEl = ref<HTMLElement | null>(null)
const isCollapsed = ref(false)
const leftHeight = ref(300)
const isDesktopCollapsed = ref(false)

const rightHeight = computed(() => {
  if (!wrapperEl.value) return 300
  return wrapperEl.value.clientHeight - leftHeight.value - 16
})

let startY = 0
let startHeight = 0

const startResize = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  startY = 'touches' in event ? event.touches[0].clientY : event.clientY
  startHeight = leftHeight.value
  
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', onResize, { passive: false })
  document.addEventListener('touchend', stopResize)
  
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
}

const onResize = (event: MouseEvent | TouchEvent) => {
  const currentY = 'touches' in event ? event.touches[0].clientY : event.clientY
  const deltaY = currentY - startY
  
  const wrapperHeight = wrapperEl.value?.clientHeight || 600
  const minHeight = 80
  const maxHeight = Math.max(minHeight, wrapperHeight - 100)
  
  leftHeight.value = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))
}

const stopResize = () => {
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', onResize)
  document.removeEventListener('touchend', stopResize)
  
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

let mediaQuery: MediaQueryList | null = null

const updateCollapsedState = (e: MediaQueryListEvent | MediaQueryList) => {
  isCollapsed.value = e.matches
}

onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 1100px)')
    isCollapsed.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updateCollapsedState)
    
    if (wrapperEl.value) {
        leftHeight.value = Math.round(wrapperEl.value.clientHeight * 0.35)
    }
})

onUnmounted(() => {
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', updateCollapsedState)
    }
    stopResize()
})
</script>

<template>
  <div>
    <div class="dot-mask dot-mask-background"></div>
    <div class="page-wrapper">
      <div class="ui-stack">
        <nav class="top-nav">
          <div class="nav-tag">❖ FIELD GUIDE</div>
          <div class="nav-links">
            <NuxtLink class="nav-link" activeClass="nav-link--active" to="/">Home</NuxtLink>
            <span class="nav-bullet">·</span>
            <NuxtLink class="nav-link" activeClass="nav-link--active" to="/writings">Writing</NuxtLink>
            <span class="nav-bullet">·</span>
            <NuxtLink class="nav-link" activeClass="nav-link--active" to="/readings">Readings</NuxtLink>
            <span class="nav-bullet">·</span>
            <NuxtLink class="nav-link" activeClass="nav-link--active" to="/listenings">Listenings</NuxtLink>
          </div>
        </nav>
      <div ref="wrapperEl" class="content-wrapper">
        <div
          class="left-column"
          :class="{
            'is-mini': isCollapsed ? leftHeight < 220 : isDesktopCollapsed,
            'is-desktop-collapsed': !isCollapsed && isDesktopCollapsed
          }"
          :style="isCollapsed ? { height: leftHeight + 'px', flexShrink: 0, overflow: 'auto' } : {}"
        >
          <AppIntro
            :isMini="isCollapsed ? leftHeight < 220 : isDesktopCollapsed"
            :isMobile="isCollapsed"
          />
          <!-- Desktop Collapse Toggle Button -->
          <button
            v-if="!isCollapsed"
            class="desktop-collapse-toggle"
            :class="{ 'is-collapsed': isDesktopCollapsed }"
            @click="isDesktopCollapsed = !isDesktopCollapsed"
            :title="isDesktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <span class="toggle-icon">❖</span>
          </button>
        </div>
        <div
          class="resize-handle"
          @mousedown="startResize"
          @touchstart="startResize"
        >
          <div class="ruler-scale">
            <span class="ruler-tick"></span>
            <span class="ruler-tick"></span>
            <span class="ruler-tick ruler-tick--major"></span>
            <span class="ruler-tick"></span>
            <span class="ruler-tick"></span>
            <span class="ruler-center-icon">❖</span>
            <span class="ruler-tick"></span>
            <span class="ruler-tick"></span>
            <span class="ruler-tick ruler-tick--major"></span>
            <span class="ruler-tick"></span>
            <span class="ruler-tick"></span>
          </div>
        </div>
        <div
          class="right-column"
          :class="{ 'is-mini': isCollapsed && rightHeight < 220 }"
          :style="isCollapsed ? { flex: '1 1 0%', minHeight: 0, display: 'flex', flexDirection: 'column' } : {}"
        >
          <!-- Infographic designs will go here -->
          <div v-if="isCollapsed && rightHeight < 220" class="minimal-infographic-header">
             <span class="minimal-info-title">✦ VISUAL CONTENT (COLLAPSED)</span>
             <span class="minimal-info-hint">Drag divider down to expand</span>
          </div>
           <div
             v-else
             class="infographic-container"
             :style="isCollapsed ? { flex: '1 1 0%', height: '100%', width: '100%' } : {}"
           >
              <FieldNotesPattern :rotation="spiralRotation" />
              <div class="slot-wrapper">
                <slot />
              </div>
           </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 1rem; /* Space between nav and panel */
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 0.5rem 1.25rem;
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  width: fit-content;
  margin: 0 auto;
  box-shadow: var(--shadow-md);
}

.nav-tag {
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: var(--clr-accent-primary);
  user-select: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-bullet {
  color: var(--clr-border);
  font-size: 1.2rem;
  line-height: 1;
  user-select: none;
}

@media (max-width: 768px) {
  .top-nav {
    gap: 1rem;
    padding: 0.4rem 0.8rem;
    width: 90%;
    justify-content: center;
  }
  
  .nav-tag {
    display: none;
  }
  
  .nav-links {
    gap: 0.8rem;
  }
  
  .nav-bullet {
    font-size: 0.9rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}

@media (min-width: 1101px) {
  .content-wrapper {
    width: 1200px !important;
    max-width: 90vw;
    margin-right: 0 !important; /* Remove margin that shifts it */
  }
}

@media (max-width: 1100px) {
  .content-wrapper {
    width: 100% !important;
    max-width: 100vw !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }
}

.infographic-container {
  position: relative;
}

.slot-wrapper {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}

:deep(.pattern-background) {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.resize-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  background-color: var(--clr-bg-secondary);
  border-top: 1px solid var(--clr-border);
  border-bottom: 1px solid var(--clr-border);
  cursor: row-resize;
  user-select: none;
  position: relative;
  touch-action: none;
  z-index: 10;
  width: 100%;
  flex-shrink: 0;
}

.ruler-scale {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  color: var(--clr-text-secondary);
  transition: opacity 0.2s, color 0.2s;
}

.resize-handle:hover .ruler-scale,
.resize-handle:active .ruler-scale {
  opacity: 1;
  color: var(--clr-accent-primary);
}

.ruler-tick {
  width: 1px;
  height: 6px;
  background-color: currentColor;
}

.ruler-tick--major {
  height: 10px;
}

.ruler-center-icon {
  font-size: 0.9rem;
  font-family: monospace;
  margin: 0 4px;
  user-select: none;
}

@media (min-width: 1101px) {
  .resize-handle {
    display: none;
  }
}

@media (max-width: 1100px) {
  :deep(.pattern-background) {
    display: none !important;
  }
  .content-wrapper {
    overflow: hidden !important;
  }
}

.minimal-infographic-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1.5rem;
  border: 1px dashed var(--clr-border);
  border-radius: 0.6rem;
  background-color: var(--clr-bg-secondary);
  color: var(--clr-text-primary);
  text-align: center;
  gap: 0.5rem;
  box-sizing: border-box;
}

.minimal-info-title {
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--clr-accent-primary);
}

.minimal-info-hint {
  font-size: 0.8rem;
  color: var(--clr-text-secondary);
  font-style: italic;
}

.left-column {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.left-column.is-desktop-collapsed {
  width: 80px !important;
  padding: 1.5rem 0.5rem !important;
}

.right-column {
  flex: 1;
  min-width: 0;
  width: auto !important;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.desktop-collapse-toggle {
  position: absolute;
  right: -14px;
  top: 120px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--clr-bg-secondary);
  border: 1px solid var(--clr-border);
  color: var(--clr-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  outline: none;
}

.desktop-collapse-toggle:hover {
  background-color: var(--clr-bg-primary);
  color: var(--clr-accent-primary);
  border-color: var(--clr-accent-primary);
  transform: scale(1.15);
}

.toggle-icon {
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  display: inline-block;
  user-select: none;
}

.desktop-collapse-toggle:hover .toggle-icon {
  transform: rotate(180deg);
}

.desktop-collapse-toggle.is-collapsed .toggle-icon {
  color: var(--clr-accent-primary);
}
</style>