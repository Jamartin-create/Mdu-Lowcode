<template>
  <v-app class="container">
    <div class="item-wrapper">
      <v-card v-for="item in itemList" :key="item.itemId">
        <div
          class="align-end"
          :class="{
            'item-bg': true,
            pub: item.itemPublic,
          }"
          cover
        >
          <v-card-title>{{ item.itemTitle }}</v-card-title>
        </div>
        <v-card-subtitle>
          {{ item.itemDescription || "暂无描述" }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn variant="tonal" size="small" @click="choseItem(item.itemId)">
            预览
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ItemApi from "../../api/item";
import { SysStore } from "../../store/modules/sys";
import { ref, onMounted } from "vue";
const router = useRouter();

function choseItem(itemId: string) {
  window.open(router.resolve({ path: "/preview", query: { itemId } }).href);
}

const itemList = ref<any[]>([]);
async function getPublishPage() {
  try {
    const { code, msg, data } = await ItemApi.getPubItem();
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    itemList.value = data;
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getPublishPage();
});
</script>

<style scoped lang="scss">
.item-wrapper {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
}
</style>
