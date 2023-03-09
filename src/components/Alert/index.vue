<template>
  <Teleport to="body">
    <v-alert
      :color="props.type"
      :icon="`$${props.type}`"
      :type="props.type"
      :title="props.title"
      :text="props.text"
    ></v-alert>
  </Teleport>
</template>

<script setup lang="ts">
type Props = {
  type: "info" | "error" | "success" | "warning" | undefined;
  title: string;
  text: string;
  closeable: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  type: "info",
  title: "信息",
  text: "一条信息",
  closeable: true,
});
</script>

<style scoped></style>
