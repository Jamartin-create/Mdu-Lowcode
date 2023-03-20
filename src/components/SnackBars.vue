<template>
  <v-snackbar location="top" v-model="snackVis">
    {{ snackText }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="sysPinia.snackClose()">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { SysStore } from "../store/modules/sys";
import { watch } from "vue";
import { ref } from "vue";

const sysPinia = SysStore();

const snackVis = ref<boolean>(false);
const snackText = ref<string>("");

watch(
  () => sysPinia.snackVis,
  (cur, prev) => {
    snackVis.value = cur as boolean;
    snackText.value = sysPinia.snackText as string;
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
