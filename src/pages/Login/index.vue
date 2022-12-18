<template>
  <div class="page">
    <v-card
      :elevation="1"
      :loading="loading"
      height="300px"
      width="50%"
      min-width="300px"
      max-width="500px"
    >
      <v-card-title>登录</v-card-title>
      <v-card-text class="form">
        <v-form ref="loginForm" v-model="valid">
          <v-text-field
            v-model="username"
            :rules="userNameRule"
            label="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRule"
            type="password"
            label="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="btns">
        <v-btn @click="validate">登录</v-btn>
        <v-btn>注册</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref<boolean>(false);
const valid = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");
const userNameRule = [(v: string) => !!v || "请输入用户名"];
const passwordRule = [(v: string) => !!v || "请输入密码"];

const loginForm = ref<any>();
async function validate() {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btns {
  margin-left: 10px;
}
</style>
