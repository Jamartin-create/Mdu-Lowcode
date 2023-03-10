<template>
  <v-dialog v-model="visible" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5"> {{ title }} </v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancel"> 取消 </v-btn>
        <v-btn variant="text" @click="confirm"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const visible = ref<boolean>(false);
const { title, content } = defineProps<{
  title: string;
  content: string;
}>();
const open = () => (visible.value = true);
const close = () => (visible.value = false);

function confirm() {
  console.log("ddd");
  emits("confirm");
  close();
}

function cancel() {
  emits("cancel");
  close();
}

const emits = defineEmits(["confirm", "cancel"]);
defineExpose({
  open,
});
</script>

<style scoped></style>
