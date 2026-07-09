<script setup lang="ts">
const props = defineProps<{
  rotation?: number
}>()
</script>

<template>
  <div class="pattern-background" aria-hidden="true">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      class="field-notes-svg"
    >
      <defs>
        <!-- Minor Grid (20x20) -->
        <pattern
          id="smallGrid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            class="topo-grid-minor"
          />
        </pattern>
        <!-- Major Index Grid (100x100) with corner registration marks -->
        <pattern
          id="majorGrid"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            class="topo-grid-major"
          />
          <!-- Registration Crosshair at intersections -->
          <path
            d="M -3 0 L 3 0 M 0 -3 L 0 3"
            fill="none"
            class="topo-grid-mark"
          />
        </pattern>
      </defs>

      <!-- Full Infinite Background Grid -->
      <rect width="100%" height="100%" fill="url(#majorGrid)" />

      <!-- Topographic Organic Elevation Contours -->
      <g class="topo-contours">
        <path
          d="M -50 180 Q 250 120, 500 240 T 1050 160"
          fill="none"
          class="topo-contour-line"
        />
        <path
          d="M -50 220 Q 220 160, 480 280 T 1050 200"
          fill="none"
          class="topo-contour-line"
        />
        <path
          d="M -50 580 Q 300 660, 600 520 T 1050 640"
          fill="none"
          class="topo-contour-line"
        />
        <path
          d="M -50 620 Q 320 700, 620 560 T 1050 680"
          fill="none"
          class="topo-contour-line"
        />
      </g>

      <!-- ========================================== -->
      <!-- TOP-LEFT: POINT-SET TOPOLOGY AXIOMS        -->
      <!-- ========================================== -->
      <g transform="translate(45, 45)">
        <!-- Field Note Header Box -->
        <line x1="0" y1="0" x2="330" y2="0" class="topo-accent-line" stroke-dasharray="4,4" />
        <path d="M 0 -4 L 0 4 M 330 -4 L 330 4" class="topo-accent-line" />
        <text x="0" y="-8" class="topo-caption topo-accent-text">
          CATALOGUE NO. 805 // TOPOLOGICAL SPACE AXIOMS
        </text>
        <text x="0" y="22" class="topo-text-main topo-bold">
          TOPOLOGICAL SPACE (X, τ)   WHERE τ ⊆ 𝒫(X)
        </text>
        <text x="0" y="44" class="topo-text-code">
          [1] ∅, X ∈ τ
        </text>
        <text x="0" y="64" class="topo-text-code">
          [2] ∀ {U_α}_{α∈I} ⊆ τ  ⟹  ⋃_{α∈I} U_α ∈ τ
        </text>
        <text x="0" y="84" class="topo-text-code">
          [3] U₁, ..., U_n ∈ τ   ⟹  ⋂_{i=1}^n U_i ∈ τ
        </text>
      </g>

      <!-- ========================================== -->
      <!-- CENTER-LEFT: HOMOTOPY & FUNDAMENTAL GROUP  -->
      <!-- ========================================== -->
      <g transform="translate(45, 235)">
        <!-- Open Neighborhood Cover & Homotopy Loops Diagram -->
        <g transform="translate(115, 65)">
          <!-- Open neighborhood U_alpha -->
          <ellipse cx="-40" cy="0" rx="65" ry="45" fill="none" class="topo-diagram-set" stroke-dasharray="3,3" />
          <text x="-95" y="-30" class="topo-caption">U_α</text>
          <!-- Open neighborhood U_beta -->
          <ellipse cx="40" cy="0" rx="65" ry="45" fill="none" class="topo-diagram-set" stroke-dasharray="3,3" />
          <text x="75" y="-30" class="topo-caption">U_β</text>
          <!-- Basepoint x0 -->
          <circle cx="0" cy="22" r="3" class="topo-dot" />
          <text x="-8" y="36" class="topo-caption">x₀</text>
          <!-- Homotopy loop gamma_0 -->
          <path d="M 0 22 C -60 -40, -10 -55, 0 -25 C 10 -55, 60 -40, 0 22" fill="none" class="topo-diagram-path" />
          <text x="-35" y="-18" class="topo-caption">γ₀</text>
          <!-- Homotopy loop gamma_1 -->
          <path d="M 0 22 C -35 -15, -5 -25, 0 -8 C 5 -25, 35 -15, 0 22" fill="none" class="topo-diagram-path" stroke-dasharray="2,2" />
          <text x="18" y="-5" class="topo-caption">γ₁</text>
        </g>

        <!-- Homotopy Formulas -->
        <text x="0" y="145" class="topo-text-main topo-bold">
          FUNDAMENTAL GROUP: π₁(X, x₀)
        </text>
        <text x="0" y="165" class="topo-text-code">
          π₁(X, x₀) = { [γ] : γ(0) = γ(1) = x₀ } / ≃
        </text>
        <text x="0" y="185" class="topo-text-code">
          • π₁(S¹) ≅ ℤ       • π₁(T²) ≅ ℤ × ℤ
        </text>
        <text x="0" y="205" class="topo-text-code">
          • π₁(Sⁿ) ≅ 0  (n ≥ 2, simply connected)
        </text>
      </g>

      <!-- ========================================== -->
      <!-- CENTER INTERACTIVE GRAPHIC: TORUS POLYGON   -->
      <!-- ========================================== -->
      <g class="rotating-group" :style="{ transform: `rotate(${props.rotation || 0}deg)` }">
        <!-- Outer Compass / Topological Framing Ring -->
        <circle cx="520" cy="360" r="165" fill="none" class="topo-compass-ring" stroke-dasharray="3,3" />
        <circle cx="520" cy="360" r="125" fill="none" class="topo-compass-ring" stroke-dasharray="1,5" />
        
        <!-- Crosshair Axes -->
        <line x1="335" y1="360" x2="705" y2="360" class="topo-axis" />
        <line x1="520" y1="175" x2="520" y2="545" class="topo-axis" />

        <!-- Framing / Quotient Reference Squares -->
        <rect x="445" y="285" width="150" height="150" fill="none" class="topo-polygon-rect" />
        
        <!-- Gluing Orientation Arrows on Polygon Edges -->
        <!-- Top Edge (a -> right) -->
        <path d="M 512 285 L 525 285 M 520 281 L 525 285 L 520 289" fill="none" class="topo-arrow" />
        <text x="515" y="275" class="topo-caption topo-bold">a</text>
        <!-- Bottom Edge (a -> right) -->
        <path d="M 512 435 L 525 435 M 520 431 L 525 435 L 520 439" fill="none" class="topo-arrow" />
        <text x="515" y="452" class="topo-caption topo-bold">a</text>
        <!-- Left Edge (b -> up) -->
        <path d="M 445 368 L 445 352 M 441 358 L 445 352 L 449 358 M 441 364 L 445 358 L 449 364" fill="none" class="topo-arrow" />
        <text x="428" y="363" class="topo-caption topo-bold">b</text>
        <!-- Right Edge (b -> up) -->
        <path d="M 595 368 L 595 352 M 591 358 L 595 352 L 599 358 M 591 364 L 595 358 L 599 364" fill="none" class="topo-arrow" />
        <text x="606" y="363" class="topo-caption topo-bold">b</text>

        <!-- Quotient Identification Vertices (all 4 identify to single vertex v_0) -->
        <circle cx="445" cy="285" r="3.5" class="topo-dot-accent" />
        <circle cx="595" cy="285" r="3.5" class="topo-dot-accent" />
        <circle cx="595" cy="435" r="3.5" class="topo-dot-accent" />
        <circle cx="445" cy="435" r="3.5" class="topo-dot-accent" />

        <!-- Center Quotient Map Label -->
        <text x="520" y="355" text-anchor="middle" class="topo-caption topo-accent-text">
          QUOTIENT MAP
        </text>
        <text x="520" y="372" text-anchor="middle" class="topo-text-code topo-bold">
          I² / ∼  ──►  T²
        </text>
        <text x="520" y="388" text-anchor="middle" class="topo-caption">
          word: a b a⁻¹ b⁻¹
        </text>
      </g>

      <!-- ========================================== -->
      <!-- BOTTOM-RIGHT: SURFACE CLASSIFICATION TABLE -->
      <!-- ========================================== -->
      <g transform="translate(540, 505)">
        <text x="0" y="0" class="topo-text-main topo-bold">
          SURFACE CLASSIFICATION &amp; EULER CHARACTERISTIC
        </text>
        <text x="0" y="20" class="topo-text-code topo-accent-text">
          EULER-POINCARÉ FORMULA: χ(M_g) = V - E + F = 2 - 2g
        </text>
        
        <!-- Table Header & Divider -->
        <line x1="0" y1="32" x2="415" y2="32" class="topo-table-border" />
        <text x="0" y="48" class="topo-table-header">MANIFOLD SURFACE</text>
        <text x="175" y="48" class="topo-table-header">GENUS (g)</text>
        <text x="260" y="48" class="topo-table-header">EULER (χ)</text>
        <text x="340" y="48" class="topo-table-header">ORIENT.</text>
        <line x1="0" y1="56" x2="415" y2="56" class="topo-table-border" />

        <!-- Row 1: 2-Sphere -->
        <text x="0" y="76" class="topo-text-code">Sphere (S²)</text>
        <text x="195" y="76" class="topo-text-code">0</text>
        <text x="278" y="76" class="topo-text-code">2</text>
        <text x="355" y="76" class="topo-text-code">YES</text>

        <!-- Row 2: Torus -->
        <text x="0" y="98" class="topo-text-code">Torus (T² = S¹ × S¹)</text>
        <text x="195" y="98" class="topo-text-code">1</text>
        <text x="278" y="98" class="topo-text-code">0</text>
        <text x="355" y="98" class="topo-text-code">YES</text>

        <!-- Row 3: Double Torus -->
        <text x="0" y="120" class="topo-text-code">Double Torus (M₂)</text>
        <text x="195" y="120" class="topo-text-code">2</text>
        <text x="274" y="120" class="topo-text-code">-2</text>
        <text x="355" y="120" class="topo-text-code">YES</text>

        <!-- Row 4: Klein Bottle -->
        <text x="0" y="142" class="topo-text-code">Klein Bottle (K)</text>
        <text x="195" y="142" class="topo-text-code">1</text>
        <text x="278" y="142" class="topo-text-code">0</text>
        <text x="358" y="142" class="topo-text-code">NO</text>

        <!-- Row 5: Real Projective Plane -->
        <text x="0" y="164" class="topo-text-code">Projective Plane (ℝP²)</text>
        <text x="195" y="164" class="topo-text-code">1</text>
        <text x="278" y="164" class="topo-text-code">1</text>
        <text x="358" y="164" class="topo-text-code">NO</text>

        <line x1="0" y1="176" x2="415" y2="176" class="topo-table-border" stroke-dasharray="2,2" />
      </g>

      <!-- ========================================== -->
      <!-- BOTTOM-LEFT: HOMEOMORPHISM & BETTI NUMBERS -->
      <!-- ========================================== -->
      <g transform="translate(45, 680)">
        <text x="0" y="0" class="topo-text-main topo-bold">
          HOMEOMORPHISM EQUIVALENCE: f: X ≅ Y
        </text>
        <text x="0" y="20" class="topo-text-code">
          f: X → Y continuous bijection with continuous inverse f⁻¹
        </text>
        <text x="0" y="42" class="topo-text-code">
          BETTI NUMBERS: bₖ = dim Hₖ(X, ℚ)   |   χ(X) = Σ (-1)ᵏ bₖ
        </text>
        <text x="0" y="62" class="topo-caption">
          TOPOLOGICAL INVARIANTS: χ(X), π₁(X), and Hₖ(X) invariant under ≅
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pattern-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.field-notes-svg {
  width: 100%;
  height: 100%;
}

