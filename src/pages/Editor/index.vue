<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import Panel from "./Panel.vue";
import LeftSideBar from "./LeftSideBar.vue";
import RightSiderBar from "./RightSiderBar.vue";
import DiaSaveItem from "./components/DiaSaveItem.vue";
import { ItemType } from "../../api/item";
import { ItemStore } from "../../store/modules/item";
import ItemApi from "../../api/item";
import { downloadJson } from "../../utils/common";
import { SysStore } from "../../store/modules/sys";
import FileUpload from "./components/FileUpload.vue";

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
//编辑项目
async function editItem(params: ItemType) {
  try {
    const { code, msg } = await ItemApi.editItem(params);
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    SysStore().snackOpen("编辑成功");
  } catch (e) {
    console.error(e);
  }
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
      const { code, msg } = await ItemApi.lockItem(
        itemPinia.curItem.itemId as string
      );
      if (code != 0) {
        SysStore().snackOpen(msg);
        return;
      }
      SysStore().snackOpen("已设为私密");
      return;
    }
    const { code, msg } = await ItemApi.unLockItem(
      itemPinia.curItem!.itemId as string
    );
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    SysStore().snackOpen("已设为公开");
  } catch (e) {
    console.error(e);
  } finally {
    await itemPinia.choseOneItem(itemPinia.curItem!.itemId as string);
  }
}

//导出项目
async function exportItem() {
  try {
    //下载项目
    const { code, msg, data } = await ItemApi.downloadItemJson(
      itemPinia.curItem!.itemId as string
    );
    if (code != 0) {
      SysStore().snackOpen(msg);
      return;
    }
    downloadJson(data, itemPinia.curItem!.itemTitle as string);
  } catch (e) {
    console.error(e);
  }
}

const isRefresh = ref<boolean>(true);
async function refreshItem(itemId: string) {
  await itemPinia.choseOneItem(itemId);
  isRefresh.value = false;
  nextTick(() => {
    isRefresh.value = true;
  });
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
      <FileUpload @on-save="refreshItem" v-if="!itemPinia.curItem" />
      <v-btn
        size="small"
        variant="elevated"
        color="blue-darken-2"
        @click="exportItem"
        v-if="itemPinia.curItem"
      >
        <v-icon start icon="mdi-export-variant"></v-icon>
        导出项目
      </v-btn>
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
      <DiaSaveItem
        :item-id="itemPinia.curItem?.itemId as string"
        :saveType="!itemPinia.curItem ? 'save' : 'edit'"
        @save="saveItem"
        @edit="editItem"
      />
      <v-btn variant="text" icon="mdi-close" @click="backHome"></v-btn>
    </v-app-bar>
    <LeftSideBar ref="LeftSider" />
    <RightSiderBar ref="RightSider" />
    <v-main>
      <div class="wrapper">
        <Panel v-if="isRefresh" ref="panel" @select="onSelect" />
      </div>
    </v-main>
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
