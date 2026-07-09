<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSpiralState } from '~/composables/useSpiralState'

const router = useRouter()
const scrollContainer = ref<HTMLElement | null>(null)
const { spiralRotation } = useSpiralState()

const specimens = [
  {
    id: 'FIG 1.1',
    key: 'torus',
    label: 'Torus Quotient Map',
    formula: 'I² / ∼  ──►  T²',
    sub: 'word: a b a⁻¹ b⁻¹'
  },
  {
    id: 'FIG 1.2',
    key: 'homotopy',
    label: 'Homotopy Group π₁',
    formula: 'π₁(X, x₀) ≅ ℤ',
    sub: 'γ₀ ≃ γ₁ (homotopic)'
  },
  {
    id: 'FIG 1.3',
    key: 'hopf',
    label: 'Hopf Fibration Link',
    formula: 'S¹ ↪ S³ ──► S²',
    sub: 'Lk(γ₁, γ₂) = 1'
  },
  {
    id: 'FIG 1.4',
    key: 'euler',
    label: 'Euler Characteristic',
    formula: 'χ(M_g) = 2 - 2g',
    sub: 'g = 1 | b₀=1,b₁=2,b₂=1'
  }
]

const currentSpecimenIndex = ref(0)
const activeSpecimen = computed(() => specimens[currentSpecimenIndex.value])

const nextSpecimen = () => {
  currentSpecimenIndex.value = (currentSpecimenIndex.value + 1) % specimens.length
}

const setSpecimen = (index: number) => {
  currentSpecimenIndex.value = index
}

const bioLines = [
  "<span class=\"archival-lead\">I started this site</span> as a way to document my explorations in <em class=\"ink-green\">design and development</em>.",
  "I've always been drawn to the intersection of art and programming, and I wanted to create a digital space that reflects that in an authentic way.",
  "To me that meant handwriting my own design system, CSS and JavaScript components with <span class=\"ink-rust\">no frameworks</span>,",
  "building a very clear and cohesive design system with a focus on a central theme (<em class=\"ink-rust\">National Park Field Guide</em>),",
  "having a mix of personal and work-related writing, and of course a sprinkle of random projects—other explorations, topology concepts, and music.",
  "There's a lot of influence that I've taken from other developers as it relates to this site design whether it be their <a href=\"https://chsmc.org/\">site design</a>,",
  "<a href=\"https://www.joshwcomeau.com/animation/scroll-driven-animations/\">writings</a>, OR unique <a href=\"https://sxywu.github.io/\">SVG art</a>.",
  "I hope that my own attempt to make something <em class=\"ink-green\">authentic, different, but still relatable</em>, can be a good example for others to draw inspiration from.",
  "My <a href=\"/writings\">writings</a> will mostly be about <span class=\"archival-caps rust\">technology</span>, <span class=\"archival-caps green\">development</span>, and <span class=\"archival-caps gold\">design</span>. Some taken directly from work engagements, others tied to personal interests and musings.",
  "Eventually my <em class=\"ink-rust\">abstract short stories</em> will land on that page too.",
  "The <a href=\"/listenings\">listenings page</a> is my attempt to share <em class=\"ink-green\">sonic recordings and live performances</em> that have inspired me, captured my attention, that I have learned from, and want others to hear.",
  "You'll find that my <a href=\"/readings\">readings</a> are eclectic—a mix of <span class=\"archival-caps\">short stories</span>, <span class=\"archival-caps green\">fantasy & sci-fi novels</span>, <span class=\"archival-caps rust\">horror</span>, <em class=\"ink-gold\">journalist deep dives into underground societies</em>, and a bit of everything else in between.",
  "This site is still very much a <em class=\"ink-rust\">work in progress</em>, but I plan to stay active in its evolution. A few things to note: the site will match your <span class=\"archival-caps\">system theme preference</span> so give it a change in your settings to see a different side of it.",
  "It's written in <a href=\"https://nuxt.com/\">NuxtJS/TypeScript</a> and hosted on my personal domain. <em class=\"ink-green\">Thanks for visiting.</em>"
]

