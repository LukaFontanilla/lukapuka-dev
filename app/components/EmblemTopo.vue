<template>
  <div class="emblem-container">
    <svg viewBox="0 0 100 100" class="emblem-svg">
      <!-- Topographic Contour Fragment -->
      <path d="M 10, 50 C 20, 20 80, 10 90, 50 C 80, 90 20, 80 10, 50" fill="none" stroke="currentColor" stroke-width="1" />
      <path d="M 25, 50 C 35, 30 65, 25 75, 50 C 65, 75 35, 70 25, 50" fill="none" stroke="currentColor" stroke-width="1" />
      <path d="M 40, 50 C 45, 40 55, 35 60, 50 C 55, 65 45, 60 40, 50" fill="none" stroke="currentColor" stroke-width="1" />
      <path d="M 48, 50 C 49, 45 51, 45 52, 50 C 51, 55 49, 55 48, 50" fill="none" stroke="currentColor" stroke-width="1" />
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
