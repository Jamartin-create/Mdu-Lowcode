<template>
  <v-app class="container">
    <div class="item-wrapper">
      <ItemCard
        v-for="item in itemList"
        :key="item.itemId"
        :title="item.itemTitle"
        :description="item.itemDscription"
        :item-id="item.itemId"
      />
      <v-card>
        <v-card-title>ITEM</v-card-title>
        <v-card-subtitle> 暂时没有更多了 </v-card-subtitle>
        <v-card-actions>
          <v-btn variant="text" @click="toEditor(null)"> 新增 </v-btn>
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
    if (code == 0) {
      Array.prototype.push.apply(itemList, data);
      return;
    }
    console.error(msg);
  } catch (e) {
    console.error(e);
  }
}

function toEditor(param: any) {
  const params: RouterParams = {
    name: "editor",
  };
  if (param != null) params.params = param;
  console.log(params);
  router.push(params);
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
