<!-- DO NOT USE -->

<template>
  <div class="container">
    <input type="search" @keyup.enter="searchCards" v-model="searchTerm" class="searchBar" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import getCards from './availCards.vue'

const searchTerm = ref('')

async function searchCards() {
  getCards()
  console.log(data)
  const results = data.filter((cards) => {
    return cards.name.toLowerCase().includes(searchTerm.toLowerCase())
  })
  console.log(results)
}
</script>

<style scoped>
.container {
  margin-right: 0.5rem;
  padding-top: 1rem;
}

.searchBar {
  background: white url('../assets/icons/magnifying-glass-solid.svg') no-repeat 5px;
  background-size: 20px 20px;
  padding-left: 3rem;
  height: 2rem;
}
</style>
