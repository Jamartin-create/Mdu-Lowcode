<template>
  <div class="page">
    <v-card
      :elevation="1"
      :loading="loading"
      height="380px"
      width="50%"
      min-width="300px"
      max-width="500px"
    >
      <v-card-title>注册</v-card-title>
      <v-card-text class="form">
        <v-form ref="loginForm" v-model="valid">
          <v-text-field
            v-model="username"
            :rules="rule.username"
            label="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="rule.password"
            type="password"
            label="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="rePassword"
            :rules="rule.rePassword"
            type="password"
            label="re-password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="btns">
        <v-btn @click="validate">注册</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserStore } from "../../store/modules/user";
const password = ref<string>("");
const rePassword = ref<string>("");
const username = ref<string>("");
const valid = ref<boolean>(false);
const loading = ref<boolean>(false);

const userPinia = UserStore();

const rule = {
  username: [(v: string) => !!v || "请输入用户名"],
  password: [(v: string) => !!v || "请输入密码"],
  rePassword: [
    (v: string) => {
      if (!v) return "请再次输入密码";
      if (v != password.value) return "两次密码输入不一致哦";
      return true;
    },
  ],
};

const loginForm = ref<any>();

async function validate() {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;
  loading.value = true;
  try {
    await userPinia.register(username.value, password.value);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
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
