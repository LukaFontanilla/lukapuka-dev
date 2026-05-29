<template>
  <div class="emblem-container">
    <svg viewBox="0 0 100 100" class="emblem-svg">
      <!-- Stylized Leaf Silhouette -->
      <path d="M 50, 95 
               C 20, 80 5, 50 20, 20 
               C 30, 5 45, 0 50, 5 
               C 55, 0 70, 5 80, 20 
               C 95, 50 80, 80 50, 95 Z" 
            fill="currentColor" />
      <!-- Stem -->
      <path d="M 50, 95 L 50, 100" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
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
  color: var(--clr-accent-primary); /* Assuming this is the orange or a suitable color */
  opacity: 0.8;
}
</style>
