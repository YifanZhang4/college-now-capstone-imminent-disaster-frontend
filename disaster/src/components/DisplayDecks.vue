<template>
  <div>
    <div id="popup" v-if="changing">
      <form>
        <button @click="editDeck">Edit</button>
        <button>Delete</button>
        <button @click="toggle">Cancel</button>
      </form>
    </div>
    <div class="deck-showcase" @click="editDeck()">
      <div v-for="deck in decks" :key="deck" id="deck">
        <h1>{{ deck.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
let decks = ref([])
let changing = ref(false)

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

// const editDeck = () => {
//   const id = this.deck.id
//   console.log(id)
// }

const toggle = () => {
  changing.value = !changing.value
}

onMounted(async () => {
  await displayDecks()
})
</script>

<style scoped>
#deck {
}
</style>
