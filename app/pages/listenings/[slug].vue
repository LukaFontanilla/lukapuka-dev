<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

// Fetch the content entry by path from unified 'content' collection
const { data } = await useAsyncData(`listenings-${slug}`, () =>
  queryCollection("content").path(`/listenings/${slug}`).first(),
);

useSeoMeta({
  title: () => data.value?.title || "Listening Entry",
  ogTitle: () =>
    data.value?.title ? `${data.value.title} - Listening Log` : "Listening Log",
  description: () =>
    data.value?.description ||
    "A short field recording snippet in Luka's Field Guide.",
  ogDescription: () =>
    data.value?.description ||
    "A short field recording snippet in Luka's Field Guide.",
  ogImage: "/field_guide_stag.png",
  ogType: "article",
});
</script>

<template>
  <div class="article-container">
    <div v-if="data" class="article-card">
      <!-- Retro Back Link -->
      <NuxtLink to="/listenings" class="back-link">
        <span>◂ BACK TO LISTENINGS LOG</span>
      </NuxtLink>

      <header class="article-header">
        <div class="eyebrow-row">
          <span class="eyebrow-date">{{ data.date }}</span>
          <span class="eyebrow-type"
            >RECORDING TYPE: {{ data.type || "observation" }}</span
          >
        </div>
        <h1 class="article-title">{{ data.title }}</h1>
        <h2 v-if="data.subtitle" class="article-subtitle">
          Recorded Artist: {{ data.subtitle }}
        </h2>

        <div class="tags">
          <span v-for="tag in data.tags" :key="tag" class="tag"
            >✦ {{ tag }}</span
          >
        </div>
      </header>

      <!-- 📺 RETRO MEDIA EMBED PLAYER -->
      <div v-if="data.youtubeId" class="player-deck">
        <!-- Glow & Screen Container -->
        <div class="glowing-screen-wrapper">
          <div class="screen-border-bezel">
            <div class="video-aspect-ratio">
              <iframe
                :src="`https://www.youtube.com/embed/${data.youtubeId}?autoplay=0&rel=0&modestbranding=1`"
                title="Acoustic Specimen Player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                class="embedded-player"
              ></iframe>
            </div>
            <div class="crt-scanlines"></div>
            <div class="screen-glare"></div>
          </div>
          <div class="dial-indicator-row">
            <span class="dial-lamp text-green">SYNC LOCKED</span>
            <span class="dial-lamp text-orange">HI-FI BROADCAST</span>
            <span class="frequency-badge"
              >CH. {{ data.youtubeId.slice(0, 4).toUpperCase() }}</span
            >
          </div>
        </div>
      </div>

      <hr class="style-divider" />

      <!-- Specimen Notes / Snippet -->
      <div class="article-content">
        <h3 class="notes-header">Naturalist's Logbook Notes</h3>
        <ContentRenderer :value="data" />
      </div>

      <div class="card-footer">
        <span>↳ FIELD OBSERVATION DECK</span>
        <span>END OF SPECIMEN LOG</span>
      </div>
    </div>

    <div v-else class="error-msg-card">
      <span>[x] CRITICAL ERROR: AUDIO SPECIMEN LOG NOT FOUND</span>
      <NuxtLink to="/listenings" class="error-back"
        >Return to Station Tuner</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.article-container {
  padding: var(--spacing-xl);
  display: flex;
  justify-content: center;
}

.article-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  max-width: 760px;
  width: 100%;
  box-shadow: var(--shadow-md);
}

.back-link {
  display: inline-block;
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  color: var(--clr-accent-secondary);
  text-decoration: none;
  font-weight: bold;
  margin-bottom: var(--spacing-lg);
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--clr-accent-primary);
}

.article-header {
  margin-bottom: var(--spacing-lg);
}

.eyebrow-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: 0.75rem;
  color: var(--clr-text-muted);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.eyebrow-type {
  color: var(--clr-accent-primary);
  font-weight: bold;
}

.article-title {
  font-family: "Oswald", var(--font-family-sans);
  font-size: 2.4rem;
  color: var(--clr-accent-primary);
  margin: 0.25rem 0;
  line-height: 1.25;
}

