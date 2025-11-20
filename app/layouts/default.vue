<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const wrapperEl = ref(null)

onMounted(() => {
    setTimeout(() => {
        wrapperEl.value.style.borderRadius = "1.2rem";
        // wrapperEl.value.style.height = "90vh";
        // wrapperEl.value.style.width = "80vw";
    }, 2000);
})
</script>

<template>
  <div>
    <div class="dot-mask dot-mask-background"></div>
    <div class="page-wrapper">
      <div class="nav-wrapper">
          <div class="intro-card intro-card--circle"></div>
          <div class="intro-card--pl intro-card column center intro-card--pl">
              <NuxtLink class="nav-link" activeClass="nav-link--active" to="/">Home</NuxtLink>
              <NuxtLink class="nav-link" activeClass="nav-link--active" to="/about">About</NuxtLink>
              <NuxtLink class="nav-link" activeClass="nav-link--active" to="/writings">Writing</NuxtLink>
              <NuxtLink class="nav-link" activeClass="nav-link--active" to="/hh">Readings</NuxtLink>
          </div>
          <div class="intro-card intro-card--circle"></div>
      </div>
      <div ref="wrapperEl" class="content-wrapper">
        <div class="left-column">
          <AppIntro />
        </div>
        <div class="right-column">
          <!-- Infographic designs will go here -->
           <div class="infographic-container">
              <slot />
           </div>
        </div>
      </div>
    </div>
  </div>
</template>