<script setup lang="ts">
import { computed } from 'vue'
import { useSpiralState } from '~/composables/useSpiralState'

const { activeSpecimenIndex } = useSpiralState()

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

const activeSpecimen = computed(() => specimens[activeSpecimenIndex.value % specimens.length])

const nextSpecimen = () => {
  activeSpecimenIndex.value = (activeSpecimenIndex.value + 1) % specimens.length
}
</script>

<template>
  <div class="specimen-lens-wrapper">
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
</template>

<style scoped>
.specimen-lens-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.specimen-lens {
  position: relative;
  width: 104px;
  height: 104px;
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
  box-shadow: var(--shadow-lg), 0 0 14px rgba(184, 84, 26, 0.18);
  transform: scale(1.02);
}

.specimen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-family-mono);
  font-size: 0.52rem;
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
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.specimen-fade-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.specimen-fade-leave-to {
  opacity: 0;
  transform: scale(1.06);
}

@media (max-width: 640px) {
  .specimen-lens {
    width: 84px;
    height: 84px;
  }
}
</style>
