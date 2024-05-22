<template>
  <div id="signUpContainer">
    <h1>Sign Up</h1>
    <br />
    <form @submit.prevent="signUp()">
      <div id="username">
        <label for="username">Username: </label>
        <input type="text" placeholder="Enter Username" v-model="username" id="username" />
      </div>
      <div id="password">
        <label for="password">Password: </label>
        <input type="password" placeholder="Enter Password" v-model="password" id="password" />
      </div>
      <button type="submit" @click="signUp()">Sign Up</button>
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
  userStore.register(username.value, password.value)
  router.push({ path: '/signin' })
}
</script>

<style scoped>
#signUpContainer {
  text-align: center;
}
</style>
