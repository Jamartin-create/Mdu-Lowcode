<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle> {{ description || "暂无描述" }} </v-card-subtitle>
    <v-card-actions>
      <v-btn variant="text" @click="choseItem">
        {{ itemId != null ? "编辑" : "新增" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ItemStore } from "../../../store/modules/item";

const itemPinia = ItemStore();

type Props = {
  itemId?: string;
  title?: string;
  description?: string;
};
const { itemId, title, description } = defineProps<Props>();
const emits = defineEmits(["toEditor"]);

async function choseItem() {
  await itemPinia.choseOneItem(itemId!);
  emits("toEditor");
}
</script>

<style scoped></style>
