<template>
  <div>
    <div id="cardHolder">
      <div class="cards" v-for="(deck, index) in decks" :key="deck" :pokemon="deck" :id="index + 1">
        <h1>a deck</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const decks = ref('')

async function getCards() {
  let res = await fetch('http://localhost:8000/')
  let data = await res.json()
  decks.value = data
  console.log(data)
}

onMounted(async () => {
  await getCards()
})
</script>

<style lang="scss" scoped></style>
