<template>
    <canvas ref="canvasEl" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasEl = ref(null);
// We declare the observer here so it's accessible in onUnmounted
let observer = null;

function resizeAndDraw() {
  const canvas = canvasEl.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // The element we read styles from is now the document's root
  const rootEl = document.documentElement;
  
  // Set canvas resolution
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Read the CSS variables from the root element
  const computedStyles = getComputedStyle(rootEl);
  const branchColor = computedStyles.getPropertyValue('--clr-text-secondary').trim();
  const shadowColor = computedStyles.getPropertyValue('--clr-text-muted').trim();

  // The recursive draw function (unchanged)
  function draw(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = branchColor;
    ctx.shadowColor = shadowColor;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    ctx.shadowBlur = 5;
    if (len < 10) {
      ctx.restore();
      return;
    }
    draw(0, -len, len * 0.8, -15, branchWidth * 0.8);
    draw(0, -len, len * 0.8, 15, branchWidth * 0.8);
    ctx.restore();
  }

  draw(canvas.width / 2, canvas.height, 120, 0, 10);
}

onMounted(() => {
  // Initial draw
  resizeAndDraw();
  
  // Listen for window resizing
  window.addEventListener('resize', resizeAndDraw);

//   // --- Step 1: Create the observer ---
//   // The callback function fires whenever a mutation is observed
//   observer = new MutationObserver((mutationsList) => {
//     // We only care that an attribute changed, so we just redraw
//     for (const mutation of mutationsList) {
//       if (mutation.type === 'attributes') {
//         resizeAndDraw();
//         break; // No need to check other mutations
//       }
//     }
//   });

//   // --- Step 2: Start observing the document element ---
//   // We tell it to watch the <html> tag for any changes to its attributes
//   observer.observe(document.documentElement, { attributes: true });
});

onUnmounted(() => {
  // --- Step 3: Disconnect the observer to prevent memory leaks ---
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener('resize', resizeAndDraw);
});
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
</style>