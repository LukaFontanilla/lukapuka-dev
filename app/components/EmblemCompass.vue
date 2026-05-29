<template>
  <div class="emblem-container">
    <svg viewBox="0 0 100 100" class="emblem-svg">
      <!-- Compass Rose -->
      <!-- Outer Circle -->
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" />
      <!-- Inner Circle -->
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1" />
      <!-- Star Points -->
      <path d="M 50, 5 
               L 53, 40 
               L 85, 40 
               L 60, 50 
               L 75, 80 
               L 50, 60 
               L 25, 80 
               L 40, 50 
               L 15, 40 
               L 47, 40 Z" 
            fill="currentColor" />
      <!-- Crosshairs -->
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="0.5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="0.5" />
    </svg>
  </div>
</template>

<style scoped>
.emblem-container {
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
}

.emblem-svg {
  width: 100%;
  height: 100%;
  color: var(--clr-accent-primary);
  opacity: 0.8;
}
</style>
