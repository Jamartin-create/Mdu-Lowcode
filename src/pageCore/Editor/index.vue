<template>
    <v-app color="primary">
        <v-app-bar :elevation="1" title="Martin-Lowcode">
            <template v-slot:append>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" width="180">
            <v-tabs>
                <v-tab>组件</v-tab>
                <v-tab>图层</v-tab>
            </v-tabs>
        </v-navigation-drawer>
        <v-main>
            <v-card-text>
                The navigation drawer will appear from the bottom on smaller size screens.
            </v-card-text>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const drawer = ref<boolean>(false)
</script>

<style scoped>

</style>