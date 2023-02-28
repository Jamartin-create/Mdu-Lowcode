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
    </v-navigation-drawer>
    <v-main>
      <v-card-text>
        The navigation drawer will appear from the bottom on smaller size
        screens.
      </v-card-text>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const drawer = ref<boolean>(true);
</script>
