<template>
  <div class="container">
    <button class="button" @click="saveDeck">Save</button>
  </div>
</template>

<script setup>
async function saveDeck() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ deck: deck.value })
  }

  try {
    const res = await fetch('http://localhost:8000/add', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    console.log('success!!')
  } catch (error) {
    console.error('problem', error)
  }
}
</script>

<style lang="scss" scoped></style>
