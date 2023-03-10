<template>
  <v-dialog v-model="vis" width="300">
    <v-card>
      <v-container>
        <v-text-field
          v-model="form.itemTitle"
          :rules="rule.itemTitle"
          label="项目名称"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.itemDescription"
          label="项目描述"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="vis = false">关闭</v-btn>
        <v-btn @click="saveItem">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ItemType } from "../../../api/item";

const emtis = defineEmits(["save"]);

const vis = ref<boolean>(false);
const form = reactive<Partial<ItemType>>({
  itemTitle: "",
  itemDescription: "",
});

const rule = {
  itemTitle: [(v: string) => !!v || "请输入项目名称"],
};

function saveItem() {
  vis.value = false;
  emtis("save", form);
}
defineExpose({
  open: () => (vis.value = true),
});
</script>

<style scoped></style>
