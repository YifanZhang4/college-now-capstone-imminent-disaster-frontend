import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
  state: () => {
    return {
      card: {
        name: '',
        description: '',
        image: ''
      }
    }
  },
  actions: {
    async save(name, description, inDeck) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: inDeck,
          creator: localStorage.currentUser
        })
      }

      try {
        const res = await fetch('http://localhost:8000/add', requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        console.log('success!! deck saved')
      } catch (error) {
        console.error('deck didnt save :()', error)
      }
    }
  },
  getters: {}
})
