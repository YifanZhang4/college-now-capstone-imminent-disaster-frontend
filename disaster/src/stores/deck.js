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
      const user = localStorage.currentUser
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: inDeck,
          creator: user
        })
      }

      try {
        const res = await fetch('http://localhost:8000/add', requestOptions)
        console.log('haiiiii :3')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        console.log('success!! deck saved')
      } catch (error) {
        console.error('deck didnt save :()', error)
      }
    },
    async getDecks() {
      const creator = localStorage.currentUser
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
      const id = route
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      try {
        const res = await fetch(
          `http://localhost:8000/find/?id=${encodeURIComponent(id)}`,
          requestOptions
        )
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('success!! deck found')
        console.log(data)
        return data
      } catch (error) {
        console.error('no deck :()', error)
      }
    },
    async edit(name, description, inDeck, deckId) {
      const id = deckId
      console.log(id)
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: inDeck
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
        }
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
