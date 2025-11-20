<script setup lang="ts">
const props = defineProps({ transition: { type: String } })
</script>

<template>
    <h1 class="animate-title" :style="{ 'view-transition-name': props.transition }">
        <slot mdc-unwrap="p" />
    </h1>
</template>