<script setup lang="ts">
import { RouterView } from "vue-router";
import { UserStore } from "./store/modules/user";
import router from "./router";
const userPinia = UserStore();
if (!userPinia.checkIsLogin()) {
  //TODO:消息提示组件
  console.log("请登录");
  router.push({ name: "login" });
}
</script>

<template>
  <RouterView v-slot="{ Component }">
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
