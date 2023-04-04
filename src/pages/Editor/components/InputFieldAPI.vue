<template>
  <v-container>
    <v-select
      :items="dictEntryList"
      variant="underlined"
      :item-title="'sgeName'"
      :item-value="'sgeValue'"
      label="请选择数据展示模式"
      density="comfortable"
    ></v-select>
  </v-container>
</template>

<script setup lang="ts">
import { useDict } from "../../../hooks/useDict";

const props = defineProps<{
  dsId: string;
}>();

const { dictEntryList, getDictEntryByCode } = useDict();
getDictEntryByCode("DATA_SOURCE_FROM_TYPE");
</script>

<style scoped></style>
