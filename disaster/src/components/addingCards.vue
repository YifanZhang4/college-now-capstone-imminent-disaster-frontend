<template>
  <div>
    <button @click="back()" id="back">Back</button>
    <div id="popup" v-if="saving">
      <form>
        <label for="name">Deck Name:</label>
        <input type="text" name="name" id="name" v-model="name" />
        <br />
        <label for="name">Deck Description:</label>
        <input type="text" name="description" id="description" v-model="description" />
        <button @click="saveDeck">Save</button>
        <br />
        <button @click="saveToggle">Cancel</button>
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
        <button v-if="currentPage < 25" @click="nextPage">Next</button>
        <button v-if="currentPage > 1" @click="lastPage">Back</button>
      </div>
    </div>
    <div id="deck">
      <button @click="saveToggle()" id="save">save</button>
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
import { storedUser } from './SignIn.vue'

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
const store = storedUser()
const username = store.username

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

const getUser = async () => {
  const thisUser = username.value
  const requestData = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: thisUser })
  }
  try {
    const res = await fetch('http://localhost:8000/user', requestData)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.error('problem', error)
  }
}

const saveDeck = async () => {
  console.log('saving')
  await getUser()
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      description: description.value,
      cards: inDeck.value,
      creator: user
    })
  }

  try {
    const res = await fetch('http://localhost:8000/add', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    console.log('success!! deck saved')
    router.push({ path: '/home' })
  } catch (error) {
    console.error('deck didnt save :()', error)
  }
}

const saveToggle = () => {
  console.log('toggle')
  saving.value = !saving.value
}

const back = () => {
  router.push({ path: '/home' })
}

onMounted(() => {
  getCards()
  console.log(username)
})
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
  padding-top: 2rem;
  width: 15rem;
  height: 94vh;
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

.deckContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
  position: absolute;
  bottom: 0;
  height: 90vh;
  width: 69rem;
  z-index: 1;
  left: 15%;
  overflow-y: auto;
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
  top: 0;
  position: absolute;
}

#back {
  top: 0;
  position: absolute;
  margin-left: 10rem;
}

#popup {
  width: 20rem;
  height: 30rem;
  background-color: red;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  z-index: 1000;
}
</style>
