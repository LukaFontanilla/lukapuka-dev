<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSpiralState } from '~/composables/useSpiralState'

const router = useRouter()
const scrollContainer = ref<HTMLElement | null>(null)
const { activeSpecimenIndex } = useSpiralState()

const paragraphs = [
  "<span class=\"archival-lead\">I started this site</span> as a way to document my explorations in <em class=\"ink-green\">design and development</em>. I've always been drawn to the intersection of art and programming, and I wanted to create a digital space that reflects that in an authentic way. To me that meant handwriting my own design system, CSS and JavaScript components with <span class=\"ink-rust\">no frameworks</span>, building a very clear and cohesive design system with a focus on a central theme (<em class=\"ink-rust\">National Park Field Guide</em>).",

  "There's a lot of influence that I've taken from other developers as it relates to this site design whether it be their <a href=\"https://chsmc.org/\">site design</a>, <a href=\"https://www.joshwcomeau.com/animation/scroll-driven-animations/\">writings</a>, or unique <a href=\"https://sxywu.github.io/\">SVG art</a>. I hope that my own attempt to make something <em class=\"ink-green\">authentic, different, but still relatable</em>, can be a good example for others to draw inspiration from.",

  "My <a href=\"/writings\">writings</a> will mostly be about <span class=\"archival-caps rust\">technology</span>, <span class=\"archival-caps green\">development</span>, and <span class=\"archival-caps gold\">design</span>—some taken directly from work engagements, others tied to personal interests, musings, and eventually <em class=\"ink-rust\">abstract short stories</em>. The <a href=\"/listenings\">listenings page</a> is my attempt to share <em class=\"ink-green\">sonic recordings and live performances</em> that have inspired me and that I want others to hear. You'll find that my <a href=\"/readings\">readings</a> are eclectic—a mix of <span class=\"archival-caps\">short stories</span>, <span class=\"archival-caps green\">fantasy & sci-fi novels</span>, <span class=\"archival-caps rust\">horror</span>, and <em class=\"ink-gold\">journalist deep dives into underground societies</em>.",

  "This site is still very much a <em class=\"ink-rust\">work in progress</em>, but I plan to stay active in its evolution. The site will match your <span class=\"archival-caps\">system theme preference</span> so give it a change in your settings to see a different side of it. It's written in <a href=\"https://nuxt.com/\">NuxtJS/TypeScript</a> and hosted on my personal domain. <em class=\"ink-green\">Thanks for visiting.</em>"
]

const handleScroll = () => {
  if (scrollContainer.value) {
    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0

    // Sync active specimen SVG to scroll progress across 4 topological specimens
    const specIndex = Math.min(Math.floor(progress * 4), 3)
    activeSpecimenIndex.value = specIndex
  }
}

const handleBioClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const link = target.closest('a')
  if (link) {
    const href = link.getAttribute('href')
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault()
      router.push(href)
    }
  }
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="scrollable-text-container notepaper" ref="scrollContainer">
    <div class="about-me-section" @click="handleBioClick">
      <p v-for="(para, idx) in paragraphs" :key="idx" class="bio-paragraph" v-html="para"></p>
    </div>
  </div>
</template>

<style scoped>
/* --- REUSED NOTEPAPER LINES --- */
.scrollable-text-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xl) var(--spacing-lg);
  z-index: 1;
}

.scrollable-text-container.notepaper {
  /* Ruled notebook lines aligned exactly to 30px increments */
 
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

/* Pronounced, GPU-composited entry & exit ink reveal animation */
@keyframes ink-reveal-exit {
  0% {
    opacity: 0.15;
    transform: translateY(14px) scale(0.98);
    filter: blur(1.5px);
  }
  18% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  82% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0.15;
    transform: translateY(-14px) scale(0.98);
    filter: blur(1.5px);
  }
}

.about-me-section .bio-paragraph {
  font-family: 'Merriweather', serif;
  line-height: 30px; /* Aligned to ruled lines */
  margin-bottom: 30px; /* 30px spacing keeping grid rhythm */
  font-size: 0.95rem;
  color: var(--clr-text-primary);
  box-sizing: border-box;
  animation: ink-reveal-exit linear both;
  animation-timeline: view(block);
  animation-range: entry 0% exit 100%;
}

.about-me-section .bio-paragraph :deep(a) {
  color: var(--clr-accent-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--clr-accent-primary);
  transition: color var(--transition-duration) var(--transition-timing), border-bottom-color var(--transition-duration) var(--transition-timing);
}

.about-me-section .bio-paragraph :deep(a):hover {
  color: var(--clr-accent-secondary);
  border-bottom-style: solid;
  border-bottom-color: var(--clr-accent-secondary);
}

/* ARCHIVAL MONOGRAPH PRESET STYLES */
.about-me-section .bio-paragraph :deep(.archival-lead) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section .bio-paragraph :deep(.archival-caps) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section .bio-paragraph :deep(.archival-caps.rust) {
  color: var(--clr-accent-primary);
}

.about-me-section .bio-paragraph :deep(.archival-caps.green) {
  color: var(--clr-accent-secondary);
}

.about-me-section .bio-paragraph :deep(.archival-caps.gold) {
  color: var(--clr-accent-warning);
}

.about-me-section .bio-paragraph :deep(.ink-rust) {
  color: var(--clr-accent-primary);
  font-weight: 600;
}

.about-me-section .bio-paragraph :deep(.ink-green) {
  color: var(--clr-accent-secondary);
  font-weight: 600;
}

.about-me-section .bio-paragraph :deep(.ink-gold) {
  color: var(--clr-accent-warning);
}

@media (max-width: 768px) {
  .scrollable-text-container {
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-md) var(--spacing-md);
  }
}
</style>
