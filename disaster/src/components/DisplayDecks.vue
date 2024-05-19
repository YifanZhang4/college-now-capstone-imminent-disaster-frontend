<template>
  <div>
    <div class="deck-showcase">
      <div class="side-deck">
        <button class="deck-select" v-for="deck in decks">{{ name }}</button>
      </div>
    </div>
    <div class="Deck-Holder-1">
      <h1>{{ name }}</h1>
      <img class="Deck-Image" src="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const name = ref('')
const thumbnail = ref('')
onMounted(() => DisplayDecks())
async function DisplayDecks() {
  const requestData = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: deck.name.value, thumbail: deck.image })
  }

  try {
    const response = await fetch('http://localhost:8000/view', requestData)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('problem', error)
  }
}
</script>

<style lang="scss" scoped>
.side-deck {
  flex-direction: column;
  width: 30%;
  margin: 15px;
}
</style>
