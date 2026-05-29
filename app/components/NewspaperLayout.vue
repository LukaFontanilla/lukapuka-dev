<script setup>
// No script needed
</script>

<template>
  <div class="newspaper-grid">
    <!-- Header Area -->
    <header class="newspaper-header">
      <div class="edition-info">
        <span>EDITION #001</span>
        <span>APRIL 16, 2026</span>
      </div>
      <h1 class="main-title">THE LUKA POST</h1>
      <h2 class="subtitle">Field Guide to Design & Development</h2>
    </header>

    <!-- Main Story: About Me -->
    <section class="main-story">
      <div class="colored-bg-accent">
        <h3>ABOUT THE AUTHOR</h3>
      </div>
      <p class="lead-text">
        "I started this site as a way to document my explorations in design and development. I've always been drawn to the intersection of art and science, and I wanted to create a digital space that reflects that."
      </p>
      <p>
        This field guide is a collection of my thoughts, projects, and readings. It's a work in progress, much like my own learning journey.
      </p>
      <p>
        I hope you find something here that inspires you, or at least makes you think. Feel free to explore and see what you find.
      </p>
    </section>

    <!-- Side Box 1: Writings -->
    <section class="side-box writings-summary">
      <h3>LATEST WRITINGS</h3>
      <ul>
        <li>
          <span class="date">NOV 02</span>
          <span class="title">Exploring Nuxt Content</span>
        </li>
        <li>
          <span class="date">OCT 28</span>
          <span class="title">Visual Systems in Web Design</span>
        </li>
      </ul>
      <NuxtLink to="/writings" class="more-link">View all writings →</NuxtLink>
    </section>

    <!-- Side Box 2: Readings -->
    <section class="side-box readings-summary">
      <h3>CURRENT READINGS</h3>
      <ul>
        <li>
          <span class="title">The Overstory</span>
          <span class="author">by Richard Powers</span>
        </li>
        <li>
          <span class="title">Silent Spring</span>
          <span class="author">by Rachel Carson</span>
        </li>
      </ul>
      <NuxtLink to="/readings" class="more-link">View reading log →</NuxtLink>
    </section>

    <!-- Small Filler Box -->
    <section class="filler-box">
      <div class="cutout-text">
        <span>INFO</span>
      </div>
      <p>Continuous exploration in progress.</p>
    </section>

    <!-- Weather/Data Box (Filler) -->
    <section class="data-box">
      <h3>LOCAL CONDITIONS</h3>
      <div class="data-row">
        <span>Status:</span>
        <span>Active</span>
      </div>
      <div class="data-row">
        <span>Focus:</span>
        <span>UI/UX</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.newspaper-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  font-family: 'Merriweather', serif; /* Using a serif font for that newspaper feel */
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-primary);
  height: 100%;
  overflow-y: auto;
}

.newspaper-header {
  grid-column: span 3;
  text-align: center;
  border-bottom: 3px double var(--clr-border);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.edition-info {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--clr-text-muted);
}

.main-title {
  font-family: 'Oswald', var(--font-family-sans); /* Strong title font */
  font-size: 4rem;
  color: var(--clr-accent-primary);
  margin: var(--spacing-sm) 0;
  letter-spacing: -2px;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: var(--font-weight-normal);
  color: var(--clr-text-secondary);
  font-style: italic;
}

.main-story {
  grid-column: span 2;
  grid-row: span 2;
  border-right: 1px solid var(--clr-border);
  padding-right: var(--spacing-md);
}

.main-story h3 {
  font-family: var(--font-family-mono);
  color: white;
  margin: 0;
  padding: 0.25rem 0.5rem;
}

.colored-bg-accent {
  background-color: var(--clr-accent-primary);
  display: inline-block;
  margin-bottom: var(--spacing-md);
}

.lead-text {
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: bold;
  margin-bottom: var(--spacing-md);
  color: var(--clr-text-primary);
}

.main-story p {
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  font-size: 0.95rem;
}

.side-box {
  background-color: var(--clr-bg-secondary);
  padding: var(--spacing-md);
  border: 1px solid var(--clr-border);
}

.side-box h3 {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--clr-accent-primary);
  margin-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--clr-border);
  padding-bottom: 0.25rem;
}

.side-box ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.side-box li {
  font-size: 0.85rem;
  margin-bottom: var(--spacing-sm);
  display: flex;
  justify-content: space-between;
}

.side-box .date {
  font-family: var(--font-family-mono);
  color: var(--clr-text-muted);
}

.more-link {
  display: block;
  font-size: 0.8rem;
  color: var(--clr-accent-secondary);
  text-decoration: none;
  margin-top: var(--spacing-sm);
  text-align: right;
  font-family: var(--font-family-mono);
}

.readings-summary li {
  flex-direction: column;
}

.readings-summary .author {
  font-size: 0.75rem;
  color: var(--clr-text-secondary);
}

.filler-box {
  border: 2px dashed var(--clr-border);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.cutout-text {
  background-color: var(--clr-text-primary);
  color: var(--clr-bg-primary);
  font-family: var(--font-family-mono);
  font-size: 1.5rem;
  padding: 0.25rem 0.75rem;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
}

.filler-box p {
  font-size: 0.8rem;
  color: var(--clr-text-secondary);
}

.data-box {
  border: 1px solid var(--clr-border);
  padding: var(--spacing-md);
}

.data-box h3 {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.data-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-family: var(--font-family-mono);
  margin-bottom: var(--spacing-xs);
}

/* Responsive */
@media (max-width: 768px) {
  .newspaper-grid {
    grid-template-columns: 1fr;
  }
  
  .newspaper-header, .main-story, .side-box, .filler-box, .data-box {
    grid-column: span 1 !important;
  }
  
  .main-story {
    border-right: none;
    border-bottom: 1px solid var(--clr-border);
    padding-bottom: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
}
</style>
