<template>
  <div>
    <h1>gkfg</h1>
  </div>
</template>

<script setup>
import { useDeckStore } from '@/stores/deck'
import { useRoute } from 'vue-router'

const router = useRoute()
const deckStore = useDeckStore()

const getCards = async () => {
  const route = router.params.id
  let data = await deckStore.getDeck(route)
  console.log(data)
}

onMounted(() => {
  getCards()
})
</script>

<style scoped></style>
