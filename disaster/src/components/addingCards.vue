<template>
  <div class="container">
    <div class="searchContainer">
      <input
        type="text"
        placeholder="Search Pokemon by Name..."
        v-model="input"
        class="searchBar"
        @keypress.enter="filterCards"
      />
    </div>
    <div class="cardsContainer">
      <div class="cards" v-for="card in cards" :key="card.id" @click="() => chosenCard(card.id)">
        <img :src="card.images.small" :alt="card.name" srcset="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let input = ref('')
let cards = ref([])
let allCards = ref([])
let inDeck = ref([])

const getCards = async () => {
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
    allCards.value = data.data
    console.log('success!!')
    return data
  } catch (error) {
    console.error('problem', error)
  }
}

const filterCards = () => {
  if (Array.isArray(allCards.value)) {
    const newCards = allCards.value.filter((card) =>
      card.name.toLowerCase().includes(input.value.toLowerCase())
    )
    cards.value = newCards
    console.log(cards.value)
  } else {
    console.error('allCards is not an array')
  }
}

const chosenCard = (cardId) => {
  const card = allCards.value.find((card) => card.id === cardId)
  if (card) {
    inDeck.value.push(card)
    console.log('Card added to deck', card)
    allCards.value.splice(card, 1)
    console.log('Card aremoved', card)
  } else {
    console.error('Card not found')
  }
}

onMounted(() => {
  getCards()
})

const getInDeck = () => {
  console.log('wow look at those cards', inDeck.value)
  return inDeck.value
}

defineExpose({ getInDeck })
</script>

<style scoped>
.container {
  background-color: gray;
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
}

.searchContainer {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  background-color: gray;
  width: 15rem;
}

.searchBar {
  background: white url('../assets/icons/magnifying-glass-solid.svg') no-repeat 5px;
  background-size: 20px 20px;
  padding-left: 3rem;
  height: 2rem;
}

.cardsContainer {
  display: flex;
  flex-direction: column;
  background-color: gray;
  position: absolute;
  right: 0;
  padding-top: 2rem;
  width: 15rem;
}

.cards {
  display: flex;
  transform: scale(0.8);
  margin-top: -3rem;
}
</style>
