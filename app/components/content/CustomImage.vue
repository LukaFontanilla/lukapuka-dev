<script setup lang="ts">
import ProseImg from './ProseImg.vue'

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  title: { type: String, default: undefined },
  caption: { type: String, default: undefined }
})
</script>

<template>
  <ProseImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :title="title"
    :caption="caption"
  >
    <slot />
  </ProseImg>
</template>
