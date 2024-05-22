import { defineStore } from 'pinia'
import { useUserStore } from './user'

const userStore = useUserStore()

export const useDeckStore = defineStore({
  id: 'deck',
  state: () => ({
    name: '',
    description: '',
    image: '',
    decks: null
  }),
  actions: {
    async save(name, description, inDeck) {
      console.log(userStore.currentUser)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: inDeck,
          creator: userStore.currentUser
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
    },
    async getDecks() {
      const creator = userStore.currentUser
      try {
        const res = await fetch(`http://localhost:8000/?creator=${encodeURIComponent(creator)}`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await res.json()
        this.decks = data
        console.log('WKHJUA,SBVKFDGAVJFBDKA')
        console.log('data', data)
        console.log('decks', this.decks)
      } catch (error) {
        console.error('problem', error)
      }
    },
    async getDeck(route) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: route
        })
      }
      try {
        const res = await fetch('http://localhost:8000/find', requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = res.json()
        return data
        console.log('success!! deck found')
      } catch (error) {
        console.error('no deck :()', error)
      }
    },
    async edit(name, description, inDeck, deckId) {
      const user = userStore.currentUser
      const id = deckId
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: inDeck,
          creator: user,
          id: id
        })
      }
      try {
        const res = await fetch(`http://localhost:8000/decks/${id}`, requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = res.json()
        console.log(data)
      } catch (error) {
        console.error('problem', error)
      }
    },
    async delete(deckId) {
      const id = deckId
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      }
      try {
        const res = await fetch(`http://localhost:8000/decks/${id}`, requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log(data)
      } catch (error) {
        console.error('problem', error)
      }
    }
  },
  getters: {}
})
