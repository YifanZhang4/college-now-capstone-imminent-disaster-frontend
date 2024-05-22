<template>
  <div>
    <div id="popup" v-if="deleting">
      <h2>Are you sure?</h2>
      <button @click="deleteDeck()">Yes</button>
      <button @click="toggle">No</button>
    </div>
    <div class="deck-showcase">
      <div v-for="deck in decks" :key="deck" id="deck._id">
        <h1>{{ deck.name }}</h1>
        <div id="choices">
          <button @click="editDeck(deck)">Edit</button>
          <button @click="toggle(deck)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDeckStore } from '@/stores/deck'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const deckStore = useDeckStore()
let decks = ref([])
let deleting = ref(false)
let deckId = ref('')
const router = useRouter()

const displayDecks = async () => {
  const creator = userStore.currentUser
  try {
    const res = await fetch(`http://localhost:8000/?creator=${encodeURIComponent(creator)}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await res.json()
    console.log(data)
    decks.value = data
  } catch (error) {
    console.error('problem', error)
  }
}

const editDeck = (deck) => {
  const deckId = deck._id
  router.push({ path: `/editDeck/${deckId}` })
}

const toggle = (deck) => {
  deleting.value = !deleting.value
  if (deleting) {
    deckId.value = deck._id
  }
  if (!deleting) {
    deckId.value = ''
  } else {
    return
  }
}

const deleteDeck = () => {
  console.log(deckId)
  deckStore.delete(deckId.value)
}

onMounted(async () => {
  await displayDecks()
  console.log(decks)
})
</script>

<style scoped>
#deck {
}
</style>
