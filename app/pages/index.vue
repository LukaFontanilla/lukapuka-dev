<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSpiralState } from '~/composables/useSpiralState'

useSeoMeta({
  title: 'Home',
  ogTitle: "Luka's Field Guide - Design & Development Portfolio",
  description: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and ecology.',
  ogDescription: 'A collection of writings, data, and interactive design explorations by Luka Fontanilla. Documenting journeys in design, development, and ecology.',
  ogImage: '/field_guide_stag.png',
  twitterCard: 'summary_large_image',
  ogType: 'website'
})

const scrollContainer = ref<HTMLElement | null>(null)
const { spiralRotation } = useSpiralState()

const paragraphs = [
  "I started this site as a way to document my explorations in design and development. I've always been drawn to the intersection of art and programming, and I wanted to create a digital space that reflects that. To me that meant handwritting my own design system, CSS and Javascript components no frameworks, building a very clear and cohesive design system with a focus on a central theme (<i>National Park Field Guide</i>), having a mix of bit personal and work-related writing, and of course a sprinkle of random projects and other explorations.",
  "There's a lot of influence that I've take from other developers as it relates to this site design whether it be their <a href=\"https://chsmc.org/\">site design</a>, <a href=\"https://www.joshwcomeau.com/animation/scroll-driven-animations/\">writings</a>, OR unique <a href=\"https://sxywu.github.io/\">SVG art</a>. I hope that my own attempt to make something authentic, and different, but still relatable, can be a good example for others to draw inspiration from.",
  "This site is still very much a work in progress, but I plan to stay active in it's evolution. A few things to note: the site will match your system theme preference so give it a change in your settings to see a different side of it. It's written in <a href=\"https://nuxt.com/\">NuxtJS/TypeScript</a> and hosted on my personal domain.  Thanks for visiting."
]

const handleScroll = () => {
  if (scrollContainer.value) {
    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
    spiralRotation.value = progress * 90 // Dynamic rotation up to 90 degrees
  }
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="cover-page">
    
    <div class="unified-card">
      
      <!-- Vintage Stamped Specimen Label Header -->
      <div class="unified-header">
        <div class="label-meta">
          <span>CATALOGUE NO. 805</span>
          <span>HABITAT: PACIFIC OCEAN</span>
        </div>
        <h1 class="main-title">FIELD GUIDE</h1>
        <h2 class="cover-subtitle">Design & Development Portfolio</h2>
        <p class="cover-description">
          A collection of writings, data, and interactive explorations.
        </p>
      </div>
      
      <hr class="ledger-divider" />

      <!-- Fixed Header Section -->
      <div class="about-author-header">
        <h3>ABOUT THE AUTHOR</h3>
      </div>

      <!-- Ruled Journal Notepaper scrolling content -->
      <div class="scrollable-text-container notepaper" ref="scrollContainer">
        <div class="about-me-section">
          
          <!-- Interactive Specimen Lens (Rotates dynamically on Scroll, Minimal Themed SVG Diagram) -->
          <div class="specimen-lens">
            <svg 
              viewBox="0 0 120 120" 
              class="specimen-image"
              :style="{ transform: `rotate(${spiralRotation}deg)` }"
            >
              <!-- Background subtle compass/radar grid -->
              <line x1="10" y1="60" x2="110" y2="60" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,3" opacity="0.5" />
              <line x1="60" y1="10" x2="60" y2="110" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,3" opacity="0.5" />
              
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.6" />
              <circle cx="60" cy="60" r="30" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.6" />
              <circle cx="60" cy="60" r="10" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.6" />
              
              <!-- Outer compass frame -->
              <circle cx="60" cy="60" r="56" fill="none" stroke="var(--clr-border)" stroke-width="1" opacity="0.8" />
              <circle cx="60" cy="60" r="53" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,4" opacity="0.6" />
              
              <!-- Golden Spiral Path -->
              <path 
                d="M 70,70 A 5,5 0 0,1 65,70 A 10,10 0 0,1 65,60 A 15,15 0 0,1 80,60 A 25,25 0 0,1 80,85 A 40,40 0 0,1 40,85 A 65,65 0 0,1 40,20 A 105,105 0 0,1 145,20" 
                fill="none" 
                stroke="var(--clr-accent-primary)" 
                stroke-width="1.5" 
                stroke-linecap="round"
              />
              
              <!-- Elegant Mono Typography Scientific Markings -->
              <text x="74" y="78" font-size="7" font-family="var(--font-family-mono)" fill="var(--clr-accent-primary)" opacity="0.9" font-weight="bold">φ</text>
              <text x="18" y="104" font-size="5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)" opacity="0.8">r = ae^(bθ)</text>
              <text x="80" y="20" font-size="4.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)" opacity="0.8">SPECIMEN #0815</text>
            </svg>
            <div class="lens-overlay"></div>
          </div>
          
          <p v-for="(para, idx) in paragraphs" :key="idx" v-html="para"></p>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* --- BASE LAYOUT & WRAPPERS --- */
.cover-page {
  position: relative;
  height: 100%;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* --- UNIFIED CARD STRUCTURE --- */
.unified-card {
  background-color: var(--clr-bg-primary);
  border: 1px solid var(--clr-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 45rem;
  height: 80%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.unified-header {
  padding: var(--spacing-md) var(--spacing-lg) 0 var(--spacing-lg);
  text-align: center;
}

.label-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-mono);
  font-size: 0.7rem;
  color: var(--clr-text-muted);
  margin-bottom: var(--spacing-xs);
  letter-spacing: 1.5px;
}

.main-title {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 2.2rem;
  color: var(--clr-accent-primary);
  margin: 0.2rem 0;
  text-transform: uppercase;
}

.cover-subtitle {
  color: var(--clr-text-secondary);
  font-size: 1.1rem;
  font-weight: var(--font-weight-normal);
  font-style: italic;
  margin: 0;
}

.cover-description {
  font-family: 'Merriweather', serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--clr-text-secondary);
  margin: var(--spacing-sm) auto;
  max-width: 80ch;
  opacity: 0.85;
}

.ledger-divider {
  border: none;
  border-top: 1px dashed var(--clr-border);
  margin: var(--spacing-sm) 0 0 0;
}

/* --- REUSED NOTEPAPER LINES --- */
.scrollable-text-container {
  position: relative;
  width: 100%;
  height: 24rem; /* Compact scroll height inside the unified card */
  overflow-y: auto;
  padding: var(--spacing-xs) var(--spacing-lg) var(--spacing-md) var(--spacing-lg);
  z-index: 1;
}

.scrollable-text-container.notepaper {
  /* Ruled notebook lines aligned exactly to 30px increments */
  background-image: linear-gradient(
    to bottom,
    transparent 28px,
    rgba(92, 106, 125, 0.1) 29px,
    rgba(92, 106, 125, 0.1) 30px,
    transparent 31px
  );
  background-size: 100% 30px;
  line-height: 30px;
  background-attachment: local;
}

.scrollable-text-container::-webkit-scrollbar {
  width: 6px;
}

.scrollable-text-container::-webkit-scrollbar-thumb {
  background-color: var(--clr-border);
  border-radius: 3px;
}

.about-me-section {
  text-align: left;
}

.about-author-header {
  padding: var(--spacing-md) var(--spacing-lg) 0 var(--spacing-lg);
  background-color: var(--clr-bg-primary);
  z-index: 3;
}

.about-author-header h3 {
  font-family: var(--font-family-mono);
  font-size: 0.8rem;
  color: var(--clr-accent-primary);
  margin-bottom: var(--spacing-xs);
  margin-top: 0;
  letter-spacing: 1.5px;
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-xs);
}

