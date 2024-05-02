<template>
  <div class="container">
    <button class="button" @click="saveDeck">Save</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let deck = ref('')

async function saveDeck() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }

  try {
    const response = await fetch('http://localhost:8000/add', requestOptions)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    console.log('success!!')
  } catch (error) {
    console.error('problem', error)
  }
}
</script>

<style lang="scss" scoped></style>