.rotating-group {
  transform-origin: 520px 360px;
  transition: transform 0.15s ease-out;
}

/* Grid Lines */
.topo-grid-minor {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.45;
  opacity: 0.35;
}

.topo-grid-major {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.85;
  opacity: 0.55;
}

.topo-grid-mark {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 1;
  opacity: 0.7;
}

/* Topographic Contour Curves */
.topo-contour-line {
  stroke: var(--clr-text-secondary, #5c6a7d);
  stroke-width: 0.9;
  opacity: 0.16;
  stroke-dasharray: 8, 12;
}

/* Accent Lines & Dots */
.topo-accent-line {
  stroke: var(--clr-accent-primary, #b8541a);
  stroke-width: 1.2;
  opacity: 0.85;
}

.topo-accent-text {
  fill: var(--clr-accent-primary, #b8541a);
}

.topo-dot {
  fill: var(--clr-text-primary, #2c3e50);
}

.topo-dot-accent {
  fill: var(--clr-accent-primary, #b8541a);
}

/* Typography Styles */
.topo-text-main {
  font-family: var(--font-family-mono, monospace);
  font-size: 11.5px;
  fill: var(--clr-text-primary, #2c3e50);
  letter-spacing: 0.04em;
}

.topo-text-code {
  font-family: var(--font-family-mono, monospace);
  font-size: 11px;
  fill: var(--clr-text-secondary, #5c6a7d);
  letter-spacing: 0.02em;
}

.topo-caption {
  font-family: var(--font-family-mono, monospace);
  font-size: 9.5px;
  fill: var(--clr-text-secondary, #5c6a7d);
  letter-spacing: 0.05em;
}

.topo-bold {
  font-weight: 700;
}

/* Diagrams & Tables */
.topo-diagram-set {
  stroke: var(--clr-text-secondary, #5c6a7d);
  stroke-width: 1;
  opacity: 0.6;
}

.topo-diagram-path {
  stroke: var(--clr-text-primary, #2c3e50);
  stroke-width: 1.4;
  opacity: 0.85;
}

.topo-compass-ring {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.9;
  opacity: 0.45;
}

.topo-axis {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.6;
  stroke-dasharray: 4, 6;
  opacity: 0.35;
}

.topo-polygon-rect {
  stroke: var(--clr-text-primary, #2c3e50);
  stroke-width: 1.5;
}

.topo-arrow {
  stroke: var(--clr-text-primary, #2c3e50);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.topo-table-border {
  stroke: var(--clr-border, #c0c0b2);
  stroke-width: 0.9;
  opacity: 0.65;
}

.topo-table-header {
  font-family: var(--font-family-mono, monospace);
  font-size: 9.5px;
  font-weight: 700;
  fill: var(--clr-text-primary, #2c3e50);
  letter-spacing: 0.06em;
}
</style>
