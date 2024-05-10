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
      <div class="cards" v-for="card in cards" :key="card.id" @click="() => interactCard(card.id)">
        <img :src="card.images.small" :alt="card.name" srcset="" />
      </div>
    </div>
    <div class="deckContainer">
      <div class="cards" v-for="card in inDeck" :key="card.id" @click="() => interactCard(card.id)">
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

const interactCard = (cardId) => {
  const inAllCards = allCards.value.find((card) => card.id.includes(cardId))
  if (inAllCards) {
    allCards.value.push(inAllCards)
    console.log('Card removed', inAllCards)
    inDeck.value.splice(inAllCards, 1)
    console.log('Card removed 2.0', inAllCards)
  } else if (inAllCards) {
    inDeck.value.push(inAllCards)
    console.log('Card added to deck', inAllCards)
    allCards.value.splice(inAllCards, 1)
    console.log('Card removed', inAllCards)
  } else {
    console.log('probl;em found, please dont tell me about it')
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

.deckContainer {
  background-color: white;
  width: 30rem;
}

.cards {
  display: flex;
  transform: scale(0.8);
  margin-top: -3rem;
}
</style>