const handleScroll = () => {
  if (scrollContainer.value) {
    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
    spiralRotation.value = progress * 90 // Dynamic rotation up to 90 degrees
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
  <div class="scrollable-text-container notepaper" ref="scrollContainer">
    <div class="about-me-section" @click="handleBioClick">
      <!-- Interactive Topological Specimen Container (Floats left, cycles on click) -->
      <div class="specimen-interactive-group">
        <div 
          class="specimen-lens" 
          @click="nextSpecimen"
          :title="`Click to switch topology specimen: ${activeSpecimen.label}`"
          role="button"
          tabindex="0"
          @keydown.enter="nextSpecimen"
          @keydown.space.prevent="nextSpecimen"
        >
          <Transition name="specimen-fade" mode="out-in">
            <!-- Option 1: Torus Quotient Polygon -->
            <svg 
              v-if="activeSpecimen.key === 'torus'"
              key="torus"
              viewBox="0 0 120 120" 
              class="specimen-image"
              :style="{ transform: `rotate(${spiralRotation}deg)` }"
            >
              <circle cx="60" cy="60" r="56" fill="none" stroke="var(--clr-border)" stroke-width="1" opacity="0.8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.5" />

              <!-- Fundamental Polygon Domain I² -->
              <rect x="36" y="36" width="48" height="48" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.2" />

              <!-- Edge Arrows: a (top/bottom -> right) -->
              <path d="M 56 36 L 62 36 M 59 33 L 62 36 L 59 39" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.2" />
              <path d="M 56 84 L 62 84 M 59 81 L 62 84 L 59 87" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.2" />

              <!-- Edge Arrows: b (left/right -> up) -->
              <path d="M 36 62 L 36 56 M 33 59 L 36 56 L 39 59" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.2" />
              <path d="M 84 62 L 84 56 M 81 59 L 84 56 L 87 59" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.2" />

              <!-- Identified Vertices v_0 -->
              <circle cx="36" cy="36" r="2.3" fill="var(--clr-accent-primary)" />
              <circle cx="84" cy="36" r="2.3" fill="var(--clr-accent-primary)" />
              <circle cx="84" cy="84" r="2.3" fill="var(--clr-accent-primary)" />
              <circle cx="36" cy="84" r="2.3" fill="var(--clr-accent-primary)" />

              <!-- Technical Annotations -->
              <text x="60" y="24" text-anchor="middle" font-size="6.5" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-accent-primary)">I² / ∼  ──►  T²</text>
              <text x="60" y="102" text-anchor="middle" font-size="5.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">word: a b a⁻¹ b⁻¹</text>
              <text x="60" y="62.5" text-anchor="middle" font-size="6.5" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-text-muted)" opacity="0.85">χ = 0</text>
            </svg>

            <!-- Option 2: Homotopy Group -->
            <svg 
              v-else-if="activeSpecimen.key === 'homotopy'"
              key="homotopy"
              viewBox="0 0 120 120" 
              class="specimen-image"
              :style="{ transform: `rotate(${spiralRotation}deg)` }"
            >
              <circle cx="60" cy="60" r="56" fill="none" stroke="var(--clr-border)" stroke-width="1" opacity="0.8" />
              <circle cx="60" cy="60" r="49" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,3" opacity="0.5" />

              <!-- Topological Puncture -->
              <circle cx="52" cy="58" r="9" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.1" stroke-dasharray="2,2" />
              <circle cx="52" cy="58" r="1.5" fill="var(--clr-accent-primary)" opacity="0.7" />

              <!-- Basepoint x0 -->
              <circle cx="85" cy="58" r="2.5" fill="var(--clr-text-primary)" />
              <text x="91" y="61" font-size="6" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-text-primary)">x₀</text>

              <!-- Homotopy Loop gamma_0 (Solid) -->
              <path d="M 85 58 C 85 22, 25 22, 25 58 C 25 94, 85 94, 85 58" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.4" />
              <text x="32" y="32" font-size="6.5" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-accent-primary)">γ₀</text>

              <!-- Homotopy Loop gamma_1 (Dashed Deformation) -->
              <path d="M 85 58 C 80 32, 36 32, 36 58 C 36 84, 80 84, 85 58" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.1" stroke-dasharray="3,3" opacity="0.8" />
              <text x="67" y="44" font-size="5.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">γ₁</text>

              <!-- Technical Annotations -->
              <text x="60" y="19" text-anchor="middle" font-size="6.2" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-text-primary)">π₁(X, x₀) ≅ ℤ</text>
              <text x="60" y="105" text-anchor="middle" font-size="5.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">γ₀ ≃ γ₁ (HOMOTOPIC)</text>
            </svg>

            <!-- Option 3: Hopf Fibration -->
            <svg 
              v-else-if="activeSpecimen.key === 'hopf'"
              key="hopf"
              viewBox="0 0 120 120" 
              class="specimen-image"
              :style="{ transform: `rotate(${spiralRotation}deg)` }"
            >
              <circle cx="60" cy="60" r="56" fill="none" stroke="var(--clr-border)" stroke-width="1" opacity="0.8" />
              <circle cx="60" cy="60" r="46" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,4" opacity="0.5" />

              <!-- Background meridian projection S² -->
              <ellipse cx="60" cy="58" rx="35" ry="12" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="1,2" opacity="0.4" />

              <!-- Fiber Circle 1 (Left/Upper) -->
              <ellipse cx="48" cy="55" rx="22" ry="22" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.5" />
              
              <!-- Fiber Circle 2 (Right/Lower) with Over/Under Crossing Gap -->
              <path d="M 65 36 A 22 22 0 1 1 53 73" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.5" />
              <path d="M 49 67 A 22 22 0 0 1 57 39" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.5" />

              <!-- Crossing highlight dots -->
              <circle cx="61" cy="40" r="1.5" fill="var(--clr-accent-primary)" />
              <circle cx="51" cy="70" r="1.5" fill="var(--clr-accent-primary)" />

              <!-- Technical Annotations -->
              <text x="60" y="21" text-anchor="middle" font-size="6.2" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-accent-primary)">S¹ ↪ S³ ──► S²</text>
              <text x="60" y="103" text-anchor="middle" font-size="5.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">Lk(γ₁, γ₂) = 1</text>
            </svg>

            <!-- Option 4: Euler Characteristic & Surface Genus -->
            <svg 
              v-else
              key="euler"
              viewBox="0 0 120 120" 
              class="specimen-image"
              :style="{ transform: `rotate(${spiralRotation}deg)` }"
            >
              <circle cx="60" cy="60" r="56" fill="none" stroke="var(--clr-border)" stroke-width="1" opacity="0.8" />
              <circle cx="60" cy="60" r="51" fill="none" stroke="var(--clr-border)" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.5" />

              <!-- Torus Outer Profile -->
              <ellipse cx="60" cy="58" rx="34" ry="20" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.4" />

              <!-- Inner Handle Hole (Upper & Lower Curves) -->
              <path d="M 46 56 Q 60 68 74 56" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.3" />
              <path d="M 49 59 Q 60 51 71 59" fill="none" stroke="var(--clr-text-primary)" stroke-width="1.3" />

              <!-- Meridian Cycle alpha (around handle cross-section) -->
              <ellipse cx="78" cy="58" rx="5" ry="15" fill="none" stroke="var(--clr-accent-primary)" stroke-width="1.2" stroke-dasharray="2,1.5" />
              <text x="86" y="52" font-size="6" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-accent-primary)">α</text>

              <!-- Technical Annotations -->
              <text x="60" y="22" text-anchor="middle" font-size="6.2" font-family="var(--font-family-mono)" font-weight="bold" fill="var(--clr-accent-primary)">χ(M_g) = 2 - 2g</text>
              <text x="60" y="97" text-anchor="middle" font-size="5.5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">GENUS g = 1  |  χ = 0</text>
              <text x="60" y="106" text-anchor="middle" font-size="5" font-family="var(--font-family-mono)" fill="var(--clr-text-muted)">b₀=1,  b₁=2,  b₂=1</text>
            </svg>
          </Transition>

          <div class="lens-overlay"></div>
          <div class="lens-click-hint">↻ CYCLE</div>
        </div>
      </div>
      
      <p v-for="(line, idx) in bioLines" :key="idx" class="bio-line" v-html="line"></p>
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

