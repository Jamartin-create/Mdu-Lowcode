<template>
  <v-app class="container">
    <v-tabs v-model="tab" color="deep-grey-accent-4" align-tabs="start">
      <v-tab value="comp">物料</v-tab>
      <v-tab value="dict">配置项字典</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="comp">物料</v-window-item>
      <v-window-item value="dict">
        <DictTable />
      </v-window-item>
    </v-window>
  </v-app>
</template>

<script setup lang="ts">
import DictTable from "./components/DictTable.vue";
import { ref } from "vue";

const tab = ref<string>("comp");
</script>

<style scoped></style>
