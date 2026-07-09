<script setup lang="ts">
import CustomVideo from './CustomVideo.vue'

defineProps({
  youtubeId: { type: String, default: '' },
  src: { type: String, default: '' },
  title: { type: String, default: 'Acoustic Player' },
  channel: { type: String, default: '' }
})
</script>

<template>
  <CustomVideo
    :youtube-id="youtubeId"
    :src="src"
    :title="title"
    :channel="channel"
  />
</template>
