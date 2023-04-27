<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Panel from "./Panel.vue";
import LeftSideBar from "./LeftSideBar.vue";
import RightSiderBar from "./RightSiderBar.vue";
import DiaSaveItem from "./components/DiaSaveItem.vue";
import { ItemType } from "../../api/item";
import { ItemStore } from "../../store/modules/item";
import ItemApi from "../../api/item";

const router = useRouter();
const itemPinia = ItemStore();

const DiaOnSave = ref<InstanceType<typeof DiaSaveItem>>();
const panel = ref<InstanceType<typeof Panel>>();

//左右Sider开合
const LeftSider = ref<InstanceType<typeof LeftSideBar>>();
const RightSider = ref<InstanceType<typeof RightSiderBar>>();
const flag = ref<boolean>(true);
function siderCtl() {
  if (flag.value) {
    LeftSider.value?.close();
    RightSider.value?.close();
  } else {
    LeftSider.value?.open();
    RightSider.value?.open();
  }
  flag.value = !flag.value;
}

//选中组件事件监听
function onSelect(el: any) {
  RightSider.value?.catchCom(el);
}

//保存项目
async function saveItem(params: ItemType) {
  itemPinia.saveCurItem(params);
}

//返回主页
function backHome() {
  router.push({ name: "home" });
  itemPinia.reset();
}

//发布/私有项目
async function publishItem() {
  try {
    if (itemPinia.curItem?.itemPublic) {
      await ItemApi.lockItem(itemPinia.curItem.itemId as string);
      return;
    }
    await ItemApi.unLockItem(itemPinia.curItem!.itemId as string);
  } catch (e) {
    console.error(e);
  } finally {
    await itemPinia.choseOneItem(itemPinia.curItem!.itemId as string);
  }
}
</script>

<template>
  <v-app color="primary">
    <v-app-bar :elevation="1" title="Martin-Lowcode">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="siderCtl"
        ></v-app-bar-nav-icon>
      </template>

      <v-btn
        size="small"
        variant="elevated"
        class="ma-2"
        color="orange-darken-2"
        @click="publishItem"
        v-if="itemPinia.curItem"
      >
        <v-icon
          start
          :icon="
            itemPinia.curItem?.itemPublic
              ? 'mdi-lock-outline'
              : 'mdi-lock-open-variant-outline'
          "
        ></v-icon>
        {{ itemPinia.curItem?.itemPublic ? "私有" : "公开" }}
      </v-btn>
      <v-btn
        icon="mdi-content-save-outline"
        variant="text"
        @click="DiaOnSave?.open()"
      ></v-btn>
      <v-btn variant="text" icon="mdi-close" @click="backHome"></v-btn>
    </v-app-bar>
    <LeftSideBar ref="LeftSider" />
    <RightSiderBar ref="RightSider" />
    <v-main>
      <div class="wrapper">
        <Panel ref="panel" @select="onSelect" />
      </div>
    </v-main>
    <DiaSaveItem ref="DiaOnSave" @save="saveItem" />
  </v-app>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  padding: 15px;
  background-color: #f4f4f4;
}
:deep(.wrapper) {
  .v-application__wrap {
    min-height: 100%;
    padding: 25px;
  }
}
</style>