@keyframes orbit-line {
  0% {
    padding-left: 0px;
    transform: rotate(0deg);
    opacity: 0.7;
  }
  50% {
    padding-left: 0px;
    transform: rotate(0deg);
    opacity: 0.85;
  }
  64% {
    padding-left: 70px;
    transform: rotate(-0.4deg);
    opacity: 0.95;
  }
  78% {
    padding-left: 144px;
    transform: rotate(0deg);
    opacity: 1;
  }
  92% {
    padding-left: 110px;
    transform: rotate(0.3deg);
    opacity: 0.95;
  }
  100% {
    padding-left: 75px;
    transform: rotate(0deg);
    opacity: 0.9;
  }
}

.about-me-section .bio-line {
  font-family: 'Merriweather', serif;
  line-height: 30px; /* Aligned to ruled lines */
  margin-bottom: 15px; /* Half-line rhythm keeping 30px grid alignment */
  font-size: 0.92rem;
  color: var(--clr-text-primary);
  box-sizing: border-box;
  transform-origin: left center;
  animation: orbit-line 1s linear both;
  animation-timeline: view(block);
}

.about-me-section .bio-line :deep(a) {
  color: var(--clr-accent-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--clr-accent-primary);
  transition: color var(--transition-duration) var(--transition-timing), border-bottom-color var(--transition-duration) var(--transition-timing);
}

