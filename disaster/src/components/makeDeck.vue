<template>
  <div class="container">
    <div class="cards" v-for="card in inDeck" :key="card.id">
      <img :src="card.images.small" :alt="card.name" srcset="" />
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import getInDeck from './addingCards.vue'

const inDeck = ref([])

watch()
// maybe?? im xo confused

onUpdated(() => {
  getInDeck()
})
</script>

<style scoped>
.container {
  background-color: gray;
  width: 50%;
  height: 50%;
}

.cards {
  display: flex;
  transform: scale(0.8);
  margin-top: -3rem;
}
</style>
