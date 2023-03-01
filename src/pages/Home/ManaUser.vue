<template>
  <v-app class="container">
    <div class="item-wrapper">
      <v-card>
        <v-card-title>ITEM</v-card-title>
        <v-card-subtitle> 暂时没有更多了 </v-card-subtitle>
        <v-card-actions>
          <v-btn variant="text" @click="toEditor"> 新增 </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
type RouterParams = {
  path?: string;
  name?: string;
  params?: any;
  query?: any;
};
const router = useRouter();
const itemList = reactive<any[]>([]);
function getList() {
  //一些处理
}
function toEditor(param: any) {
  const params: RouterParams = {
    name: "editor",
  };
  if (param != null) params.params = param;
  router.push(params);
}
</script>

<style scoped lang="scss">
.item-wrapper {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
}
</style>
