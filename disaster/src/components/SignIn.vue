<template>
  <div id="signInContainer">
    <h1>Sign In</h1>
    <br />
    <form @submit.prevent="signIn()">
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
      <button type="submit" @click="signIn()">Sign In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

const username = ref('')
const password = ref('')
const router = useRouter()

async function signIn() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  }
  try {
    const res = await fetch('http://localhost:8000/login', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    console.log('success!!')
    router.push({ path: '/home' })
  } catch (error) {
    console.error('problem', error)
  }
}

export const storedUser = defineStore('username', () => {
  const user = username.value
  return { user }
})

defineExpose({ storedUser })
</script>

<style scoped>
#signInContainer {
  text-align: center;
}
</style>
