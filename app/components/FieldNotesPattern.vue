<script setup lang="ts">
const props = defineProps<{
  rotation?: number
}>()
</script>

<template>
  <div class="pattern-background">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      class="field-notes-svg"
      opacity="0.35"
    >
      <!-- Grid Lines -->
      <defs>
        <pattern
          id="smallGrid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#c0c0b2"
            stroke-width="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="#c0c0b2"
            stroke-width="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      <!-- Abstract Annotations & Math -->
      <line
        x1="50"
        y1="50"
        x2="750"
        y2="50"
        stroke="#d96f2e"
        stroke-width="1"
        stroke-dasharray="5,5"
      />
      <text x="60" y="45" font-family="monospace" font-size="12" fill="#d96f2e">
        DOMAIN EXPANSION: z_{n+1} = z_n^2 + c
      </text>

      <!-- Fibonacci Squares for Framing -->
      <rect x="400" y="395" width="5" height="5" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="400" y="400" width="5" height="5" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="390" y="395" width="10" height="10" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="390" y="380" width="15" height="15" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="405" y="380" width="25" height="25" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="390" y="405" width="40" height="40" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="325" y="380" width="65" height="65" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />
      <rect x="325" y="275" width="105" height="105" fill="none" stroke="#2c3e50" stroke-width="0.5" stroke-dasharray="2,2" />

      <!-- Detailed Golden Ratio Spiral -->
      <path
        class="spiral-path"
        d="M 400 400 A 5 5 0 0 1 405 400 A 5 5 0 0 1 405 405 A 10 10 0 0 1 395 405 A 15 15 0 0 1 395 390 A 25 25 0 0 1 420 390 A 40 40 0 0 1 420 430 A 65 65 0 0 1 355 430 A 105 105 0 0 1 355 325 A 170 170 0 0 1 525 325"
        fill="none"
        stroke="#2c3e50"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{ transform: `rotate(${props.rotation || 0}deg)` }"
      />

      <!-- Integration Symbol and Formula -->
      <text
        x="100"
        y="200"
        font-family="monospace"
        font-size="24"
        fill="#2c3e50"
      >
        ∫
      </text>
      <text
        x="120"
        y="195"
        font-family="monospace"
        font-size="12"
        fill="#2c3e50"
      >
        f(x) dx = F(b) - F(a)
      </text>

      <circle
        cx="400"
        cy="400"
        r="200"
        fill="none"
        stroke="#2c3e50"
        stroke-width="0.5"
        stroke-dasharray="2,2"
      />

      <!-- Technical notes -->
      <text
        x="600"
        y="750"
        font-family="monospace"
        font-size="10"
        fill="#5c6a7d"
      >
        ITERATION LIMIT: N -> ∞
      </text>
      <text
        x="600"
        y="770"
        font-family="monospace"
        font-size="10"
        fill="#5c6a7d"
      >
        SCALE FACTOR: φ ≈ 1.618
      </text>
    </svg>
  </div>
</template>

<style scoped>
.pattern-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.field-notes-svg {
  width: 100%;
  height: 100%;
}
.spiral-path {
  transform-origin: 400px 400px;
}
</style>
