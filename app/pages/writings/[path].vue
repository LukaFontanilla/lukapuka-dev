<script setup lang="ts">
const slug = useRoute().path
const { data } = await useAsyncData(() => queryCollection('content').path(slug).first())

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description
})

</script>


<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>Home not found</div>
</template>