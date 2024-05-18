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

const username = ref('')
const password = ref('')
const router = useRouter()

async function signUp() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  }

  try {
    const res = await fetch('http://localhost:8000/register', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    console.log('success!!')
    router.push({ path: '/signin' })
  } catch (error) {
    console.error('problem', error)
  }
}
</script>

<style scoped>
#signUpContainer {
  text-align: center;
}
</style>
