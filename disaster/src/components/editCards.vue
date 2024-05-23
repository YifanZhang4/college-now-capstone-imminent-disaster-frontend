<template>
  <div>
    <button @click="back()" id="back">Back</button>
    <div id="popup" v-if="saving">
      <form id="form" @submit.prevent="saveDeck">
        <label for="name">Deck Name: </label>
        <input type="text" name="name" id="name" v-model="name" />
        <br />
        <label for="name">Deck Description: </label>
        <input type="text" name="description" id="description" v-model="description" />
        <br />
        <!-- <label for="thumbnail">Deck Thumbnail: </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/png, image/gif, image/jpeg"
        /> -->
        <br />
        <button id="saveButton">Save</button>
        <br />
      </form>
      <form @submit.prevent="saveToggle">
        <button id="saveCancel">Cancel</button>
      </form>
    </div>
    <div id="findContainer">
      <div class="searchContainer">
        <input
          type="text"
          placeholder="Search Pokemon by Name..."
          v-model="input"
          class="searchBar"
          @keypress.enter="filterCards"
        />
        <br />
        <button @click="saveToggle()" id="save">save</button>
      </div>
      <div class="cardsContainer">
        <div
          class="availCards"
          v-for="card in cards"
          :key="card.id"
          @click="() => interactCard(card.id)"
        >
          <img :src="card.images.small" :alt="card.name" />
        </div>
        <div id="cardPage">
          <button v-if="currentPage < 25" @click="nextPage" id="next">Next</button>
          <br />
          <button v-if="currentPage > 1" @click="lastPage" id="backNext">Back</button>
        </div>
      </div>
    </div>
    <div id="deck">
      <div id="deckLabel">
        <h1>Your deck:</h1>
      </div>
      <div class="deckContainer">
        <div
          class="deckCards"
          v-for="card in inDeck"
          :key="card.id"
          @click="() => interactCard(card.id)"
        >
          <img :src="card.images.small" :alt="card.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDeckStore } from '@/stores/deck'

let input = ref('')
let cards = ref([])
let allCards = ref([])
let allCards2 = ref([])
let inDeck = ref([])
let currentPage = 1
let totalCards = ref(0)
let name = ref('')
let description = ref('')
let router = useRouter()
let saving = ref(false)
let deckId = ref('')
const deckStore = useDeckStore()

const getCards = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'process.env.APIKEY'
    }
  }
  try {
    const res1 = await fetch(`https://api.pokemontcg.io/v2/cards`, requestOptions)
    if (!res1.ok) {
      throw new Error(`HTTP error! status: ${res1.status}`)
    }
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards/?pageSize=10&page=${currentPage}`,
      requestOptions
    )
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data1 = await res1.json()
    const data = await res.json()
    totalCards.value = data1.total
    allCards2.value = data1.data
    allCards.value = data1.data.filter(
      (card) => !inDeck.value.some((deckCard) => deckCard.id === card.id)
    )
    cards.value = data.data
      .filter((card) => !inDeck.value.some((deckCard) => deckCard.id === card.id))
      .slice(0, 10)
    console.log('success!!')
    console.log(cards.value)
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
  } else {
    console.error('allCards is not an array')
  }
}

const interactCard = (cardId) => {
  const inAllCards = !!allCards.value.find((card) => card.id.includes(cardId))
  const cardIndexAll = allCards.value.findIndex((card) => card.id.includes(cardId))
  const cardIndex = cards.value.findIndex((card) => card.id.includes(cardId))
  const deckIndex = inDeck.value.findIndex((card) => card.id.includes(cardId))
  const cardInAllCards = allCards2.value.find((card) => card.id.includes(cardId))
  if (inAllCards === false) {
    allCards.value.push(cardInAllCards)
    cards.value.push(cardInAllCards)
    inDeck.value.splice(deckIndex, 1)
    return
  } else if (inAllCards === true) {
    inDeck.value.push(cardInAllCards)
    allCards.value.splice(cardIndexAll, 1)
    cards.value.splice(cardIndex, 1)
    sessionStorage.setItem('inDeck', JSON.stringify(inDeck.value))
    return
  } else {
    console.log('probl;em found, please dont tell me about it')
    return
  }
}

const nextPage = async () => {
  if (currentPage * 10 < 250) {
    currentPage++
    getCards()
  }
}

const lastPage = async () => {
  if (currentPage > 1) {
    currentPage--
    getCards() // Fetch the previous page of cards
  }
}

const saveDeck = async () => {
  console.log('saving')
  console.log('deckId', deckId.value)
  await deckStore.edit(name.value, description.value, inDeck.value, deckId.value)
  console.log('can i home now')
  router.push({ path: '/home' })
}

const saveToggle = () => {
  console.log('toggle')
  saving.value = !saving.value
}

const back = () => {
  router.push({ path: '/home' })
}

onMounted(async () => {
  await getDeckCards()
  await getCards()
})

const getDeckCards = async () => {
  const routing = router.currentRoute.value.params
  console.log(routing)
  const route = routing.deckId
  deckId.value = route
  console.log('route', route)
  let data = await deckStore.getDeck(route)
  console.log('data', data)
  inDeck.value = data[0].cards
  console.log(inDeck.value)
  console.log(data.cards)
}
</script>
<style scoped>
#findContainer {
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
  padding-bottom: 0.5rem;
  text-align: center;
}

.searchBar {
  background: white url('../assets/icons/magnifying-glass-solid.svg') no-repeat 5px;
  background-size: 20px 20px;
  border-radius: 20px;
  padding-left: 3rem;
  height: 2rem;
}

.cardsContainer {
  display: flex;
  flex-direction: column;
  background-color: gray;
  position: absolute;
  right: 0;
  padding-top: 2.5rem;
  width: 15rem;
  height: 90vh;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 10px;
}

#deckLabel {
  position: absolute;
  z-index: 3;
  background-color: gray;
  width: 80vw;
  top: 10%;
  left: 1%;
  height: 3rem;
}

h1 {
  color: white;
  position: absolute;
  top: 11%;
  left: 2%;
  z-index: 5;
}

.deckContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: grey;
  position: absolute;
  bottom: 0;
  height: 90vh;
  width: 80vw;
  z-index: 1;
  left: 1%;
  overflow-y: auto;
  justify-content: space-evenly;
  padding-top: 1.5rem;
}

.deckCards {
  transform: scale(0.8);
  min-width: 270px;
  min-height: 194px;
}

.availCards {
  display: flex;
  transform: scale(0.8);
  margin-top: -3rem;
}

#save {
  z-index: 10;
  position: relative;
  margin-top: 0.5rem;
  margin: 0 auto;
  transform: scale(1.2);
}

#form {
  padding-top: 3.5rem;
  padding-left: 1rem;
  text-align: center;
}

#popup {
  display: flex;
  height: 15rem;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 40%;
  left: 30%;
  z-index: 1000;
}

#saveButton,
#saveCancel {
  position: relative;
  margin-top: 0.5rem;
}

#saveCancel {
  position: relative;
  top: 65%;
  right: 290%;
}

#description {
  width: 10rem;
}

button {
  background-color: whitesmoke;
  border-radius: 20px;
  transform: scale(1.2);
}

#next,
#backNext {
  width: 4rem;
}

#cardPage {
  width: 10rem;
  padding-left: 5rem;
  padding-bottom: 1rem;
}

#back {
  position: absolute;
  top: 1%;
  left: 1%;
}
</style>
