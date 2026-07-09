<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSpiralState } from '~/composables/useSpiralState'
const { spiralRotation } = useSpiralState()

const route = useRoute()
const wrapperEl = ref<HTMLElement | null>(null)
const isCollapsed = ref(false)
const leftHeight = ref(300)
const isDesktopCollapsed = ref(false)
const isDrawerOpen = ref(false)

watch(() => route.path, () => {
  isDrawerOpen.value = false
})

const rightHeight = computed(() => {
  if (!wrapperEl.value) return 300
  return wrapperEl.value.clientHeight - leftHeight.value - 16
})

let startY = 0
let startHeight = 0

const startResize = (event: MouseEvent | TouchEvent) => {
  if (isCollapsed.value) return
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
  if (isCollapsed.value) return
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
  if (!e.matches) {
    isDrawerOpen.value = false
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isDrawerOpen.value) {
    isDrawerOpen.value = false
  }
}

onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 1100px)')
    isCollapsed.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updateCollapsedState)
    window.addEventListener('keydown', onKeyDown)
    
    if (wrapperEl.value) {
        leftHeight.value = Math.round(wrapperEl.value.clientHeight * 0.35)
    }
})

onUnmounted(() => {
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', updateCollapsedState)
    }
    window.removeEventListener('keydown', onKeyDown)
    stopResize()
})
</script>

<template>
  <div>
    <div class="dot-mask dot-mask-background"></div>
    <div class="page-wrapper">
      <div class="ui-stack">
        <nav class="top-nav">
          <button
            v-if="isCollapsed"
            class="mobile-drawer-btn"
            @click="isDrawerOpen = true"
            title="Open Field Guide Index"
          >
            <span class="drawer-btn-icon">❖</span>
            <span class="drawer-btn-text">INDEX</span>
          </button>
          <div v-else class="nav-tag">❖ FIELD GUIDE</div>
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
      <div ref="wrapperEl" class="content-wrapper" :class="{ 'is-mobile-view': isCollapsed }">
        <div
          v-if="!isCollapsed"
          class="left-column"
          :class="{
            'is-mini': isDesktopCollapsed,
            'is-desktop-collapsed': isDesktopCollapsed
          }"
        >
          <AppIntro
            :isMini="isDesktopCollapsed"
            :isMobile="false"
          />
          <button
            class="desktop-collapse-toggle"
            :class="{ 'is-collapsed': isDesktopCollapsed }"
            @click="isDesktopCollapsed = !isDesktopCollapsed"
            :title="isDesktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <span class="toggle-icon">❖</span>
          </button>
        </div>
        <div
          v-if="!isCollapsed"
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
        <main
          id="main-content"
          class="right-column"
          :class="{ 'is-mobile-main': isCollapsed }"
        >
           <div class="infographic-container">
              <FieldNotesPattern v-if="!isCollapsed" :rotation="spiralRotation" />
              <div class="slot-wrapper">
                <slot />
              </div>
           </div>
        </main>
      </div>
      </div>

      <Transition name="drawer-fade">
        <div
          v-if="isCollapsed && isDrawerOpen"
          class="mobile-drawer-overlay"
          @click.self="isDrawerOpen = false"
        >
          <div class="mobile-drawer-sheet">
            <div class="mobile-drawer-header">
              <span class="drawer-title">❖ FIELD GUIDE INDEX</span>
              <button class="drawer-close-btn" @click="isDrawerOpen = false" aria-label="Close drawer">×</button>
            </div>
            <div class="mobile-drawer-content">
              <AppIntro :isMini="false" :isMobile="true" />
            </div>
          </div>
        </div>
      </Transition>
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
  padding: 0.55rem 1.8rem;
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  width: fit-content;
  min-width: 680px;
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
    gap: 0.4rem;
    padding: 0.35rem 0.55rem;
    width: 96%;
    max-width: 600px;
    min-width: 0;
    justify-content: space-between;
  }
  
  .nav-tag {
    display: none;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex: 1;
    gap: 0.3rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }
  
  .nav-bullet {
    font-size: 0.75rem;
    opacity: 0.45;
  }
  
  .nav-link {
    font-size: 0.78rem;
    white-space: nowrap;
  }
}

@media (min-width: 1101px) {
  .content-wrapper {
    width: 1440px !important;
    max-width: 94vw;
    margin-right: 0 !important; /* Remove margin that shifts it */
  }

  .top-nav {
    width: 960px;
    max-width: 90vw;
    padding: 0.65rem 2.5rem;
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
  overflow: hidden;
}

.slot-wrapper {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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

/* --- PLAN A: MOBILE DRAWER & EDGE-TO-EDGE LAYOUT --- */
.mobile-drawer-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--clr-bg-secondary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-sm);
  padding: 0.35rem 0.7rem;
  color: var(--clr-accent-primary);
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.mobile-drawer-btn:hover,
.mobile-drawer-btn:active {
  background-color: var(--clr-text-primary);
  color: var(--clr-bg-primary);
  border-color: var(--clr-text-primary);
}

.drawer-btn-icon {
  font-size: 0.95rem;
}

@media (max-width: 1100px) {
  .ui-stack {
    height: 100vh;
    overflow: hidden;
    padding-top: 0.4rem;
    gap: 0.4rem;
  }
}

.content-wrapper.is-mobile-view {
  width: 100% !important;
  max-width: 100vw !important;
  margin: 0 !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  flex: 1 1 0% !important;
  min-height: 0 !important;
  height: auto !important;
  border: none !important;
  box-shadow: none !important;
}

.right-column.is-mobile-main {
  width: 100% !important;
  flex: 1 1 0% !important;
  min-height: 0 !important;
  height: 100% !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}

.mobile-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: flex-start;
}

.mobile-drawer-sheet {
  width: 86vw;
  max-width: 360px;
  height: 100vh;
  background-color: var(--clr-bg-primary);
  border-right: 1px solid var(--clr-border);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px dashed var(--clr-border);
  background-color: var(--clr-bg-secondary);
  flex-shrink: 0;
}

.drawer-title {
  font-family: var(--font-family-mono);
  font-size: 0.82rem;
  font-weight: bold;
  letter-spacing: 0.08em;
  color: var(--clr-accent-primary);
}

.drawer-close-btn {
  background: none;
  border: 1px solid var(--clr-border);
  border-radius: 4px;
  font-size: 1.3rem;
  line-height: 1;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.drawer-close-btn:hover {
  background-color: var(--clr-accent-danger);
  color: #fff;
  border-color: var(--clr-accent-danger);
}

.mobile-drawer-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Transitions */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-fade-enter-active .mobile-drawer-sheet,
.drawer-fade-leave-active .mobile-drawer-sheet {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-fade-enter-from .mobile-drawer-sheet,
.drawer-fade-leave-to .mobile-drawer-sheet {
  transform: translateX(-100%);
}
</style>