@keyframes round-circle {
  0% {
    padding-left: 0;
    opacity: 0.8;
    filter: blur(0.2px);
  }
  12% {
    padding-left: 0;
    opacity: 0.8;
    filter: blur(0.5px);
  }
  50% {
    padding-left: 2rem; /* Generous shift to completely clear the 120px lens with beautiful breathing room */
    opacity: 1;
    filter: blur(0);
  }
  88% {
    padding-left: 0;
    opacity: 0.8;
    filter: blur(0.5px);
  }
  100% {
    padding-left: 0;
    opacity: 0.8;
    filter: blur(0.2px);
  }
}

.about-me-section p {
  font-family: 'Merriweather', serif;
  line-height: 30px; /* Aligned to ruled lines */
  margin-bottom: 30px; /* Aligned to ruled lines */
  font-size: 0.92rem;
  color: var(--clr-text-primary);
  animation: round-circle 1s both;
  animation-timeline: view(block -40px calc(100% - 160px));
}

.about-me-section p :deep(a) {
  color: var(--clr-accent-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--clr-accent-primary);
  transition: color var(--transition-duration) var(--transition-timing), border-bottom-color var(--transition-duration) var(--transition-timing);
}

.about-me-section p :deep(a):hover {
  color: var(--clr-accent-secondary);
  border-bottom-style: solid;
  border-bottom-color: var(--clr-accent-secondary);
}

/* --- CORE SPECIMEN LENS STYLE (Floats & wraps bio text) --- */
.specimen-lens {
  float: left;
  position: sticky;
  top: var(--spacing-xs);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  shape-outside: circle(50%);
  margin-right: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  z-index: 2;
  overflow: hidden;
  border: 2px solid var(--clr-border);
  box-shadow: var(--shadow-md);
  background-color: var(--clr-bg-secondary);
}

.specimen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.15s cubic-bezier(0.1, 0.8, 0.3, 1);
}


.lens-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Microscope glass specular highlight reflection */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 41%,
    transparent 100%
  );
  pointer-events: none;
  border-radius: 50%;
}
</style>