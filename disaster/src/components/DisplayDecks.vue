<template>
  <div>{{ deckName }}</div>
</template>

<script setup>
import { ref } from 'vue'

async function DisplayDecks() {
  const requestData = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  }

  try {
    const response = await fetch('http://localhost:8000/', requestData)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    console.log('success!!')
  } catch (error) {
    console.error('problem', error)
  }
}
</script>

<style lang="scss" scoped></style>
