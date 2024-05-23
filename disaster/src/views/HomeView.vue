<template>
  <div>
    <button @click="signOut">Sign Out</button>
    <h1>home</h1>
    <RouterLink to="createdeck">Create Deck</RouterLink>
    <DisplayDecks></DisplayDecks>
    <!-- <div id="cardHolder">
      <div class="cards" v-for="(deck, index) in decks" :key="deck" :pokemon="deck" :id="index + 1">
        <h1>a deck</h1>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DisplayDecks from '@/components/DisplayDecks.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const decks = ref('')
const userStore = useUserStore()
const router = useRouter()

async function getCards() {
  let res = await fetch('http://localhost:8000/')
  let data = await res.json()
  decks.value = data
  console.log(data)
}

const signOut = async () => {
  await userStore.logout()
  router.push({ path: '/' })
}

onMounted(async () => {
  await getCards()
})
</script>

<style lang="scss" scoped></style>
