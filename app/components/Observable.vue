<!-- <script setup>
import { ref, onMounted } from 'vue'
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.17/+esm";
const chart = ref()
const survey = [
    {question: "don’t go out after dark", yes: 96},
    {question: "do no activities other than school", yes: 89},
    {question: "engage in political discussion and social movements, including online", yes: 10},
    {question: "would like to do activities but are prevented by safety concerns", yes: 73}
]

// const plot = Plot.plot({
//   axis: null,
//   label: null,
//   height: 260,
//   marginTop: 20,
//   marginBottom: 70,
//   title: "Subdued (Blue Version)", // Updated title for clarity
//   subtitle: "Of 120 surveyed Syrian teenagers:",
//   marks: [
//     Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20}),
//     // Changed fillOpacity from 0.4 to 0.2 for the background waffle
//     Plot.waffleY({length: 1}, {y: 120, fillOpacity: 0.8, rx: "100%"}),
//     // Changed fill from "orange" to "blue" for the data waffle
//     Plot.waffleY(survey, {fx: "question", y: "yes", rx: "100%", fill: "blue"}),
//     // Changed fill from "orange" to "blue" for the percentage text
//     Plot.text(survey, {fx: "question", text: (d) => (d.yes / 120).toLocaleString("en-US", {style: "percent"}), frameAnchor: "bottom", lineAnchor: "top", dy: 6, fill: "blue", fontSize: 24, fontWeight: "bold"})
//   ]
// })

onMounted(() => {
  // chart.value.append(plot)
})
</script>

<template>
  <div class="circle" ref="chart">
    <svg view-box="0 0 100 100">
        <polygon style="stroke-dashoffset: 19176;"
        points="56 255 140 85 224 255"></polygon>
    </svg>
  </div>
</template>

<style lang="css" scoped>
@keyframes casinoLights {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset:26;
  }
}

.circle {
  > svg {
    polygon {
      fill: none;
      stroke: blue;
      width: 140px;
      height: auto;
      stroke-width: 10px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 0px,26px;
      stroke-dashoffset: 22593.8;
      animation:
        casinoLights 400ms linear infinite;
    }
    >* path {
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: 1.2s ease-in-out;
      stroke: black;
    }

    :nth-child(1) {
      d: path("M100, 50 Q95, 95 50,100");
    }

    :nth-child(4) {
        stroke: var(--purple);
        d: path("M0, 50 Q5, 5 50, 0");
    }

    >* circle {
        stroke: blue;
        stroke-width: 2rem;
        width: 100px;
        height: 100px;
        r: 90;
        fill: none;
        --circumference: 572px;
        animation:
          grow 1200ms infinite alternate,
          spin 2400ms infinite alternate;
    }
  }
}

svg:hover :nth-child(4) {
        stroke: blue;
        d: path("M5,2 Q 2,5 5,8")
    }

@keyframes grow {
  from {
    stroke-dasharray:
      calc(var(--circumference) * 0.05),
      var(--circumference);
  }
  to {
    stroke-dasharray:
      calc(var(--circumference) * 0.25),
      var(--circumference);
  }
}
 
@keyframes spin {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset:
      calc(var(--circumference) * -0.65);
  }
}

</style> -->

<script setup>
import { ref } from 'vue'

// Reactive state
const numPetals = ref(8);
const centerRadius = ref(30);
const gap = ref(10);

// Constants for SVG setup
const viewBoxSize = 500;
const center = viewBoxSize / 2;
const petalPath = "M-35 0 C-5 5 5 25 35 0 50 25 25 75 0 100 C25 315 -50 25 -35 0 M315 5 Q0 0 -180 -30" ;//"M-35 0 C-25 25 25 25 35 0 50 25 25 75 0 100 C-25 75 -50 25 -35 0";
</script>

<template>
    <div class="svg-container">
      <svg 
        :width="viewBoxSize" 
        :height="viewBoxSize" 
        :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        class="flower-svg"
      >
        <defs>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" class="center-gradient-start" />
            <stop offset="100%" class="center-gradient-end" />
          </radialGradient>
          <linearGradient id="petalGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" class="petal-gradient-start" />
            <stop offset="100%" class="petal-gradient-end" />
          </linearGradient>
        </defs>

        <g :transform="`translate(${center}, ${center})`">
          <path
            v-for="(n, index) in numPetals"
            :key="index"
            :d="petalPath"
            :transform="`rotate(${(360 / numPetals) * index}) translate(0, ${centerRadius + gap}) scale(0.4)`"
            class="petal"
          />
          <circle
            cx="0"
            cy="0"
            :r="centerRadius"
            class="flower-ring"
          />
          <circle
            cx="0"
            cy="0"
            :r="centerRadius - 20"
            class="flower-ring"
          />
          <circle
            cx="0"
            cy="0"
            :r="centerRadius - 15"
            class="flower-ring"
          />
          <circle
            cx="0"
            cy="0"
            :r="centerRadius - 10"
            class="flower-ring"
          />
          <circle
            cx="0"
            cy="0"
            :r="centerRadius - 5"
            class="flower-center-filled"
          />
        </g>
      </svg>
    </div>
</template>

<style scoped>

/* SVG Container Styles */
.svg-container {

}

.flower-svg {
  max-width: 100%;
  height: auto;
  display: block;
}

.center-gradient-start {
  stop-color: var(--clr-accent-warning);
}

.center-gradient-end {
  stop-color: var(--clr-accent-primary);
}

.petal-gradient-start {
  stop-color: var(--clr-accent-danger);
  stop-opacity: 0.7;
}

.petal-gradient-end {
  stop-color: var(--clr-accent-danger);
}

.petal {
  fill: url(#petalGradient);
  stroke: var(--clr-accent-danger);
  stroke-width: 2;
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
}

.petal:hover {
  opacity: 1;
}

.flower-ring {
  fill: none;
  stroke: var(--clr-border);
  stroke-width: 1;
}

.flower-center-filled {
  fill: url(#centerGradient);
  stroke: var(--clr-accent-warning);
  stroke-width: 1;
}
</style>