.article-subtitle {
  font-family: "Merriweather", serif;
  font-size: 1.1rem;
  color: var(--clr-text-secondary);
  font-style: italic;
  margin-top: 0.25rem;
  margin-bottom: var(--spacing-md);
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  background-color: var(--clr-bg-secondary);
  color: var(--clr-text-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--clr-border);
}

.style-divider {
  border: none;
  border-top: double 4px var(--clr-border);
  margin: var(--spacing-lg) 0;
}

/* ==================== 📺 RETRO MEDIA EMBED PLAYER ==================== */
.player-deck {
  margin: var(--spacing-lg) 0;
  background-color: #2c3e50;
  border: 3px solid #1a252f;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.4),
    var(--shadow-sm);
  color: #ecf0f1;
}

.player-console {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  border-bottom: 1px solid #34495e;
  padding-bottom: 8px;
}

.console-label {
  color: #bdc3c7;
  font-weight: bold;
}

/* Retro Toggle Switch UI */
.toggle-switch-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch-side-label {
  font-weight: bold;
  color: #7f8c8d;
  transition: color 0.2s;
}

.switch-side-label.active {
  color: var(--clr-accent-primary);
  text-shadow: 0 0 4px rgba(217, 111, 46, 0.3);
}

.retro-toggle-switch {
  position: relative;
  width: 42px;
  height: 20px;
  background-color: #1a252f;
  border: 2px solid #34495e;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.switch-knob {
  position: absolute;
  left: 2px;
  width: 12px;
  height: 12px;
  background-color: #bdc3c7;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.2s ease,
    background-color 0.2s;
}

.switch-on {
  background-color: #2c3e50;
  border-color: var(--clr-accent-primary);
}

.switch-on .switch-knob {
  transform: translateX(22px);
  background-color: var(--clr-accent-primary);
  box-shadow: 0 0 6px var(--clr-accent-primary);
}

/* TV Bezel and CRT Feel */
.glowing-screen-wrapper {
  background-color: #0f172a;
  border: 8px solid #1e293b; /* Heavy terminal bezel color */
  border-radius: var(--border-radius-sm);
  box-shadow:
    inset 0 0 15px rgba(0, 0, 0, 0.9),
    0 0 10px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.video-aspect-ratio {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.embedded-player {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 1;
}

.crt-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
  background-size:
    100% 4px,
    6px 100%;
  z-index: 3;
  pointer-events: none;
}

.screen-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.05) 10%,
    transparent 60%
  );
  z-index: 4;
  pointer-events: none;
}

.dial-indicator-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: #1e293b;
  font-family: var(--font-family-mono);
  font-size: 0.65rem;
  border-top: 1px solid #0f172a;
}

.dial-lamp {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}

.dial-lamp::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 4px currentColor;
}

.text-green {
  color: #2ecc71;
}

.text-orange {
  color: var(--clr-accent-primary);
}

.frequency-badge {
  margin-left: auto;
  background-color: #0f172a;
  color: #94a3b8;
  padding: 2px 6px;
  border-radius: 3px;
}

/* Deactivated State */
.audio-placeholder {
  height: 220px;
  border: 2px dashed #34495e;
  border-radius: 4px;
  background-color: #1a252f;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-md);
}

.placeholder-pattern {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.pattern-text {
  font-family: var(--font-family-mono);
  font-size: 0.8rem;
  font-weight: bold;
  color: #e74c3c;
  letter-spacing: 0.5px;
}

.pattern-subtext {
  font-family: "Merriweather", serif;
  font-size: 0.75rem;
  font-style: italic;
  color: #bdc3c7;
}

/* ==================== SNIPPET ARTICLE STYLING ==================== */
.notes-header {
  font-family: "Oswald", var(--font-family-sans);
  color: var(--clr-accent-primary);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: 4px;
}

.card-footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--clr-border);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  color: var(--clr-text-muted);
}

/* Error State */
.error-msg-card {
  border: 2px dashed var(--clr-accent-danger);
  border-radius: var(--border-radius-md);
  background-color: var(--clr-bg-secondary);
  color: var(--clr-accent-danger);
  font-family: var(--font-family-mono);
  padding: var(--spacing-xl);
  text-align: center;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.error-back {
  color: var(--clr-text-primary);
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid var(--clr-text-primary);
  padding-bottom: 2px;
}

.error-back:hover {
  color: var(--clr-accent-primary);
  border-color: var(--clr-accent-primary);
}
</style>
