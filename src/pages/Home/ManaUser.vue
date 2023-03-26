<template>
  <v-app class="container">
    <div class="item-wrapper">
      <ItemCard
        v-for="item in itemList"
        :key="item.itemId"
        :title="item.itemTitle"
        :description="item.itemDscription"
        :item-id="item.itemId"
        @to-editor="toEditor"
      />
      <v-card>
        <v-card-title>ITEM</v-card-title>
        <v-card-subtitle> 暂时没有更多了 </v-card-subtitle>
        <v-card-actions>
          <v-btn variant="text" @click="toEditor()"> 新增 </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import ItemApi from "../../api/item";
import ItemCard from "./components/ItemCard.vue";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SysStore } from "../../store/modules/sys";
type RouterParams = {
  path?: string;
  name?: string;
  params?: any;
  query?: any;
};
const router = useRouter();
const itemList = reactive<any[]>([]);
async function getList() {
  try {
    const { data, code, msg } = await ItemApi.getAllItem();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    Array.prototype.push.apply(itemList, data);
  } catch (e) {
    console.error(e);
  }
}

function toEditor() {
  router.push({ name: "editor" });
}

onMounted(() => {
  getList();
});
</script>

<style scoped lang="scss">
.item-wrapper {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
}
</style>
