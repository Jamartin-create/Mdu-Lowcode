<template>
  <v-app color="primary">
    <v-app-bar :elevation="1" title="Martin-Lowcode">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
    </v-app-bar>
    <v-navigation-drawer permanent v-model="drawer" width="180">
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-api"
          title="API管理"
          value="api"
          @click="toSubPage('api')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="我的项目"
          value="account"
          @click="toSubPage('user')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="社区"
          value="users"
          @click="toSubPage('sequare')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="sub-page">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const drawer = ref<boolean>(true);

//菜单功能区选择
function toSubPage(pageName: string) {
  router.push({ name: pageName });
}
</script>

<style scoped lang="scss">
.sub-page {
  padding: 15px;
  background-color: #f4f4f4;
  height: 100%;
}

:deep(.sub-page .container) {
  background-color: #fff;
  padding: 10px;
  min-width: 500px;
}
</style>
