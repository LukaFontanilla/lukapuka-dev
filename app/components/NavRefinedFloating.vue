<template>
  <div class="refined-nav">
    <div class="nav-content">
      <NuxtLink to="/" class="nav-item" active-class="nav-item--active">
        <span class="indicator">•</span> Home
      </NuxtLink>
      <NuxtLink to="/writings" class="nav-item" active-class="nav-item--active">
        <span class="indicator">•</span> Writing
      </NuxtLink>
      <NuxtLink to="/readings" class="nav-item" active-class="nav-item--active">
        <span class="indicator">•</span> Readings
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.refined-nav {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  padding: 0.75rem 1rem;
  box-shadow: var(--shadow-md);
  width: auto;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--clr-text-secondary);
  font-size: 0.9rem;
  transition: all 0.2s;
  opacity: 0.8;
}

.indicator {
  opacity: 0;
  color: var(--clr-accent-primary);
  transition: opacity 0.2s;
}

.nav-item:hover {
  opacity: 1;
  color: var(--clr-accent-primary);
}

.nav-item--active {
  opacity: 1;
  font-weight: bold;
}

.nav-item--active .indicator {
  opacity: 1;
}
</style>
