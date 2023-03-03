<template>
  <v-dialog v-model="visible" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5"> {{}} </v-card-title>
      <v-card-text>{{}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="close">
          取消
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="close">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps();
const visible = ref<boolean>(false);
function close() {
  visible.value = false;
}
function open() {
  visible.value = true;
}
defineExpose({
  open,
});
</script>

<style scoped></style>
