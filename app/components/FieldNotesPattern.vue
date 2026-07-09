<script setup lang="ts">
defineProps<{
  rotation?: number
}>()
</script>

<template>
  <div class="pattern-wrapper" aria-hidden="true">
    <div class="pattern-background">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        class="field-notes-svg"
      >
        <defs>
          <pattern
            id="subtleGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" class="grid-subtle" />
          </pattern>
        </defs>

        <!-- Subtle Base Grid -->
        <rect width="100%" height="100%" fill="url(#subtleGrid)" opacity="0.45" />

        <!-- Flowing Topographic Elevation Contours -->
        <g class="topo-lines">
          <!-- Ridge 1 (Upper Flow) -->
          <path d="M -50 80 Q 250 20, 520 120 T 1050 90" fill="none" class="contour-minor" />
          <path d="M -50 120 Q 230 60, 500 160 T 1050 130" fill="none" class="contour-index" />
          <path d="M -50 160 Q 210 100, 480 200 T 1050 170" fill="none" class="contour-minor" />
          <path d="M -50 200 Q 190 140, 460 240 T 1050 210" fill="none" class="contour-minor" />

          <!-- Ridge 2 (Center-Left Flow) -->
          <path d="M -50 320 C 180 280, 360 420, 640 340 S 900 300, 1050 360" fill="none" class="contour-minor" />
          <path d="M -50 370 C 170 330, 350 470, 630 390 S 890 350, 1050 410" fill="none" class="contour-index" />
          <path d="M -50 420 C 160 380, 340 520, 620 440 S 880 400, 1050 460" fill="none" class="contour-minor" />
          <path d="M -50 470 C 150 430, 330 570, 610 490 S 870 450, 1050 510" fill="none" class="contour-minor" />

          <!-- Ridge 3 (Bottom Flow) -->
          <path d="M -50 600 Q 320 680, 650 540 T 1050 640" fill="none" class="contour-index" />
          <path d="M -50 650 Q 300 730, 630 590 T 1050 690" fill="none" class="contour-minor" />
          <path d="M -50 700 Q 280 780, 610 640 T 1050 740" fill="none" class="contour-minor" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.pattern-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.pattern-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.field-notes-svg {
  width: 100%;
  height: 100%;
}

.grid-subtle {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.45;
  opacity: 0.28;
}

.contour-minor {
  stroke: var(--clr-text-secondary, #5c6a7d);
  stroke-width: 0.6;
  opacity: 0.16;
}

.contour-index {
  stroke: var(--clr-text-primary, #2c3e50);
  stroke-width: 1.1;
  stroke-dasharray: 10, 6;
  opacity: 0.25;
}
</style>
