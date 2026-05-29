<template>
  <div class="physical-tabs">
    <NuxtLink to="/" class="tab" active-class="tab--active">Home</NuxtLink>
    <NuxtLink to="/writings" class="tab" active-class="tab--active">Writing</NuxtLink>
    <NuxtLink to="/readings" class="tab" active-class="tab--active">Readings</NuxtLink>
  </div>
</template>

<style scoped>
.physical-tabs {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.tab {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-right: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem 0 0 0.25rem;
  text-decoration: none;
  color: var(--clr-text-secondary);
  font-family: 'Merriweather', serif;
  font-size: 0.85rem;
  transition: all 0.2s;
  box-shadow: -2px 1px 3px rgba(0,0,0,0.05);
  margin-right: -1px; /* Overlap border */
}

.tab:hover {
  background-color: var(--clr-bg-secondary);
  transform: translateX(-1px);
}

.tab--active {
  background-color: var(--clr-bg-primary);
  font-weight: bold;
  color: var(--clr-accent-primary);
  border-left: 3px solid var(--clr-accent-primary);
  transform: translateX(-2px);
  z-index: 1; /* Above border */
}
</style>
