<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Panel from "./Panel.vue";
import draggable from "vuedraggable";
import { guid } from "../../utils/common";
const router = useRouter();
const drawer = ref<boolean>(true);
const componentList = ref<any[]>([
  {
    id: 1,
    tag: "v-btn",
    tagCN: "按钮",
    props: {},
  },
  {
    id: 2,
    tag: "v-card",
    tagCN: "卡片",
    props: {
      title: "标题",
      subtitle: "测试子标题",
      text: "测试内容",
    },
  },
]);

function onClone(data: any) {
  let nD = JSON.parse(JSON.stringify(data));
  console.log(nD);
  nD.id = guid();
  return nD;
}
</script>

<template>
  <v-app color="primary">
    <v-app-bar :elevation="1" title="Martin-Lowcode">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="router.push({ name: 'home' })"
      ></v-btn>
    </v-app-bar>
    <v-navigation-drawer permanent v-model="drawer" width="180">
      <v-tabs>
        <v-tab>组件</v-tab>
        <v-tab>图层</v-tab>
      </v-tabs>
      <draggable
        :list="componentList"
        class="draggable"
        item-key="id"
        :component-data="{ tag: 'v-list' }"
        :group="{ name: 'component', pull: 'clone', put: false }"
        :sort="false"
        :clone="onClone"
      >
        <template #item="{ element }">
          <div class="cmp-wrp">
            {{ element.tagCN }}
          </div>
        </template>
      </draggable>
    </v-navigation-drawer>
    <v-navigation-drawer
      permanent
      location="right"
      v-model="drawer"
      width="270"
    >
      <v-tabs>
        <v-tab>样式</v-tab>
        <v-tab>属性</v-tab>
        <v-tab>数据</v-tab>
      </v-tabs>
    </v-navigation-drawer>
    <v-main>
      <div class="wrapper">
        <Panel />
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
.cmp-type {
  margin-top: 10px;
  text-align: center;
}
.cmp-wrp {
  padding: 10px;
  text-align: center;
  cursor: move;
}
.cmp-type:hover,
.cmp-wrp:hover {
  background-color: #ebebeb;
}
.draggable {
  display: flex;
  flex-direction: column;
}
:deep(.wrapper) {
  .v-application__wrap {
    min-height: 100%;
    padding: 25px;
  }
}
</style>
