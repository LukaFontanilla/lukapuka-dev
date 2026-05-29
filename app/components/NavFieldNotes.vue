<template>
  <div class="field-notes-nav">
    <div class="tag-header">INDEX</div>
    <div class="links">
      <NuxtLink to="/" class="nav-link" active-class="active">Home</NuxtLink>
      <NuxtLink to="/writings" class="nav-link" active-class="active">Writing</NuxtLink>
      <NuxtLink to="/readings" class="nav-link" active-class="active">Readings</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.field-notes-nav {
  background-color: var(--clr-bg-primary);
  border: 1px dashed var(--clr-border);
  padding: 0.75rem;
  width: 110px;
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-mono);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-right: -1px; /* Align to edge */
}

.tag-header {
  font-size: 0.65rem;
  color: var(--clr-text-muted);
  text-align: center;
  border-bottom: 1px dashed var(--clr-border);
  padding-bottom: 0.25rem;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  text-decoration: none;
  color: var(--clr-text-secondary);
  font-size: 0.75rem;
  transition: color 0.2s;
  text-align: center;
}

.nav-link:hover {
  color: var(--clr-accent-primary);
}

.nav-link.active {
  color: var(--clr-accent-primary);
  font-weight: bold;
}
</style>
