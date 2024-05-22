<template>
  <div id="signInContainer">
    <h1>Sign In</h1>
    <br />
    <form>
      <div id="usernameDIV">
        <label for="username">Username: </label>
        <input type="text" placeholder="Enter Username" v-model="username" id="username" required />
      </div>
      <div id="passwordDIV">
        <label for="password">Password: </label>
        <input
          type="password"
          placeholder="Enter Password"
          v-model="password"
          id="password"
          required
        />
      </div>
      <button @click="signIn()">Sign In</button>
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

const signIn = async () => {
  await userStore.login(username.value, password.value)
  router.push({ path: '/home' })
}
</script>

<style scoped>
#signInContainer {
  text-align: center;
}
</style>
