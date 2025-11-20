<script setup>


</script>

<template>
    <!-- <Fractal /> -->
     <ClientOnly
      fallback-tag="span"
      fallback="Loading comments..."
    >
    <Observable />
    </ClientOnly>
</template>