<template>
  <v-app color="primary">
    <v-app-bar :elevation="1" title="Martin-Lowcode">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-btn variant="text" icon="mdi-account" id="menu-activator"> </v-btn>
      <v-menu location="start" activator="#menu-activator">
        <v-list>
          <v-list-item value="logout" @click="logout">
            <v-list-item-title>
              <v-icon icon="mdi-logout"></v-icon>
              登出
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="github" @click="openGithub">
            <v-list-item-title>
              <v-icon icon="mdi-github"></v-icon>
              github
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
          prepend-icon="mdi-puzzle"
          title="物料管理"
          value="comp"
          @click="toSubPage('comp')"
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
import { UserStore } from "../../store/modules/user";
const userPinia = UserStore();
const router = useRouter();
const drawer = ref<boolean>(true);

//菜单功能区选择
function toSubPage(pageName: string) {
  router.push({ name: pageName });
}
function openGithub() {
  window.open("https://github.com/jamartin-create");
}
function logout() {
  router.push({ name: "login" });
  userPinia.reset();
}
</script>

<style scoped lang="scss">
.sub-page {
  padding: 15px;
  background-color: #f4f4f4;
  height: 100%;
}

:deep(.sub-page) {
  .container {
    background-color: #fff;
    padding: 10px;
    min-width: 500px;
  }
  .v-application__wrap {
    min-height: 100%;
  }
}
</style>
