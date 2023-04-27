<template>
  <v-card>
    <div
      class="align-end"
      :class="{
        'item-bg': true,
        pub: options.itemPublic,
      }"
      cover
    >
      <v-card-title>{{ options.itemTitle }}</v-card-title>
    </div>
    <v-card-subtitle>
      {{ options.itemDescription || "暂无描述" }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn variant="tonal" size="small" @click="choseItem">
        {{ options.itemId != null ? "编辑" : "新增" }}
      </v-btn>
      <DeleteConfirm @confirm="delItem" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import DeleteConfirm from "../../../components/DialogComponents/DeleteConfirm.vue";
import { ItemStore } from "../../../store/modules/item";
import ItemApi from "../../../api/item";
import { SysStore } from "../../../store/modules/sys";

const itemPinia = ItemStore();

type Props = {
  options: any;
};
const { options } = defineProps<Props>();
console.log(options);
const emits = defineEmits(["toEditor", "on-del"]);

async function choseItem() {
  await itemPinia.choseOneItem(options.itemId!);
  emits("toEditor");
}

async function delItem() {
  try {
    const { code, msg } = await ItemApi.delItem(options.itemId);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    emits("on-del");
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped lang="scss">
.item-bg {
  position: relative;
  &::after {
    content: "未发布";
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #b2b2b2;
    font-size: 22px;
  }
}
.item-bg.pub {
  &::after {
    content: "已发布";
  }
}
</style>