.about-me-section .bio-line :deep(a):hover {
  color: var(--clr-accent-secondary);
  border-bottom-style: solid;
  border-bottom-color: var(--clr-accent-secondary);
}

/* ARCHIVAL MONOGRAPH PRESET STYLES */
.about-me-section .bio-line :deep(.archival-lead) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section .bio-line :deep(.archival-caps) {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--clr-text-primary);
}

.about-me-section .bio-line :deep(.archival-caps.rust) {
  color: var(--clr-accent-primary);
}

.about-me-section .bio-line :deep(.archival-caps.green) {
  color: var(--clr-accent-secondary);
}

.about-me-section .bio-line :deep(.archival-caps.gold) {
  color: var(--clr-accent-warning);
}

.about-me-section .bio-line :deep(.ink-rust) {
  color: var(--clr-accent-primary);
  font-weight: 600;
}

.about-me-section .bio-line :deep(.ink-green) {
  color: var(--clr-accent-secondary);
  font-weight: 600;
}

.about-me-section .bio-line :deep(.ink-gold) {
  color: var(--clr-accent-warning);
  font-weight: 600;
}

/* --- CORE SPECIMEN INTERACTIVE CONTAINER (Floats & wraps bio text) --- */
.specimen-interactive-group {
  float: left;
  position: sticky;
  top: var(--spacing-xs);
  width: 128px;
  height: 128px;
  margin-right: 1.5rem;
  margin-bottom: var(--spacing-sm);
  shape-outside: circle(64px at 50% 50%);
  shape-margin: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.specimen-lens {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--clr-border);
  box-shadow: var(--shadow-md);
  background-color: var(--clr-bg-secondary);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.specimen-lens:hover {
  border-color: var(--clr-accent-primary);
  box-shadow: var(--shadow-lg), 0 0 14px rgba(184, 84, 26, 0.15);
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

.lens-click-hint {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-family-mono);
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  color: var(--clr-accent-primary);
  background-color: var(--clr-bg-primary);
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid var(--clr-border);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}

.specimen-lens:hover .lens-click-hint {
  opacity: 0.95;
  transform: translateX(-50%) translateY(-2px);
}

/* Specimen Transition Animations */
.specimen-fade-enter-active,
.specimen-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.specimen-fade-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.specimen-fade-leave-to {
  opacity: 0;
  transform: scale(1.08);
}

@media (max-width: 768px) {
  .scrollable-text-container {
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-md) var(--spacing-md);
  }

  .specimen-interactive-group {
    width: 104px;
    height: 104px;
    shape-outside: circle(52px at 50% 50%);
    shape-margin: 14px;
    margin-right: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .specimen-lens {
    width: 100px;
    height: 100px;
  }
}
</style>
