<script setup lang="ts">
import { onMounted } from 'vue';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Luka's Field Guide` : "Luka's Field Guide - Design & Development Portfolio"
  }
})

onMounted(() => {
  const getTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  setTheme(getTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setTheme(e.matches ? 'dark' : 'light');
  });
});
</script>

<template>
  <div>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>