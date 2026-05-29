<template>
  <div class="pattern-container">
    <canvas ref="canvasRef" class="topo-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  
  // Set canvas size based on container
  canvas.width = 400
  canvas.height = 400
  
  // Use colors inspired by the theme
  ctx.strokeStyle = '#2c3e50' // --clr-text-primary
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.3
  
  // Draw some fake topographic lines
  for (let i = 0; i < 6; i++) {
    ctx.beginPath()
    let x = 0
    let y = 50 + i * 60
    ctx.moveTo(x, y)
    
    for (let j = 0; j < 400; j += 20) {
      // Use a combination of sine waves and random noise for organic feel
      const offset = Math.sin(j / 40 + i) * 30 + (Math.random() * 5 - 2.5)
      ctx.lineTo(j, y + offset)
    }
    ctx.stroke()
  }
})
</script>

<style scoped>
.pattern-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-md);
}

.topo-canvas {
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  background-color: var(--clr-bg-primary);
  max-width: 100%;
  height: auto;
}
</style>
