<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Panel from "./Panel.vue";
import LeftSideBar from "./LeftSideBar.vue";
import RightSiderBar from "./RightSiderBar.vue";
const router = useRouter();

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
        variant="text"
        icon="mdi-close"
        @click="router.push({ name: 'home' })"
      ></v-btn>
    </v-app-bar>
    <LeftSideBar ref="LeftSider" />
    <RightSiderBar ref="RightSider" />
    <v-main>
      <div class="wrapper">
        <Panel @select="onSelect" />
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
