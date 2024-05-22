<template>
  <div id="signUpContainer">
    <h1>Sign Up</h1>
    <br />
    <form>
      <div id="usernameDIV">
        <label for="username">Username: </label>
        <input type="text" placeholder="Enter Username" v-model="username" id="username" />
      </div>
      <div id="passwordDIV">
        <label for="password">Password: </label>
        <input type="password" placeholder="Enter Password" v-model="password" id="password" />
      </div>
      <button @click="signUp()">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

async function signUp() {
  await userStore.register(username.value, password.value)
  router.push({ path: '/signin' })
}
</script>

<style scoped>
#signUpContainer {
  text-align: center;
}
</style>
