<template>
  <v-container>
    <v-row>
      <v-col>
        <v-json-edit
          class="json-edit"
          title="静态数据"
          height="150"
          :mainMenuBar="false"
          :statusBar="false"
          :navigationBar="false"
          mode="text"
          v-bind="$attrs"
        />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import VJsonEdit from "vue3-ts-jsoneditor";
</script>

<style scoped lang="scss">
:deep(.json-edit) {
  .cm-gutters {
    display: none;
  }
}
</style>
