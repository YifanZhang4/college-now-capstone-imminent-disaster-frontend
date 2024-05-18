<template>
  <div id="container">
    <form @submit.prevent="saveDeck()">
      <label for="name">Deck Name:</label>
      <input type="text" name="name" id="name" v-model="name" />
      <label for="name">Deck Description:</label>
      <input type="text" name="description" id="description" v-model="description" />
      <button @click="saveDeck">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let name = ref('')
let description = ref('')

const saveDeck = async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name.value, description: description.value, cards: inDeck.value })
  }

  try {
    const res = await fetch('http://localhost:8000/add', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    console.log('success!!')
    router.push({ path: '/home' })
  } catch (error) {
    console.error('deck didnt save :()', error)
  }
}
</script>

<style scoped>
#container {
  width: 10rem;
  height: 20rem;
  background-color: red;
}
</style>
