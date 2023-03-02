import draggable from 'vuedraggable';
<script setup lang="ts">
const props = defineProps<{
  name: string;
  isSeparate: boolean;
  separateDirection: "row" | "column";
}>();
</script>
<template></template>
<style scoped></style>
