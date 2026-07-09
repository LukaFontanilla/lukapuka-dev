<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  youtubeId: { type: String, default: '' },
  src: { type: String, default: '' },
  title: { type: String, default: 'Acoustic Specimen Player' },
  channel: { type: String, default: '' }
})

const resolvedId = computed(() => {
  if (props.youtubeId) return props.youtubeId
  if (props.src && props.src.includes('youtube.com/watch?v=')) {
    return props.src.split('v=')[1]?.split('&')[0]
  }
  if (props.src && props.src.includes('youtu.be/')) {
    return props.src.split('youtu.be/')[1]?.split('?')[0]
  }
  return ''
})
</script>

<template>
  <div class="player-deck">
    <div class="glowing-screen-wrapper">
      <div class="screen-border-bezel">
        <div class="video-aspect-ratio">
          <iframe
            v-if="resolvedId"
            :src="`https://www.youtube.com/embed/${resolvedId}?autoplay=0&rel=0&modestbranding=1`"
            :title="title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            class="embedded-player"
          ></iframe>
          <video
            v-else-if="src"
            :src="src"
            controls
            class="embedded-player"
          ></video>
        </div>
        <div class="crt-scanlines"></div>
        <div class="screen-glare"></div>
      </div>
      <div class="dial-indicator-row">
        <span class="dial-lamp text-green">SYNC LOCKED</span>
        <span class="dial-lamp text-orange">HI-FI BROADCAST</span>
        <span class="frequency-badge">
          CH. {{ (channel || resolvedId || 'SPEC').slice(0, 4).toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-deck {
  margin: var(--spacing-lg) 0;
  background-color: var(--clr-bg-secondary);
  border: 2px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  box-shadow:
    inset 0 1px 3px rgba(44, 37, 25, 0.08),
    var(--shadow-md);
  color: var(--clr-text-primary);
  transition: background-color var(--transition-duration) var(--transition-timing),
              border-color var(--transition-duration) var(--transition-timing),
              box-shadow var(--transition-duration) var(--transition-timing);
}

[data-theme="dark"] .player-deck {
  background-color: #1e293b;
  border: 2px solid #334155;
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.45),
    var(--shadow-md);
  color: #ecf0f1;
}

.glowing-screen-wrapper {
  background-color: #0f172a;
  border: 6px solid var(--clr-bg-tertiary);
  border-radius: var(--border-radius-sm);
  box-shadow:
    inset 0 0 15px rgba(0, 0, 0, 0.6),
    var(--shadow-sm);
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-duration) var(--transition-timing);
}

[data-theme="dark"] .glowing-screen-wrapper {
  border-color: #0f172a;
  box-shadow:
    inset 0 0 15px rgba(0, 0, 0, 0.9),
    0 0 10px rgba(0, 0, 0, 0.25);
}

.video-aspect-ratio {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.embedded-player {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 1;
}

.crt-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.04),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.04)
    );
  background-size:
    100% 4px,
    6px 100%;
  z-index: 3;
  pointer-events: none;
}

.screen-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.05) 10%,
    transparent 60%
  );
  z-index: 4;
  pointer-events: none;
}

.dial-indicator-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: var(--clr-bg-primary);
  font-family: var(--font-family-mono);
  font-size: 0.68rem;
  border-top: 1px solid var(--clr-border);
  color: var(--clr-text-primary);
  transition: background-color var(--transition-duration) var(--transition-timing),
              border-color var(--transition-duration) var(--transition-timing),
              color var(--transition-duration) var(--transition-timing);
}

[data-theme="dark"] .dial-indicator-row {
  background-color: #1e293b;
  border-top: 1px solid #0f172a;
  color: #e2e8f0;
}

.dial-lamp {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}

.dial-lamp::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 4px currentColor;
}

.text-green {
  color: #2e8b57;
}

[data-theme="dark"] .text-green {
  color: #2ecc71;
}

.text-orange {
  color: var(--clr-accent-primary);
}

.frequency-badge {
  margin-left: auto;
  background-color: var(--clr-bg-secondary);
  color: var(--clr-text-primary);
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid var(--clr-border);
  font-weight: var(--font-weight-bold);
}

[data-theme="dark"] .frequency-badge {
  background-color: #0f172a;
  color: #94a3b8;
  border-color: #334155;
}
</style>
