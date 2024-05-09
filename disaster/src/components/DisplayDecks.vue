<template>
  <div>
    <div class="deck-showcase">
      <button class="side-deck" v-for="deck in decks">{{ name }}</button>
    </div>
    <div class="Deck-Holder-1">
      <img class="Deck-Image" src="" />
      <h1>{{ name }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

async function DisplayDecks() {
  const name = ref('')
  const thumbail = ref('')

  const requestData = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: deck.name.value, thumbail: deck.image })
  }

  try {
    const response = await fetch('http://localhost:8000/', requestData)
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
