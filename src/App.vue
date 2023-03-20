<script setup lang="ts">
import { RouterView } from "vue-router";
import { UserStore } from "./store/modules/user";
import { SysStore } from "./store/modules/sys";
import SnackBars from "./components/SnackBars.vue";
import router from "./router";
const userPinia = UserStore();
const sysPinia = SysStore();
if (!userPinia.checkIsLogin()) {
  sysPinia.snackOpen("请登录");
  router.push({ name: "login" });
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <SnackBars />
    <Transition name="page" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
