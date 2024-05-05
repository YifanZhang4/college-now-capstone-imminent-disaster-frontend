<template>
  <div class="container">
    <div class="cardsContainer">
      <div v-for="card in cards" :key="card.id">
        <img :src="card.images.small" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let cards = ref('')

async function getCards() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'process.env.APIKEY'
    }
  }

  try {
    const res = await fetch('https://api.pokemontcg.io/v2/cards', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    cards.value = data.data
    console.log('success!!')
    console.log(data)
    console.log(cards.value)
    return data
  } catch (error) {
    console.error('problem', error)
  }
}

onMounted(() => {
  getCards()
})
</script>

<style scoped>
.container {
  background-color: gray;
  position: absolute;
  right: 0;
  top: 0;
}

.cardsContainer {
  background-color: gray;
  position: absolute;
  right: 0;
  top: 30%;
  width: 30rem;
}
</style>
